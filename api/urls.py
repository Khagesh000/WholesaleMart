from django.urls import path
from .views import SendOTPView, VerifyOTPView, GoogleLoginView, CheckSessionView, LogoutView, RegisterVendorView, VendorSessionView, LogoutVendorView, VendorSendOTPView, VendorVerifyOTPView


urlpatterns = [
    path("google-login/", GoogleLoginView.as_view(), name="google-login"),
    path("send-otp/", SendOTPView.as_view(), name="send_otp"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify_otp"),
    path("check-session/", CheckSessionView.as_view(), name="check_session"),
    path("logout/", LogoutView.as_view(), name="logout"),

    path("register-vendor/", RegisterVendorView.as_view(), name="register_vendor"),
    path("check-vendor-session/", VendorSessionView.as_view(), name="check_vendor_session"),
    path("logout-vendor/", LogoutVendorView.as_view(), name="logout_vendor"),
    path("send-otp-vendor/", VendorSendOTPView.as_view(), name="send_otp_vendor"),
    path("verify-otp-vendor/", VendorVerifyOTPView.as_view(), name="verify_otp_vendor"),
]
