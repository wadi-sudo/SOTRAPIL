from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.core.validators import RegexValidator



class PositionForm(forms.Form):
    position = forms.CharField()
    
# class UserRegisterForm(UserCreationForm):
#     email = forms.EmailField()

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password1', 'password2']
######################
class NewUserForm(UserCreationForm):
	email = forms.EmailField(required=True)

	class Meta:
		model = User
		fields = ("username", "email", "password1", "password2")

	def save(self, commit=True):
		user = super(NewUserForm, self).save(commit=False)
		user.email = self.cleaned_data['email']
		if commit:
			user.save()
		return user
		
###################
class RegistrationForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, validators=[RegexValidator(r'^[A-Z][a-z]*$')])
    last_name = forms.CharField(max_length=30, required=True, validators=[RegexValidator(r'^[A-Z][a-z]*$')])
    email = forms.EmailField(max_length=254, help_text='Requis. Entez une adresse e-mail valide.')
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

    def clean_username(self):
        username = self.cleaned_data['username']
        if len(username) < 8:
            raise forms.ValidationError('Username must contain at least 8 characters')
        return username

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if len(password1) < 8 or len(password2) < 8:
            raise forms.ValidationError("Password must contain at least 8 characters")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2
