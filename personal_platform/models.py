from django.db import models
# models.py

class add_post(models.Model):
  id = models.AutoField(primary_key=True)
  title = models.CharField(max_length=200)
  content = models.CharField(max_length=1500,default="NA")
  image = models.CharField(max_length=300, default="NA")
  summary = models.CharField(max_length=50000, default="NA")
  time = models.DateTimeField(auto_now=True)