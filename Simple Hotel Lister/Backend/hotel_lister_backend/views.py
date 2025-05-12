from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.middleware.csrf import get_token
import json
from django.http import JsonResponse
from django.conf import settings
import os
from .models import Bookmark
from .serializers import BookmarkSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

User = get_user_model()

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"})
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_csrf(request):
    return Response({'csrfToken': get_token(request)})

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"message": "Login successful"})
    return Response({"message": "Invalid credentials"}, status=400)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({"message": "Logout successful"})

@api_view(['GET'])
def get_hotels(request):
    location = request.GET.get('location')
    star_rating = request.GET.get('star_rating')
    pool = request.GET.get('pool_available')

    file_path = os.path.join(settings.BASE_DIR, 'hotel_lister_backend/hotel_list.json')
    with open(file_path) as f:
        hotels = json.load(f)

    if location:
        hotels = [h for h in hotels if h['location'].lower() == location.lower()]
    if star_rating:
        hotels = [h for h in hotels if str(h['star_rating']) == str(star_rating)]
    if pool:
        pool_bool = pool.lower() == 'true'
        hotels = [h for h in hotels if h['pool_available'] == pool_bool]

    return JsonResponse(hotels, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_hotel(request):
    hotel_id = request.data.get('hotel_id')
    Bookmark.objects.get_or_create(user=request.user, hotel_id=hotel_id)
    return Response({"message": "Hotel bookmarked"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_bookmarks(request):
    bookmarks = Bookmark.objects.filter(user=request.user)
    file_path = os.path.join(settings.BASE_DIR, 'hotel_lister_backend/hotel_list.json')
    with open(file_path) as f:
        all_hotels = json.load(f)

    hotel_ids = set(b.hotel_id for b in bookmarks)
    bookmarked_hotels = [hotel for hotel in all_hotels if hotel['id'] in hotel_ids]
    return JsonResponse(bookmarked_hotels, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unbookmark_hotel(request):
    hotel_id = request.data.get('hotel_id')
    Bookmark.objects.filter(user=request.user, hotel_id=hotel_id).delete()
    return Response({"message": "Hotel unbookmarked"})