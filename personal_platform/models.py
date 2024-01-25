from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
# models.py

class add_post(models.Model):
  id = models.AutoField(primary_key=True)
  title = models.CharField(max_length=200)
  content = models.CharField(max_length=1500,default="NA")
  image = models.CharField(max_length=300, default="NA")
  summary = RichTextField()
  time = models.DateTimeField()
  author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
  
  def __str__(self):
        return self.title
  
