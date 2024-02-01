//entry form slider
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
	loginForm.style.marginLeft = "-50%";
	loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
	loginForm.style.marginLeft = "0%";
	loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
	signupBtn.click();
	return false;
});
//prevent resubmission
if ( window.history.replaceState ) {
	window.history.replaceState( null, null, window.location.href );
}

function validatelogin() {
	var flag = 1;
	var emailspan = document.getElementById("email-error-login")
	var passwordspan = document.getElementById("password-error-login")
	var email_login = document.getElementById("email-login").value
	var password_login = document.getElementById("password-login").value
  
	var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
	
	if (email_login == "" || email_login == null) {
		emailspan.innerHTML = "&#x1F6C8; Email is a required field"
		document.getElementById("email-login").focus();
		flag = 0;
	}
	else if (email_login.match(validRegex)) {
		emailspan.innerHTML = "";
	}
	else {
		emailspan.innerHTML = "&#x1F6C8; Invalid email format"
		document.getElementById("email-login").focus();
		flag = 0;
	}
	if (password_login == "" || password_login == null) {
		passwordspan.innerHTML = "&#x1F6C8; Password is a required field"
		document.getElementById("password-login").focus();
		flag = 0;
	}
	else { 
		passwordspan.innerHTML = "";
	}
	if (flag == 0)
		return false
	else
		return true
}
function validatesignup() {
	flag = 1;
	var namespan = document.getElementById("name-error-signup")
	var emailspan = document.getElementById("email-error-signup")
	var mobile_nospan=document.getElementById("mobile_no-error-signup")
	var passwordspan = document.getElementById("password-error-signup")
	var newpasswordspan = document.getElementById("newpassword-error-signup")
	
	var name_signup = document.getElementById("name-signup").value
	var email_signup = document.getElementById("email-signup").value
	var mobileno_signup = document.getElementById("mobile_no-signup").value
	var password_signup = document.getElementById("password-signup").value
	var newpassword_signup = document.getElementById("newpassword-signup").value
  
	var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
	var mobile_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
	if (name_signup == "" || name_signup == null) {
		namespan.innerHTML = "&#x1F6C8; Name is a required field"
		document.getElementById("name-signup").focus();
		flag = 0;
	} else {
		namespan.innerHTML = ""
	}
		
	if (email_signup == "" || email_signup == null) {
		emailspan.innerHTML = "&#x1F6C8; Email is a required field"
		document.getElementById("email-signup").focus();
		flag = 0;
	}
	else if (email_signup.match(validRegex)) {
		emailspan.innerHTML = ""
	}
	else {
		emailspan.innerHTML = "&#x1F6C8; Invalid email format"
		document.getElementById("email-signup").focus();
		flag = 0;
	}
	if (mobileno_signup == "" || mobileno_signup == null) {
		mobile_nospan.innerHTML = "&#x1F6C8; Mobile no is a required field"
		document.getElementById("mobile_no-signup").focus();
		flag = 0;
	}
	else if ((mobileno_signup.match(mobile_regex)==null)) {
		mobile_nospan.innerHTML = "&#x1F6C8; Mobile no should be numbers"
		flag = 0;
	} 
	else { 
		mobile_nospan.innerHTML = "";
	}

		if (password_signup == "" || password_signup == null) {
			passwordspan.innerHTML = "&#x1F6C8; Password is a required field"
			document.getElementById("password-signup").focus();
			flag = 0;
		} else {
			passwordspan.innerHTML = ""
		}
		if (newpassword_signup == "" || newpassword_signup == null) {
			newpasswordspan.innerHTML = "&#x1F6C8; Newpassword is a required field"
			document.getElementById("password-signup").focus();
			flag = 0;
		} else if (password_signup != newpassword_signup) {
			newpasswordspan.innerHTML = "&#x1F6C8; Passwords doesnot match"
			flag = 0;
		}
		else {
			newpasswordspan.innerHTML = "";
		}
		if (flag == 0)
			return false
		else
			return true
	}
