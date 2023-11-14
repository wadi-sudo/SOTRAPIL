from django.urls import path
from . import views
from django.contrib.auth import views as auth_view
from .views import CustomLoginView
from .views import RegisterPage
from django.contrib.auth.views import LogoutView

from .views import predict


urlpatterns = [

    path('', views.index, name='index'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    # path('register/', RegisterPage.as_view(), name='register'),
    path("register", views.register, name="register"),
    path('admin/', views.admin, name='admin'),
    path('edit/', views.edit, name='edit'),
    path('predict/', predict, name='predict'),

]
