from django.contrib import admin
from django.urls import path
from home import views

urlpatterns = [
    path('', views.index,name="index"),
    path('signin', views.usersignin,name="signin"),
    path('signup', views.usersignup,name="signup"),
    path('signout', views.signout,name="signout"),
]