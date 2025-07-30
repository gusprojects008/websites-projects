from django.urls import path
from .views import endpoint_api

urlpatterns = [
  path("scripts/endpointAPI", endpoint_api, name="endpoint_api"),
]
