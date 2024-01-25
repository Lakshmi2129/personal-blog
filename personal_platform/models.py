from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
# models.py

class add_post(models.Model):
  id = models.AutoField(primary_key=True)
  title = models.CharField(max_length=200, null=False, default='Default Title')
  content = models.CharField(max_length=2500, null=False, default='Default content')
  image = models.CharField(max_length=300, null=False, default="NA")
  summary = RichTextField()
  time = models.DateTimeField()
  author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
  
  def __str__(self):
        return self.title
  
