from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from home.models import Contact
from datetime import datetime

# Create your views here.
def index(request):
    if request.user.is_anonymous:
        return redirect('/signin')
    else:
        return render(request,'index.html')
    # return render(request,"index.html")
def usersignin(request):
    if request.method=="POST":
        username=request.POST.get("username")
        # email=request.POST.get("email")
        password=request.POST.get("password")

        user=authenticate(username=username,password=password)
        
        if user is not None:
            login(request,user)
            messages.success(request, "Login successfully",extra_tags='success')
            return redirect("/")
        elif user is None:
            messages.error(request,'username or password not correct',extra_tags='danger')
            return redirect("/signup")

        else:
            messages.error(request,'Something went wrong...',extra_tags='danger')
            return redirect("/signin")

    else:
        return render(request,"login.html")
def usersignup(request):
    if request.method=="POST":
        username=request.POST.get("username")
        firstName=request.POST.get("firstName")
        lastName=request.POST.get("lastName")
        email=request.POST.get("email")
        password=request.POST.get("password")
        old_user=authenticate(username=username, email=email, password=password)
        if old_user is None:
                new_user = User.objects.create_user(username=username,email=email,password=password,first_name=firstName,last_name=lastName)
                new_user.save()
                messages.success(request, "Register succesfully>>>",extra_tags='success')
                return redirect("/signin")

        elif old_user is not None:
            messages.error(request, "User all ready Exist",extra_tags='danger')
            return redirect("/signin")
        else:
            messages.error(request, "enter correct information",extra_tags='danger')
            return redirect("/error")
    else:
        return render(request,'login.html')
    
def signout(request):
    logout(request)
    messages.success(request, "Logout succesfully>>",extra_tags='success')
    return redirect("/signin")
def experience(request):
    return render(request,"experience.html")

def error(request):
    return render(request,"404.html")
def contact(request):
    if request.method=="POST":
        name=request.POST.get("name")
        email=request.POST.get("email")
        phone=request.POST.get("phone")
        message=request.POST.get("message")
        date=datetime.today()
        contact=Contact(name=name,email=email,phone=phone,message=message,date=date)
        contact.save()
        messages.success(request, "Your Massage has been sent.")
        return redirect("/#contact")
    else:
        return redirect("/error")