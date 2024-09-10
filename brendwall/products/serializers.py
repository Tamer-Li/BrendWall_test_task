from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price']
        extra_kwargs = {
            'name': {'required': True, 'allow_blank': True},
            'price': {'required': True, 'min_value': 0.01},
        }
