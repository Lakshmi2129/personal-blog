from django.urls import path
from .views import *

urlpatterns = [
  path('Login', Login, name='Login'),
  path('signin',signin,name='signin'),
  path('Register',register,name='register'),
  path('signup',signup,name='signup'),
  path('posts',posts,name='posts'),
  path('add_post_blogs',add_post_blogs,name='add_post_blogs'),
  path('css_frameworks',css_frameworks,name='css_frameworks'),
  path('',home,name='home')
]