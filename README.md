# movies-crud
This project is basically a CRUD for a site of movies rating. It will be developed in React and Nodejs.

Before using the web site, please access as Admin, beacuse just the user Admin can add, edit or delete movies. 
Admin cannot comment or rate any movie. It is not possible to create a new Admin account, it was created directly in the database. The credentials for this user are:

username: 'admin'
password: 'admin

In the data base, there are two more users. Use them to do a comment and/or to rate a movie. Also, it is possible to create new users by signing up a new account. The credentials for these users are:

username: 'Usuario'
password: '12345'

username: 'Usuario2'
password: '12345'

username: 'Usuario2'
password: '12345'

Furthermore, there is a folder, 'portadas'. In it, there are some images from different movies. Use them to test the system.

IMPORTANT: It is possible to delete almost all information from database, nothing will happen, except for the user admin. If you delete all the information, make sure to create a new account and modify the field 'tipo'; to make an administrator user, this field must be 1. A normal user has 2 as 'tipo'. 