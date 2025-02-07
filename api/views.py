import os
import random
import logging
import firebase_admin
from firebase_admin import auth, credentials
from django.core.mail import send_mail
from django.core.cache import cache
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)

# ✅ Get the BASE_DIR dynamically
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ✅ Use `os.path.join` for a correct file path
FIREBASE_CREDENTIALS_PATH = os.path.join(BASE_DIR, "api", "firebase-credentials.json")

# ✅ Ensure the file exists before initializing Firebase
if not os.path.exists(FIREBASE_CREDENTIALS_PATH):
    raise FileNotFoundError(f"Firebase credentials file not found: {FIREBASE_CREDENTIALS_PATH}")

# ✅ Initialize Firebase Admin SDK
cred = credentials.Certificate(FIREBASE_CREDENTIALS_PATH)
firebase_admin.initialize_app(cred)


class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response({"status": "Failed", "message": "Token is required"}, status=400)

        try:
            decoded_token = auth.verify_id_token(token)
            email = decoded_token.get("email")
            user_id = decoded_token.get("uid")  # Get Firebase UID
            
            # 🔹 Add user creation logic if not exists
            from django.contrib.auth.models import User
            user, created = User.objects.get_or_create(username=email, email=email)

            return Response({"status": "Success", "email": email, "user_id": user_id})

        except Exception as e:
            logger.error(f"Google Login Error: {str(e)}")
            return Response({"status": "Failed", "message": "Invalid Google token"}, status=400)


# ✅ Send OTP via Email
class SendOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"status": "Failed", "message": "Email is required"}, status=400)

        otp = random.randint(100000, 999999)
        cache.set(email, otp, timeout=300)

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


# ✅ Verify OTP
class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp_entered = request.data.get("otp")

        if not email or not otp_entered:
            return Response({"status": "Failed", "message": "Email and OTP are required"}, status=400)

        otp_stored = cache.get(email)

        if otp_stored and str(otp_stored) == str(otp_entered):
            return Response({"status": "Verified", "message": "OTP is correct"})
        else:
            return Response({"status": "Failed", "message": "Invalid OTP"}, status=400)
