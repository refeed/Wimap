from django.conf.urls import url

from auth_api.api import LogoutView, LoginView, UserView

urlpatterns = [
    url(r'^login/$', LoginView.as_view()),
    url(r'^logout/$', LogoutView.as_view()),
    url(r'^userinfo', UserView.as_view())
]
