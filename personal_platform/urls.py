from django.urls import path
from .views import *

urlpatterns = [
  path('Login', Login, name='Login'),
  path('signin',signin,name='signin'),
  path('Register',register,name='register'),
  path('signup',signup,name='signup'),
  path('posts',posts,name='posts'),
  path('add_post_blogs',add_post_blogs,name='add_post_blogs'),
  path('blog_view',blog_view,name='blog_view'),
  path('get_data',get_data,name='get_data'),
  path('',home,name='home')
]