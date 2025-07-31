from django.urls import path
from .views import endpoint_api, list_comments

urlpatterns = [
  path("scripts/endpointAPI", endpoint_api, name="endpoint_api"),
  #path("scripts/endpointAPI/list_comments", list_comments, name="list_comments")
  path("scripts/list_comments", list_comments, name="list_comments")
]
