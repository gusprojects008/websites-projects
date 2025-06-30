# Website vulnerable to SQLI

## Structure
* The user can add a comment as long as he adds a username.
* The user can only comments 3 times, each time he sends a comment, a number associated with his username is incremented.
* The user cannot add a comment with a username that is already used or already exist.
* The username can have a maximum of 32 characters
* The username will be added to users.db (along with the increment) and the comments will be added to comments.db (the comment will be added together with the associated username).

*is validation on the frontend sufficient or efective?*

**Good Luck!**

---

## Usage
