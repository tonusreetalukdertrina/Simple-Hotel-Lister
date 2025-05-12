from django.urls import path
from .views import register, login_view, logout_view, get_csrf, get_hotels, bookmark_hotel, view_bookmarks, unbookmark_hotel

urlpatterns = [
    path('register/', register, name='register'),      
    path('login/', login_view),
    path('logout/', logout_view),
    path('csrf/', get_csrf),
    path('hotels/', get_hotels, name='get_hotels'),
    path('bookmark/', bookmark_hotel),
    path('bookmarks/', view_bookmarks),
    path('unbookmark/', unbookmark_hotel),
]
