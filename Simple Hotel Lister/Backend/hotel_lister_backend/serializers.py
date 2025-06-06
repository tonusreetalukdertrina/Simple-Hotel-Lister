from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Bookmark

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
            )
        user.set_password(validated_data['password'])  # hashes password
        user.save()
        return user
    
class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'hotel_id']    
