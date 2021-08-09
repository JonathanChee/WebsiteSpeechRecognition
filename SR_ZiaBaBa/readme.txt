1. Install XAMPP

2. Goto C:\XAMPP and run xampp-control.exe
         or
   On the desktop click on the XAMMPP Control Panel icon

3. Click the Start actions for the MySQL

4. Minimise the XAMPP app

5. The database backup sql script can be found in the folder
	\SR_ZiaBaBa\DatabaseBkupSqlScript
   You may use the MySQL Workbench to import the database by running
   the sql script 20210802_inclSchema_myziababa_db.sql

   Lanuch MySQL WorkBench
	- Go to Server Tab
	- Select Data Import
	- Import from Self-Contained File
		- Select the above mentioned Sql script file

6. Go the the directory C:\Users\JCJCJC\Documents\SR_ZiaBaBa 
   and run the node server.js
           or
   Execute the bat file srZiaBaBa.bat

7. On the google chrome browser at the url field type
   http://127.0.0.1:8080
          or
   http://localhost:8080


8. At the ZiaBaBa Home page
	i)   Say ABOUT US to pop-up the About Us modal
	ii)  Say CLOSE to close the modal
	iii) Say RESTAURANT to show the dropdown menu.
	     Say RESTAURANT again will toggle the dropdown menu.
        iv)  Say the NORTH, SOUTH, EAST, WEST REGION or ISLAND WIDE to
             show the list of restaurant
        v)   Say the name of the restaurant
        vi)  Say DETAIL to pop-up the restaurant detail modal
	vii) Say REVIEW to view the restaurant comments
	viii)Say NEW COMMENT to give a comment of the restaurant
	     (follow the voice activated instruction to give comment)
        ix)  Say REVIEW to get back to review page
        x)   Say EDIT ID <NUMBER> to edit the comment
             (follow the voice activated instruction to give comment)
                        or
             Say DELETE ID <NUMBER> to delete the comment

Note : To give a new comment, edit a comment or delete a comment
       you must login. 
       To login, go to login page.
       You can login into this account to do testing
       Username : marktan@gmail.com
       Password : marktan

       If you have no account, you can create an account with the
       sign-in page. And than use that account to do the testing.

       For login, sign-in and contact-us webpage, there is
       no speech recognition capabilites yet.

       Speech recongition capability only available for:
		a) Home page
		b) Restaurant page
		c) About-Us page
       
                