from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
# from .forms import UserRegisterForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .forms import PositionForm, NewUserForm, RegistrationForm
from django.urls import reverse_lazy

from django.contrib.auth.decorators import user_passes_test
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView

from django.contrib.auth.views import LoginView

from django.contrib.auth import login
import pandas as pd
import joblib
from django.http import JsonResponse
from datetime import datetime

# def register(request):
# 	if request.method=='POST':
# 		form=UserRegisterForm(request.POST)
# 		if form.is_valid():form.save();username=form.cleaned_data.get('username');messages.success(request,f"Hi {username}, your account was created successfully");return redirect('home')
# 	else:form=UserRegisterForm()
# 	return render(request,'geoApp/register.html',{'form':form})


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = RegistrationForm()
    return render(request, 'geoApp/register.html', {'form': form})

# def register_request(request):
# 	if request.method == "POST":
# 		form = NewUserForm(request.POST)
# 		if form.is_valid():
# 			user = form.save()
# 			login(request, user)
# 			messages.success(request, "Registration successful." )
# 			return redirect('index')
# 		messages.error(request, "Unsuccessful registration. Invalid information.")
# 	form = NewUserForm()
# 	return render (request=request, template_name="geoApp/register.html", context={"register_form":form})


class CustomLoginView(LoginView):
    template_name = 'geoApp/login.html'
    fields = '__all__'
    redirect_authenticated_user = True

    def get_success_url(self):
        return reverse_lazy('index')


class RegisterPage(FormView):
    template_name = 'geoApp/register.html'
    form_class = UserCreationForm
    redirect_authenticated_user = True
    success_url = reverse_lazy('index')


# def home(request):return render(request,'geoApp/home.html')


@login_required()
def admin(request): return render(request, 'geoApp/profile.html')

@login_required()
def edit(request): return render(request, 'geoApp/edit.html')

@login_required()
def index(request):
    if request.user.is_superuser:
        return render(request, 'geoApp/index.html')
    elif request.user.groups.filter(name="staf_user").exists():
        return render(request, 'geoApp/index_staff.html')
    elif request.user.groups.filter(name="simple_user").exists():
        return render(request, 'geoApp/index_user.html')
    else:
        return render(request, 'geoApp/index_user.html')


def predict(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        date = request.POST.get('date')
        date = datetime.strptime(date, '%Y-%m-%d').date()
        model = joblib.load('geoApp/activity_predictor.joblib')
        name_encoder = joblib.load('geoApp/name.joblib')
        activity_encoder = joblib.load('geoApp/activity.joblib')
        train_data = pd.read_csv('geoApp/pipes.csv')
        name_encoder.fit(train_data['names'])
        name_encoded = name_encoder.transform([name])[0]
        year = date.year
        month = date.month
        day = date.day
        day_of_week = date.weekday()
        activity_encoded = model.predict(
            [[name_encoded, year, month, day, day_of_week]])[0]
        activity = activity_encoder.inverse_transform([activity_encoded])[0]

        return JsonResponse({'value': activity})
    return render(request, 'geoApp/index.html')
