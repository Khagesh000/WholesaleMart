import random
import logging
from django.core.mail import send_mail
from django.core.cache import cache
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)

class SendOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"status": "Failed", "message": "Email is required"}, status=400)

        # Generate a random 6-digit OTP
        otp = random.randint(100000, 999999)

        # Store OTP in cache for 5 minutes
        cache.set(email, otp, timeout=300)

        try:
            # Send OTP via Email
            send_mail(
                subject="Your OTP for Verification",
                message=f"Your OTP code is: {otp}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )

            logger.info(f"OTP sent successfully to {email}")
            return Response({"status": "OTP Sent", "email": email})

        except Exception as e:
            logger.error(f"Exception in sending OTP: {str(e)}")
            return Response({"status": "Failed", "message": "Error sending OTP"}, status=500)


class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp_entered = request.data.get("otp")

        if not email or not otp_entered:
            return Response({"status": "Failed", "message": "Email and OTP are required"}, status=400)

        # Retrieve OTP from cache
        otp_stored = cache.get(email)

        if otp_stored and str(otp_stored) == str(otp_entered):
            return Response({"status": "Verified", "message": "OTP is correct"})
        else:
            return Response({"status": "Failed", "message": "Invalid OTP"}, status=400)
