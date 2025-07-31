from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import sqlite3
import os

# Create your views here.
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, "database.db")

#print(BASE_DIR, DATABASE_PATH)

@csrf_exempt
def endpoint_api(request):

    if request.method != "POST":
       return HttpResponse("Bad Method );", status=405)

    username = request.POST.get("username", "").strip()
    comment = request.POST.get("comment", "").strip()

    connection_db = sqlite3.connect(DATABASE_PATH)
    cursor = connection_db.cursor()
    cursor.execute("""
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        base_username TEXT,
        username_count TEXT UNIQUE,
        comment TEXT
      )
    """)

    # intentionally vulnerable to SQLI
    cursor.execute(f"SELECT COUNT(*) FROM comments WHERE base_username = '{username}'")
    count = cursor.fetchone()[0]

    if count >= 3:
       connection_db.close()
       return HttpResponse("Oops! You've reached the maximum comment limit );")

    username_count = f"{username} quantity:{count + 1}"
    cursor.execute(f"""
      INSERT INTO comments (base_username, username_count, comment)
      VALUES ('{username}', '{username_count}', '{comment}')
    """)

    connection_db.commit()
    connection_db.close()

    response = {
      "status": "success",
      "message": f"Success! Comment added with username <b>{username_count}</b>",
      "username": username,
      "comment": comment
    }
 
    return JsonResponse(response)

def list_comments(request):
    if request.method != "GET":
       return JsonResponse({"status": "error", "message": "Bad method );"})

    db_connection = sqlite3.connect(DATABASE_PATH)
    db_cursor = db_connection.cursor()
    
    db_cursor.execute("SELECT username_count, comment FROM comments")
    rows = db_cursor.fetchall()
    db_connection.close()

    comments_response = [{"username": username, "comment": comment} for username, comment in rows]

    return JsonResponse({"status": "success", "message": comments_response})
