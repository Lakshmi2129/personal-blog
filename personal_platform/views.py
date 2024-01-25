from django.shortcuts import render,redirect
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import QueryDict
from .models import *
import datetime
from django.db import connection


# Create your views here.
def Login(request):
  return render(request, 'login.html')

def register(request):
    return render(request, 'signup.html')

@login_required(login_url='Login')
def home(request):
  return render(request,'index.html')

@login_required(login_url='Login')
def posts(request):
  return render(request,'post.html')

@login_required(login_url='Login')
def blog_view(request):
  return render(request, 'blog_view.html')


def signup(request):
  if request.method == 'POST':
      username = request.POST.get('username')
      email = request.POST.get('email')
      password = request.POST.get('password')
      confirm_password = request.POST.get('confirm_password')

      if password != confirm_password:
          return JsonResponse({'res': 'failed', 'msg': 'Passwords do not match'})

      if User.objects.filter(email=email).exists():
          return JsonResponse({'res': "failed", 'msg': 'Email already exists'})

      hashed_password = make_password(password)
      user = User.objects.create(username=username, email=email, password=hashed_password)
      return JsonResponse({'res': "success", 'msg': 'Signup successful'})
  else:
      return JsonResponse({'res': "failed", 'msg': 'Invalid request'})


def signin(request):
  
  if request.method == 'POST':
    user = auth.authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
    if user is not None and user.is_authenticated:
      auth.login(request, user)
      return JsonResponse({'res': 'success', 'msg': 'Login successful'})
    else:
      return JsonResponse({'res': 'failed', 'msg': 'Invalid credentials'})
  else:
    return render(request, "login.html")


     
def add_post_blogs(request):
  
  if request.method == 'POST':
    title=request.POST['title']
    content = request.POST['content']
    image = request.POST['image']
    summary = request.POST['summary']
    current_date_time = datetime.datetime.now()
    data = add_post.objects.filter(title=title)
    if len(data) == 1:
      return JsonResponse({"res":"failed",'msg':"Post already Exists!"})
    else:
      # add_post.objects.create(title=title,content=content,image=image,summary=summary,author=request.user)
      new_post = add_post(title=title, content=content, image=image, summary=summary, author=request.user,time=current_date_time)
      new_post.save()
      return JsonResponse({"res":"success","msg":"Post added Successfully!"})
    
  elif request.method == "GET":
    data =add_post.objects.all()
    api = []
    for i in data:
      local_time = timezone.localtime(i.time)
      created_at = local_time.strftime("%Y-%m-%d %H:%M:%S")
      api.append({"pk":i.id,"title":i.title,"content":i.content,"image":i.image,"summary":i.summary,"author": i.author.username,"time": created_at})
    return JsonResponse(api,safe=False)
    
  elif request.method == "PUT":
    put = QueryDict(request.body)
    edit = add_post.objects.get(id=put.get("pk"))
    edit.title=put.get('title')
    edit.content=put.get('content')
    edit.image=put.get('image')
    edit.summary=put.get('summary')
    edit.save()
    return JsonResponse({"res":"success","msg":"Post Updated Successfully!"})
  
    
  elif request.method == "DELETE":
    delete = QueryDict(request.body)
    sft = add_post.objects.get(pk=delete.get('pk'))
    sft.delete()
    return JsonResponse({"res":"success","msg":"Deleted Succesfully"})


def custom_sql(query):
    cursor = connection.cursor()
    cursor.execute(query)
    row = cursor.fetchall()
    connection.commit()
    connection.close()
    return row


  
def get_data(request):  
  if request.method == 'POST':
    id = request.POST.get('id')
    ids = custom_sql(f"select * from personal_platform_add_post where id='{id}'")

    return JsonResponse({"id":ids})

    
  
  
          
   
      