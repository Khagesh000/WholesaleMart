import os
import random
import logging
import firebase_admin
from firebase_admin import auth, credentials
from django.core.mail import send_mail
from django.core.cache import cache
from django.conf import settings
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication

from rest_framework import status
from django.http import JsonResponse
from .models import Vendor
from .serializers import VendorSerializer
from rest_framework.decorators import api_view,  permission_classes




logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIREBASE_CREDENTIALS_PATH = os.path.join(BASE_DIR, "api", "firebase-credentials.json")

if not os.path.exists(FIREBASE_CREDENTIALS_PATH):
    raise FileNotFoundError(f"Firebase credentials file not found: {FIREBASE_CREDENTIALS_PATH}")

cred = credentials.Certificate(FIREBASE_CREDENTIALS_PATH)
firebase_admin.initialize_app(cred)

class CSRFExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  
    

class GoogleLoginView(APIView):
    authentication_classes = [CSRFExemptSessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response({"status": "Failed", "message": "Token is required"}, status=400)

        try:
            decoded_token = auth.verify_id_token(token, clock_skew_seconds=5)
            email = decoded_token.get("email")
            user, created = User.objects.get_or_create(username=email, email=email)



            # ✅ Log in user using Django's session system
            request.session["user_id"] = user.id
            request.session["email"] = email
            request.session.set_expiry(60 * 60 * 24 * 365 * 5)  # 5 Years (Like Facebook)
            login(request, user)
            
            logger.info(f"✅ Google Login Success: User {email} logged in with session {request.session.session_key}")

            return Response({
                "status": "Success",
                "email": email,
                "user_id": user.id,
                "session_key": request.session.session_key  # Debugging session
            })

        except Exception as e:
            logger.error(f"Google Login Failed: {str(e)}")
            return Response({"status": "Failed", "message": "Invalid Google token"}, status=400)


class SendOTPView(APIView):
    authentication_classes = [CSRFExemptSessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"status": "Failed", "message": "Email is required"}, status=400)

        otp = random.randint(100000, 999999)
        cache.set(email, otp, timeout=300)  # OTP valid for 5 minutes

        logger.info(f"OTP {otp} sent to {email}")

        try:
            send_mail(
                subject="Your OTP for Verification",
                message=f"Your OTP code is: {otp}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )
            return Response({"status": "OTP Sent", "email": email})

        except Exception as e:
            logger.error(f"Error sending OTP: {str(e)}")
            return Response({"status": "Failed", "message": "Error sending OTP"}, status=500)


class VerifyOTPView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp_entered = request.data.get("otp")

        if not email or not otp_entered:
            return Response({"status": "Failed", "message": "Email and OTP are required"}, status=400)

        otp_stored = cache.get(email)

        if otp_stored and str(otp_stored) == str(otp_entered):
            logger.info(f"✅ OTP Verified Successfully for {email}")

            user, created = User.objects.get_or_create(username=email, email=email)
            login(request, user)

            # Set session with long expiry
            request.session["user_email"] = email
            request.session["authenticated"] = True
            request.session.set_expiry(60 * 60 * 24 * 365 * 5)  # 5 Years (Like Facebook)

            return Response({"status": "Verified", "message": "OTP is correct"})

        else:
            logger.warning(f"❌ Invalid OTP Attempt for {email}")
            return Response({"status": "Failed", "message": "Invalid OTP"}, status=400)


class LogoutView(APIView):
    authentication_classes = [CSRFExemptSessionAuthentication]

    def post(self, request):
        logout(request)
        request.session.flush()  # Clear all session data
        return Response({"status": "Success", "message": "Logged out successfully"})


class CheckSessionView(APIView):
    authentication_classes = [CSRFExemptSessionAuthentication]

    def get(self, request):
        user_id = request.session.get("user_id")
        email = request.session.get("email")

        if user_id:
            logger.info(f"✅ Active session found for {email} (User ID: {user_id})")
            return Response({"status": "Authenticated", "user_id": user_id, "email": email})
        
        logger.warning("❌ No active session found")
        return Response({"status": "Unauthorized"}, status=401)





#Vendors data

class RegisterVendorView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        # Log the received data
        logger.info(f"📩 Received registration data: {request.data}")

        serializer = VendorSerializer(data=request.data)
        if serializer.is_valid():
            vendor = serializer.save()

            # ✅ Store session (5 Years Expiry)
            request.session["vendor_id"] = vendor.id
            request.session["email"] = vendor.email
            request.session.set_expiry(60 * 60 * 24 * 365 * 5)  # 5 Years

            logger.info(f"✅ Vendor {vendor.email} registered (Session: {request.session.session_key})")

            return Response({
                "message": "Vendor registered successfully!",
                "redirect": "/vendor-homepage",
                "vendor_id": vendor.id,
                "email": vendor.email
            }, status=status.HTTP_201_CREATED)

        # ❌ Log and return errors
        logger.error(f"❌ Registration failed: {serializer.errors}")
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ✅ Check if Vendor is Logged In (Class-Based)
class VendorSessionView(APIView):
    authentication_classes = [CSRFExemptSessionAuthentication]
    permission_classes = [AllowAny]

    def get(self, request):
        vendor_id = request.session.get("vendor_id")
        email = request.session.get("email")

        if vendor_id:
            return JsonResponse({
                "loggedIn": True,
                "vendor_id": vendor_id,
                "email": email
            })

        return JsonResponse({"loggedIn": False})


# ✅ Vendor Logout (Class-Based)
class LogoutVendorView(APIView):
    authentication_classes = [CSRFExemptSessionAuthentication]

    def post(self, request):
        logout(request)
        request.session.flush()  # ✅ Clear session completely
        logger.info("✅ Vendor logged out successfully")

        return JsonResponse({"message": "Logged out successfully", "redirect": "/"}, status=200)


# ✅ Send OTP to Email (Class-Based)
class VendorSendOTPView(APIView):
    authentication_classes = [CSRFExemptSessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"status": "Failed", "message": "Email is required"}, status=400)

        otp = random.randint(100000, 999999)
        cache.set(email, otp, timeout=300)  # OTP valid for 5 minutes

        try:
            send_mail(
                subject="Your OTP for Verification",
                message=f"Your OTP code is: {otp}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )
            return Response({"status": "OTP Sent", "email": email})

        except Exception as e:
            logger.error(f"Error sending OTP: {str(e)}")
            return Response({"status": "Failed", "message": "Error sending OTP"}, status=500)


# ✅ Verify OTP (Class-Based)
class VendorVerifyOTPView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        otp_received = request.data.get("otp")

        if not email or not otp_received:
            return Response({"status": "Failed", "message": "Email and OTP are required"}, status=400)

        otp_stored = cache.get(email)

        if str(otp_stored) == str(otp_received):
            cache.delete(email)  # ✅ OTP verified, remove from cache
            return Response({"status": "Success", "message": "OTP verified successfully!"})

        return Response({"status": "Failed", "message": "Invalid OTP or expired"}, status=400)