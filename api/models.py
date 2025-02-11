from django.db import models

class Vendor(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    shopName = models.CharField(max_length=200)
    shopAddress = models.TextField()
    shopFullAddress = models.TextField(blank=True, null=True)  # Optional
    pincode = models.CharField(max_length=6)
    mobile = models.CharField(max_length=10, unique=True)
    otp = models.CharField(max_length=6)  # Store OTP for verification
    email = models.EmailField(unique=True)
    panNumber = models.CharField(max_length=10)


    def __str__(self):
        return self.shopName
