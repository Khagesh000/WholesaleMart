from django.urls import path
from .views import SendOTPView, VerifyOTPView, GoogleLoginView, CheckSessionView

urlpatterns = [
    path("google-login/", GoogleLoginView.as_view(), name="google-login"),
    path("send-otp/", SendOTPView.as_view(), name="send_otp"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
    path("check-session/", CheckSessionView.as_view(), name="check_session"),
]
