from rest_framework import serializers
from .models import Vendor
import re

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = "__all__"

    def validate_mobile(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Enter a valid 10-digit mobile number.")
        return value

    def validate_panNumber(self, value):
        if value and not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$", value):
            raise serializers.ValidationError("Enter a valid PAN Number.")
        return value


