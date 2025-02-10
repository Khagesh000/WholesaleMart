from rest_framework import serializers
from .models import Vendor

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'
    
    def validate_gstNumber(self, value):
        if value and not value.isdigit():
            raise serializers.ValidationError("GST Number must be numeric.")
        return value

