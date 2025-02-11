"""
Django settings for storemart project.
"""

from corsheaders.defaults import default_headers
from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-4fzg@7(&m0g&d@kd7lx%katpzp63q!nr)w@1&+%y*u+qo1%r4e"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost", "wholesalemart.onrender.com"]

# ✅ CORS SETTINGS
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False  # Explicitly allow only specified origins

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "https://wholesalemart.onrender.com"
]

CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS

from corsheaders.defaults import default_headers
CORS_ALLOW_HEADERS = list(default_headers) + [
    "Authorization",
    "Access-Control-Allow-Credentials"
]



# ✅ FIX COOP (Google Login Popup Issue)
SECURE_CROSS_ORIGIN_OPENER_POLICY = None  # Disable COOP

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api.apps.ApiConfig",
    "rest_framework",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",  # ✅ Ensure this is here
    "corsheaders.middleware.CorsMiddleware",  # ✅ CORS Middleware
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]



ROOT_URLCONF = "storemart.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR.joinpath("frontend")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "storemart.wsgi.application"

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'wholesalemarket',    # Replace with your database name
        'USER': 'root',    # Replace with your database username
        'PASSWORD': 'khagesh123',  # Replace with your database password
        'HOST': 'localhost',             # Or your database host
        'PORT': '3306',                  # Or your database port
       
    }
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = "static/"
STATICFILES_DIRS = (BASE_DIR.joinpath("frontend", "dist"),)
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ✅ FIXED EMAIL CONFIG (Removed Duplicate `EMAIL_USE_TLS`)
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "yeraganakhagesh@gmail.com"
EMAIL_HOST_PASSWORD = "bczo qwvy cfzq ayqv"
EMAIL_USE_SSL = False  # Keep this False if using TLS



SESSION_COOKIE_AGE = 60 * 60 * 24 * 7  # 1 week
SESSION_ENGINE = "django.contrib.sessions.backends.db"  # ✅ Ensure sessions are stored in DB
SESSION_COOKIE_NAME = "sessionid"  # ✅ Default Django session cookie name
SESSION_COOKIE_HTTPONLY = True  # ✅ Prevents JavaScript access
SESSION_COOKIE_SAMESITE = "None"  # ✅ Allows cross-origin requests
SESSION_COOKIE_SECURE = True  # ✅ If using HTTPS (set False for localhost testing)
SESSION_SAVE_EVERY_REQUEST = True  # ✅ Ensure session updates every request
SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # ✅ Keep session after closing browser





REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',  # ✅ Required for session-based login
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}