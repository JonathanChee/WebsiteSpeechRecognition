function getLoginUsername(){
    event.preventDefault();
   
    if(sessionStorage.getItem("ziababa_firstname") == null){
        sessionStorage.setItem("ziababa_firstname", "");
    }
    if(sessionStorage.getItem("ziababa_lastname") == null){
        sessionStorage.setItem("ziababa_lastname", "");
    }

    var usernameLogin = sessionStorage.getItem("ziababa_firstname") + " " + sessionStorage.getItem("ziababa_lastname");
    //console.log("usernameLogin : "+ usernameLogin);
    document.getElementById("loginusername").textContent = usernameLogin;
}

function logoutFunction(){
    event.preventDefault();
    console.log("Enter logoutFunction()");
    sessionStorage.setItem("ziababa_userId", "");
    sessionStorage.setItem("ziababa_emailaddr", "");
    sessionStorage.setItem("ziababa_firstname", "");
    sessionStorage.setItem("ziababa_lastname", "");
    document.getElementById("loginusername").textContent = "";
}


function loginFunction(){
    event.preventDefault();
    
    var response = true;
    var emailaddrLogin = document.getElementById("email").value;
    if(sessionStorage.getItem("ziababa_emailaddr") === emailaddrLogin)
    {
        alert("You are still logon!");
    }
    else
    {
        if((sessionStorage.getItem("ziababa_emailaddr") != "")&&(sessionStorage.getItem("ziababa_emailaddr") != null))
        {
            response = confirm("Are you sure you want to proceed and logout the previous user?");
        }

        if(response == true)
        {
            //var emailaddrLogin = document.getElementById("email").value;
            var passwordLogin = document.getElementById("pwd").value;
            console.log("Username : " + emailaddrLogin + " AND Password :"+passwordLogin);
            var account = new Object();
            account.emailaddr = emailaddrLogin;

            var postLogin = new XMLHttpRequest();

            postLogin.open("POST", login_url, true);
            postLogin.setRequestHeader("Content-Type", "application/json");

            //respond
            postLogin.onload = function()
            {
                if(postLogin.responseText === "[]"){
                    alert("Invalid Username and Password");
                }
                else
                {
                    account_array = JSON.parse(postLogin.responseText);
                    if(passwordLogin === account_array[0].password)
                    {
                        alert("Login Successful");
                        $('#myLoginModal').modal('hide');
                        sessionStorage.setItem("ziababa_userId", account_array[0]._userAccountId);
                        sessionStorage.setItem("ziababa_firstname", account_array[0].firstname);
                        sessionStorage.setItem("ziababa_lastname", account_array[0].lastname);
                        sessionStorage.setItem("ziababa_emailaddr", emailaddrLogin);
                        var usernameLogin = sessionStorage.getItem("ziababa_firstname") + " " + sessionStorage.getItem("ziababa_lastname");
                        document.getElementById("loginusername").textContent = usernameLogin;               
                    }
                    else{
                        alert("Incorrect Username and Password);")
                    }
                }
            };

            //request
            postLogin.send(JSON.stringify(account));
        }
    }
}


function validateEmailFunction(){
    event.preventDefault();

    console.log("Enter validateEmailFunction()");
    var emailaddrValidate = document.getElementById("emailReg").value;
    console.log("Email Address: " + emailaddrValidate);

    var validate = new Object();
    validate.emailaddr = emailaddrValidate;

    var postValidateEmail = new XMLHttpRequest();
    postValidateEmail.open("POST", '/validateEmail', true);
    postValidateEmail.setRequestHeader("Content-Type", "application/json");

    //respond
    postValidateEmail.onload = function()
    {
        if(postValidateEmail.responseText === "[]"){
            alert("Invalid Email Address!");
        }
        else
        {
            var email_array = [];
            email_array = JSON.parse(postValidateEmail.responseText);
            if(email_array[0].counter > 0)
            {
                alert("Email address already been used. Please use another email address!");
            }
            else{
                registerFunction();
            }
        }
    };

    //request
    postValidateEmail.send(JSON.stringify(validate));
}


function registerFunction(){
    event.preventDefault();

    var firstnameReg = document.getElementById("firstname").value;
    var lastnameReg = document.getElementById("lastname").value;    
    var emailaddrReg = document.getElementById("emailReg").value;
    var passwordReg = document.getElementById("pwdReg").value;
    var mobileReg = document.getElementById("mobile").value;
    var haddrReg = document.getElementById("homeaddr").value;
    var genderReg;
    if(document.getElementById("genderMale").checked)
    {
        genderReg = 'Male';
    }
    else if(document.getElementById("genderFemale").checked)
    {
        genderReg = 'Female';
    }

    console.log("First Name: " + firstnameReg + ", Last Name: " + lastnameReg +
                ", EmailAddr: " + emailaddrReg + ", Password: " + passwordReg +
                ", Mobile: " + mobileReg + ", HomeAddr: " + haddrReg + ", Gender: " + genderReg);
    
    var register = new Object();
    register.firstname        = firstnameReg;
    register.lastname         = lastnameReg;
    register.emailaddr        = emailaddrReg;
    register.password         = passwordReg;
    register.mobile           = mobileReg;  
    register.homeaddr         = haddrReg;  
    register.gender           = genderReg;
    register.profilephotolink = "";

    var postRegistration = new XMLHttpRequest();
    postRegistration.open("POST", '/registration', true);
    postRegistration.setRequestHeader("Content-Type", "application/json");

    //respond
    postRegistration.onload = function()
    {
        if(postRegistration.status == 200){
            alert("Register Successful");
        }
        else
        {
            alert("Register Not Successful");
        }
    };

    //request
    postRegistration.send(JSON.stringify(register));
}

