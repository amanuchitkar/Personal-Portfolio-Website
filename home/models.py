from django.db import models

# Create your models here.
class Contact(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField(max_length=254)
    phone=models.CharField(max_length=20)
    message=models.TextField()
    date=models.DateField()
    def __str__(self):
        return self.name
    
