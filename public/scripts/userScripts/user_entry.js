
//entry form slider
window.onload = function () {
	const loginText = document.querySelector(".title-text .login");
	const loginForm = document.querySelector("form.login");
	const loginBtn = document.querySelector("label.login");
	const signupBtn = document.querySelector("label.signup");
	const signupLink = document.querySelector("form .signup-link a");

	if (signupBtn) {
		signupBtn.onclick = (() => {
			loginForm.style.marginLeft = "-50%";
			loginText.style.marginLeft = "-50%";
		});
		loginBtn.onclick = (() => {
			loginForm.style.marginLeft = "0%";
			loginText.style.marginLeft = "0%";
		});
		signupLink.onclick = (() => {
			signupBtn.click();
			return false;
		});
}
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
function validateforgot() {
	
	var flag = 1;
	var email_login = document.getElementById("email-login").value
	var emailspan = document.getElementById("email-error-login")
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
	} if(flag==0)
		return false
	else
		true
}
  
function clear_error(id) {
	  const el = document.getElementById("signup-error");
	if (el) {
		document.getElementById(id).innerHTML = "";
		}
	}

function validatereset() { 
	var passwordspan = document.getElementById("password-error-signup")
	var newpasswordspan = document.getElementById("newpassword-error-signup")
	var password_signup = document.getElementById("password-signup").value
	var newpassword_signup = document.getElementById("newpassword-signup").value
	var flag = 1;

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

// script

const inputs = document.getElementById("inputs");
if (inputs) {
	inputs.addEventListener("input", function (e) {
		const target = e.target;
		const val = target.value;

		if (isNaN(val)) {
			target.value = "";
			return;
		}

		if (val != "") {
			const next = target.nextElementSibling;
			if (next) {
				next.focus();
			}
		}
	});

	inputs.addEventListener("keyup", function (e) {
		const target = e.target;
		const key = e.key.toLowerCase();

		if (key == "backspace" || key == "delete") {
			target.value = "";
			const prev = target.previousElementSibling;
			if (prev) {
				prev.focus();
			}
			return;
		}
	});
	var timeleft = 60;
	var downloadTimer = setInterval(function () {
		timeleft--;
		document.getElementById("countdowntimer").textContent = timeleft;
		if (timeleft <= 0)
			clearInterval(downloadTimer);
	}, 1000);
}
	
function validateotp() {
		
	var input1 = document.getElementById("input1").value
	var input2 = document.getElementById("input2").value
	var input3 = document.getElementById("input3").value
	var input4 = document.getElementById("input4").value
	if (input1 === "" || input2 === "" || input3 === "" || input4 === "" || input1 === null || input2 === null || input3 === null || input4 === null) { 
		return false;
	}
}

function validateEditProfile() {
	flag = 1;
	var namespan = document.getElementById("name-error")
	var mobile_nospan=document.getElementById("mobile-error")

	var name= document.getElementById("name").value
	var mobileno = document.getElementById("mobile-no").value

	var mobile_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
	if (name == "" || name == null) {
		namespan.innerHTML = "&#x1F6C8; Name is a required field"
		document.getElementById("name").focus();
		flag = 0;
	} else {
		namespan.innerHTML = ""
	}
	if (mobileno == "" || mobileno == null) {
		mobile_nospan.innerHTML = "&#x1F6C8; Mobile no is a required field"
		document.getElementById("mobile-no").focus();
		flag = 0;
	}
	else if ((mobileno.match(mobile_regex)==null)) {
		mobile_nospan.innerHTML = "&#x1F6C8; Mobile no should be numbers"
		flag = 0;
	} 
	else { 
		mobile_nospan.innerHTML = "";
	}
	
	if (flag == 0)
	return false
	else
	return true
}	

function validateNewPassword() { 
	var passwordspan = document.getElementById("password1-error")
	var newpasswordspan = document.getElementById("password2-error")
	var password = document.getElementById("password1").value
	var newpassword = document.getElementById("password2").value
	var flag = 1;

	if (password == "" || password == null) {
			passwordspan.innerHTML = "&#x1F6C8; Password is a required field"
			document.getElementById("password1").focus();
			flag = 0;
		} else {
			passwordspan.innerHTML = ""
		}
		if (newpassword == "" || newpassword == null) {
			newpasswordspan.innerHTML = "&#x1F6C8; Confirm password is a required field"
			document.getElementById("password2").focus();
			flag = 0;
		} else if (password!= newpassword) {
			newpasswordspan.innerHTML = "&#x1F6C8; Passwords doesnot match"
			document.getElementById("password1").focus();
			document.getElementById("password2").focus();
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
	
function validateConfirmPassword() { 
	var passwordspan = document.getElementById("password-error")
	var password = document.getElementById("password").value
	var flag = 1;

	if (password == "" || password == null) {
			passwordspan.innerHTML = "&#x1F6C8; Password is a required field"
			document.getElementById("password").focus();
			flag = 0;
		} else {
			passwordspan.innerHTML = ""
		}
		if (flag == 0)
			return false
		else
			return true
}

function validateAddAddress() {
	flag = 1;
	var house_nospan = document.getElementById("house-error")
	var landmarkspan = document.getElementById("landmark-error")
	var pincodespan = document.getElementById("pincode-error")
	var statespan = document.getElementById("state-error")
	var districtspan=document.getElementById("district-error")
	var streetspan = document.getElementById("street-error")
	
	var houseno = document.getElementById("house-no").value
	var state = document.getElementById("state").value
	var street = document.getElementById("street").value
	var pincode = document.getElementById("pincode").value
	var landmark = document.getElementById("landmark").value
	var district = document.getElementById("district").value

		if (houseno == "" || houseno == null) {
			house_nospan.innerHTML = "&#x1F6C8; House no is a required field"
			document.getElementById("house-no").focus();
			flag = 0;
		} else {
			house_nospan.innerHTML = ""
		}
		if (street == "" || street == null) {
			streetspan.innerHTML = "&#x1F6C8; Street name is a required field"
			document.getElementById("street").focus();
			flag = 0;
		}
		else {
			streetspan.innerHTML = "";
	}
	if (district == "" || district == null) {
		districtspan.innerHTML = "&#x1F6C8; District is a required field"
		document.getElementById("district").focus();
		flag = 0;
	}
	else {
		districtspan.innerHTML = "";
	}
	if (state == "" || state == null) {
		statespan.innerHTML = "&#x1F6C8; State is a required field"
		document.getElementById("state").focus();
		flag = 0;
	}
	else {
		statespan.innerHTML = "";
}
if (landmark == "" || landmark == null) {
	landmarkspan.innerHTML = "&#x1F6C8; Landmark is a required field"
	document.getElementById("landmark").focus();
	flag = 0;
}
else {
	landmarkspan.innerHTML = "";
}
if (pincode == "" || pincode == null) {
	pincodespan.innerHTML = "&#x1F6C8; Pincode is a required field"
	document.getElementById("pincode").focus();
	flag = 0;
}
else {
	pincodespan.innerHTML = "";
	}
	if (flag == 0)
	return false
	else
	return true
}	

const nl = document.querySelectorAll(".cart-price")
	if (nl) {
		var priceList = Array.from(nl)
		var totalAmount = priceList.reduce((total, value) => { 
			var price = parseInt(value.innerHTML)
			return total += price;
		}, 0)
}
	var el = document.getElementById("totalPrice")
	var checkOutPrice = document.getElementById("priceCheckOut")
	if (el) { 
		el.innerHTML = totalAmount;
		var deliveryCharge = document.getElementById("deliveryFee")
		if (totalAmount >= 3000) { 
			deliveryCharge.innerHTML = "Free"
			if (checkOutPrice) {
				checkOutPrice.innerHTML = totalAmount;
			}
		}
		else {
			deliveryCharge.innerHTML = "Rs.90"

				if (checkOutPrice) {
				checkOutPrice.innerHTML = totalAmount+90;
			}
		}
		var grandTotal = document.getElementById("sumTot")
    if (grandTotal) {
			grandTotal.value = checkOutPrice.innerHTML;
     }
}


function decQty(prodId) {
	var quantity = document.getElementById("qtyNo" + prodId)
	var productPrice = document.getElementById("price" + prodId)
	var totalAmount = document.getElementById("totalPrice")
	var checkOutAmount = document.getElementById("priceCheckOut")
	var deliveryFee = document.getElementById("deliveryFee")
	if (quantity.value > 1) {
		quantity.value = parseInt(quantity.value) - 1;

		fetch("/dec_qty/" + prodId, { method: 'PUT' })
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok.');
				}
				return response.json();
			})
			.then((newData) => {
				productPrice.innerHTML = newData.totalPrice
				const nl = document.querySelectorAll(".cart-price")
				let priceList = Array.from(nl)
				if (nl) {
					var checkOutPrice = priceList.reduce((total, value) => {
						var price = parseInt(value.innerHTML)
						return total += price;
					}, 0)
				}
				totalAmount.innerHTML = checkOutPrice
				if (checkOutPrice >= 3000) {
					deliveryFee.innerHTML = "Free"
					checkOutAmount.innerHTML = checkOutPrice
				}
				else {
					deliveryFee.innerHTML = "Rs.90"
					checkOutAmount.innerHTML = checkOutPrice + 90;
				}			
			})	
	}
	else if(quantity.value==1) {
		swal({
		icon: "error",
		title: "Minimum One Quantity",
		text: "Please select atleast one quantity",
		});		 
	}	
}
function incQty(prodId) {
	var quantity = document.getElementById("qtyNo" + prodId)
	var productPrice = document.getElementById("price" + prodId)
	var totalAmount = document.getElementById("totalPrice")
	var checkOutAmount= document.getElementById("priceCheckOut")
	var deliveryFee = document.getElementById("deliveryFee")
  
	var quantityVal = parseInt(document.getElementById("qtyNo" + prodId).value)
	var stockVal = parseInt(document.getElementById("productStock" + prodId).value)

	 if(quantityVal >= 10) {
		swal({
			title: "Product Limit Reached",
			text: "You can only add 10 No's per product",
			timer: 4000
		});
	 } else {
		 
		 if (quantityVal < stockVal) {
			quantity.value = parseInt(quantity.value) + 1;
	
			fetch("/inc_qty/" + prodId, { method: 'PUT' })
				.then((response) => {
				
				if (!response.ok) {
					throw new Error('Network response was not ok.');
				}
				return response.json();
			})
			.then((newData) => {
				var checkOutPrice = 0;
				productPrice.innerHTML = newData.totalPrice
				const nl = document.querySelectorAll(".cart-price")
				let priceList = Array.from(nl)
				if (nl) {
						checkOutPrice = priceList.reduce((total, value) => {
						var price = parseInt(value.innerHTML)
						return total += price;
					}, 0)
				}
					totalAmount.innerHTML =checkOutPrice
					if (checkOutPrice >= 3000) { 
						deliveryFee.innerHTML = "Free"
						checkOutAmount.innerHTML = checkOutPrice
					}
					else {
						deliveryFee.innerHTML = "Rs.90"
						checkOutAmount.innerHTML = checkOutPrice + 90;
					}			
			})
			.catch((error) => {
	
				console.log('Error:', error.message);
			});
		 }
		 else {
			swal({
				title: "Product Out Of Stock",
				text: "Cannot add more quantity",
				timer: 3000
			});
		}		
	}
}


const form1 =document.getElementById("addressForm")
if (form1) {
	form1.addEventListener('submit', paymentExpand);
}
function paymentExpand(e) {
	e.preventDefault();
	
	const formData = new FormData(form1);
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

  fetch('/delivery_address', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			 Accept:"application/json"
		},
	body: formDataJsonString
	}).then((response) => {
	   return	response.json()
  })
		.then((data) => {
			var target = document.getElementById("paymentBox").classList.add("expand")
	}); 
}

function addAddressExpand() {
	var target = document.getElementById("newAddressBox").classList.toggle("expand")
	
}

function cancelOrder(id) {

	fetch("/cancel_order?id=" + id, { method: 'PUT' })
	.then((response) => {
	
	if (!response.ok) {
		throw new Error('Network response was not ok.');
		}
		return response
	}).then((data) => {
		window.location.href = "/order";
	})
}


