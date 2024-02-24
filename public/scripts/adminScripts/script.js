//prevent resubmission
if ( window.history.replaceState ) {
	window.history.replaceState(null, null, window.location.href);
	console.log("working")
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
		console.log("hello")
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

function clear_error(id) { 
	document.getElementById(id).innerHTML = "";
}



function validatecategory() { 
 console.log("hello")
		flag = 1;
		var categoryspan = document.getElementById("category-error")
		var descriptionspan = document.getElementById("description-error")
		var imagespan=document.getElementById("image-error")
		
		var category = document.getElementById("categoryName").value
		var description = document.getElementById("description").value
		var image = document.getElementById("image").value
	
		if (category == "" || category == null) {
			categoryspan.innerHTML = "&#x1F6C8; Category is a required field"
			document.getElementById("categoryName").focus();
			flag = 0;
		} else {
			categoryspan.innerHTML = ""
		}
			
	
	if (description == "" || description == null) {
		descriptionspan.innerHTML = "&#x1F6C8; Description is a required field"
		document.getElementById("description").focus();
		flag = 0;
	}
	else {
		descriptionspan.innerHTML = ""
	}

		if (image == "" || image == null) {
			imagespan.innerHTML = "&#x1F6C8; image not uploaded"
			document.getElementById("image").focus();
			flag = 0;
		}
		else { 
			imagespan.innerHTML = "";
	}
	
		if (flag == 0)
				return false
		else
			return true
	
}

function validateEditCategory() { 

	flag = 1;
	var categoryspan = document.getElementById("category-error")
	var descriptionspan = document.getElementById("description-error")
	var imagespan=document.getElementById("image-error")
	
	var category = document.getElementById("categoryName").value
	var description = document.getElementById("description").value
	var image = document.getElementById("image").value

	if (category == "" || category == null) {
		categoryspan.innerHTML = "&#x1F6C8; Category is a required field"
		document.getElementById("categoryName").focus();
		flag = 0;
	} else {
		categoryspan.innerHTML = ""
	}
		

if (description == "" || description == null) {
	descriptionspan.innerHTML = "&#x1F6C8; Description is a required field"
	document.getElementById("description").focus();
	flag = 0;
}
else {
	descriptionspan.innerHTML = ""
}

	if (flag == 0)
			return false
	else
		return true

}

function validatecategory() { 
	console.log("hello")
		 flag = 1;
		 var categoryspan = document.getElementById("category-error")
		 var descriptionspan = document.getElementById("description-error")
		 var imagespan=document.getElementById("image-error")
		 
		 var category = document.getElementById("categoryName").value
		 var description = document.getElementById("description").value
		 var image = document.getElementById("image").value
	 
		 if (category == "" || category == null) {
			 categoryspan.innerHTML = "&#x1F6C8; Category is a required field"
			 document.getElementById("categoryName").focus();
			 flag = 0;
		 } else {
			 categoryspan.innerHTML = ""
		 }
			 
	 
	 if (description == "" || description == null) {
		 descriptionspan.innerHTML = "&#x1F6C8; Description is a required field"
		 document.getElementById("description").focus();
		 flag = 0;
	 }
	 else {
		 descriptionspan.innerHTML = ""
	 }
 
		 if (image == "" || image == null) {
			 imagespan.innerHTML = "&#x1F6C8; image not uploaded"
			 document.getElementById("image").focus();
			 flag = 0;
		 }
		 else { 
			 imagespan.innerHTML = "";
	 }
	 
		 if (flag == 0)
				 return false
		 else
			 return true
	 
 }
 //dashboard
let menuicn = document.querySelector("menuicn"); 
let nav = document.querySelector(".navcontainer"); 

menuicn.addEventListener("onClick", () => { 
	console.log("itshappening")
	nav.classList.toggle("navclose"); 
})
