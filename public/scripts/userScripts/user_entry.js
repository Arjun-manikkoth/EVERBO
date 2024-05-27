
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
	var email_login = document.getElementById("email-login").value.trim()
	var password_login = document.getElementById("password-login").value.trim()
  
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
	
	var name_signup = document.getElementById("name-signup").value.trim()
	var email_signup = document.getElementById("email-signup").value.trim()
	var mobileno_signup = document.getElementById("mobile_no-signup").value.trim()
	var password_signup = document.getElementById("password-signup").value.trim()
	var newpassword_signup = document.getElementById("newpassword-signup").value.trim()
  
	var passwordRegex=/^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/

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
		} 
		else {
			 if (password_signup.length<8) {
				passwordspan.innerHTML = "&#x1F6C8; Password should contain minimum 8-12 characters "
				document.getElementById("password-signup").focus();
				 flag = 0;
				 
			 }
			 else if (password_signup.match(passwordRegex) == null) {
				passwordspan.innerHTML = "&#x1F6C8; Use a stronger password including numbers and special characters"
				document.getElementById("password-signup").focus();
				 flag = 0;
			}
			else if (newpassword_signup == "" || newpassword_signup == null) {
				newpasswordspan.innerHTML = "&#x1F6C8; New password is a required feild"
				document.getElementById("newpassword-signup").focus();
				flag = 0;
			}
			else if (password_signup != newpassword_signup) {
					newpasswordspan.innerHTML = "&#x1F6C8; Passwords doesnot match"
					flag = 0;
			}
			else {
				newpasswordspan.innerHTML = "";
			}
	}
		
		if (flag == 0)
			return false
		else
			return true
	}
function validateforgot() {
	
	var flag = 1;
	var email_login = document.getElementById("email-login").value.trim()
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
	  const el = document.getElementById(id);
	if (el) {
		document.getElementById(id).innerHTML = "";
		}
	}

function validatereset() { 
	var passwordspan = document.getElementById("password-error-signup")
	var newpasswordspan = document.getElementById("newpassword-error-signup")
	var password_signup = document.getElementById("password-signup").value.trim()
	var newpassword_signup = document.getElementById("newpassword-signup").value.trim()
	var flag = 1;

	var passwordRegex=/^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/

	if (password_signup == "" || password_signup == null) {
		passwordspan.innerHTML = "&#x1F6C8; Password is a required field"
		document.getElementById("password-signup").focus();
		flag = 0;
	} 
	else {
		 if (password_signup.length<8) {
			passwordspan.innerHTML = "&#x1F6C8; Password should contain minimum 8-12 characters "
			document.getElementById("password-signup").focus();
			 flag = 0;
			 
		 }
		 else if (password_signup.match(passwordRegex) == null) {
			passwordspan.innerHTML = "&#x1F6C8; Use a stronger password including numbers and special characters"
			document.getElementById("password-signup").focus();
			 flag = 0;
		}
		else if (newpassword_signup == "" || newpassword_signup == null) {
			newpasswordspan.innerHTML = "&#x1F6C8; New password is a required feild"
			document.getElementById("newpassword-signup").focus();
			flag = 0;
		}
		else if (password_signup != newpassword_signup) {
				newpasswordspan.innerHTML = "&#x1F6C8; Passwords doesnot match"
				flag = 0;
		}
		else {
			newpasswordspan.innerHTML = "";
		}
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
		
	var input1 = document.getElementById("input1").value.trim()
	var input2 = document.getElementById("input2").value.trim()
	var input3 = document.getElementById("input3").value.trim()
	var input4 = document.getElementById("input4").value.trim()
	if (input1 === "" || input2 === "" || input3 === "" || input4 === "" || input1 === null || input2 === null || input3 === null || input4 === null) { 
		return false;
	}
}

function validateEditProfile() {
	flag = 1;
	var namespan = document.getElementById("name-error")
	var mobile_nospan=document.getElementById("mobile-error")

	var name= document.getElementById("name").value.trim()
	var mobileno = document.getElementById("mobile-no").value.trim()

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
	var password = document.getElementById("password1").value.trim()
	var newpassword = document.getElementById("password2").value.trim()
	var flag = 1;
	if (password == "" || password == null) {
		passwordspan.innerHTML = "&#x1F6C8; Password is a required field"
		document.getElementById("password1").focus();
		flag = 0;
	} 
	else {
		 if (password.length<8) {
			passwordspan.innerHTML = "&#x1F6C8; Password should contain minimum 8-12 characters "
			document.getElementById("password1").focus();
			 flag = 0;
			 
		 }
		 else if (password.match(passwordRegex) == null) {
			passwordspan.innerHTML = "&#x1F6C8; Use a stronger password including numbers and special characters"
			document.getElementById("password1").focus();
			 flag = 0;
		}
		else if (newpassword == "" || newpassword == null) {
			newpasswordspan.innerHTML = "&#x1F6C8; New password is a required feild"
			document.getElementById("password2").focus();
			flag = 0;
		}
		else if (password != newpassword) {
				newpasswordspan.innerHTML = "&#x1F6C8; Passwords doesnot match"
				flag = 0;
		}
		else {
			newpasswordspan.innerHTML = "";
		}
}

		if (flag == 0)
			return false
		else
			return true
}
	
function validateConfirmPassword() { 
	var passwordspan = document.getElementById("password-error")
	var password = document.getElementById("password").value.trim()
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
	
	var houseno = document.getElementById("house-no").value.trim()
	var state = document.getElementById("state").value.trim()
	var street = document.getElementById("street").value.trim()
	var pincode = document.getElementById("pincode").value.trim()
	var landmark = document.getElementById("landmark").value.trim()
	var district = document.getElementById("district").value.trim()

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

function confirmLogout() {
	Swal.fire({
		title: 'Are you sure?',
		text: "You will be logged out!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, logout!'
	}).then((result) => {
		if (result.isConfirmed) {
		  window.location.href = "/logout";
		}
	});
}

const n2 = document.querySelectorAll(".productDiscountTot")
const nl = document.querySelectorAll(".cart-price")
const n3 = document.querySelectorAll(".category-discount")
	if (nl.length>0) {
		var priceList = Array.from(nl)
		var totalAmount = priceList.reduce((total, value) => { 
			var price = parseInt(value.innerHTML)
			return total += price;
		}, 0)
}	if (n2.length>0) {
	var prodDiscList = Array.from(n2)
	var totalProdDisc = prodDiscList.reduce((total, value) => { 
		var disc = parseInt(value.textContent)
		return total += disc;
	}, 0)
}
if (n3.length > 0) {

function removeRepetitiveItems(arr) {
  
    const uniqueCategories = new Set();

    for (const item of arr) {
        uniqueCategories.add(item);
    }
    const uniqueArray = Array.from(uniqueCategories);
    return uniqueArray;
}
var a = Array.from(n3)
const uniqueCategoriesArray = removeRepetitiveItems(a);

	var categDiscount = uniqueCategoriesArray.reduce((total,value) => {
		var [category, discount] = value.textContent.split(' ');
		return total+=parseInt(discount);
	}, 0)
	var categDiscountTot = document.getElementById("categoryDiscountTotal")
	categDiscountTot.innerHTML=categDiscount
 
}
  var totalPay = document.getElementById("total")
  var el1=document.getElementById("productDiscountTotal")
	var el = document.getElementById("totalPrice")
  var checkOutPrice = document.getElementById("priceCheckOut")
	if (el&&el1) { 
		el.innerHTML = totalAmount;
		if (totalProdDisc) {
			el1.innerHTML = totalProdDisc;
		}

		var deliveryCharge = document.getElementById("deliveryFee")
		if (totalAmount >= 1500) { 
			deliveryCharge.innerHTML = "Free"
			if (checkOutPrice) {
				checkOutPrice.innerHTML = totalAmount - totalProdDisc - categDiscount;
				if (totalPay) {
					totalPay.value = checkOutPrice.innerHTML	
				}
			}
		}
		else {
			deliveryCharge.innerHTML = "Rs.90"

				if (checkOutPrice) {
					checkOutPrice.innerHTML = totalAmount + 90 - totalProdDisc - categDiscount;
					if (totalPay) {
						totalPay.value = checkOutPrice.innerHTML
					}
			}
		}
		var totalPrdctDiscount = document.getElementById("totalProductDiscount")
		var totalctgryDiscount = document.getElementById("totalCategoryDiscount")
		var grandTotal = document.getElementById("sumTot")
    if (grandTotal) {
			grandTotal.value = checkOutPrice.innerHTML;
			totalPrdctDiscount.value = totalProdDisc;
			totalctgryDiscount.value = categDiscount;
     }
}


function decQty(prodId) {
	var quantity = document.getElementById("qtyNo" + prodId)
	var productPrice = document.getElementById("price" + prodId)
	var productDiscount = document.getElementById("productDiscountTot" + prodId)
	var productIndivDiscount=document.getElementById("productDiscountIndiv" + prodId)
	var totalAmount = document.getElementById("totalPrice")
	var totalProductDiscount=document.getElementById("productDiscountTotal")
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
				productDiscount.innerHTML = (newData.productQuantity) * (parseInt(productIndivDiscount.textContent))
				
				const nl = document.querySelectorAll(".cart-price")
				const n2 = document.querySelectorAll(".productDiscountTot")

				let priceList = Array.from(nl)
				if (nl.length>0) {
					var checkOutPrice = priceList.reduce((total, value) => {
						var price = parseInt(value.innerHTML)
						return total += price;
					}, 0)
				}
				if (n2.length>0) {
					var prodDiscList = Array.from(n2)
					var totalProdDisc = prodDiscList.reduce((total, value) => { 
						var disc = parseInt(value.textContent)
						return total += disc;
					}, 0)
				}
				totalProductDiscount.innerHTML=totalProdDisc
				totalAmount.innerHTML = checkOutPrice
				if (checkOutPrice >= 1500) {
					deliveryFee.innerHTML = "Free"
					checkOutAmount.innerHTML = checkOutPrice-totalProdDisc-categDiscount
				}
				else {
					deliveryFee.innerHTML = "Rs.90"
					checkOutAmount.innerHTML = checkOutPrice + 90-totalProdDisc-categDiscount;
				}	
			})	
	}
	else if(quantity.value==1) {
		Swal.fire({
			icon: 'error',
			title: 'Minimum One Quantity',
			text: 'Please select at least one quantity',
			timer: 4000,
			timerProgressBar: true,
			allowOutsideClick: true,
			allowEscapeKey: false,
			allowEnterKey: false,
			showConfirmButton: false
		});		 
	}	
}
function incQty(prodId) {
	var quantity = document.getElementById("qtyNo" + prodId)
	var productPrice = document.getElementById("price" + prodId)
	var productDiscount = document.getElementById("productDiscountTot" + prodId)
	var productIndivDiscount=document.getElementById("productDiscountIndiv" + prodId)
	var totalAmount = document.getElementById("totalPrice")
	var totalProductDiscount=document.getElementById("productDiscountTotal")
	var checkOutAmount= document.getElementById("priceCheckOut")
	var deliveryFee = document.getElementById("deliveryFee")
	var quantityVal = parseInt(document.getElementById("qtyNo" + prodId).value)
	var stockVal = parseInt(document.getElementById("productStock" + prodId).value)

	 if(quantityVal >= 10) {
		Swal.fire({
			title: 'Product Limit Reached',
			text: "You can only add 10 No's per product",
			timer: 4000,
			timerProgressBar: true,
			allowOutsideClick: true,
			allowEscapeKey: false,
			allowEnterKey: false,
			showConfirmButton: false
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
				var totalProdDisc = 0;
				productPrice.innerHTML = newData.totalPrice
				productDiscount.innerHTML = (newData.productQuantity) * (parseInt(productIndivDiscount.textContent))
					
				const nl = document.querySelectorAll(".cart-price")
				const n2 = document.querySelectorAll(".productDiscountTot")
					
				let priceList = Array.from(nl)
				if (nl.length>0) {
					checkOutPrice = priceList.reduce((total, value) => {
							var price = parseInt(value.innerHTML)
						return total += price;
					}, 0)
				}
				let prodDiscList = Array.from(n2)
				if (n2.length>0) {
					totalProdDisc = prodDiscList.reduce((total, value) => {
							var disc = parseInt(value.textContent)
						return total += disc;
					}, 0)
				}
				  totalProductDiscount.innerHTML=totalProdDisc
				  totalAmount.innerHTML = checkOutPrice
					if (checkOutPrice >= 1500) { 
						deliveryFee.innerHTML = "Free"
						checkOutAmount.innerHTML = checkOutPrice-totalProdDisc-categDiscount
					}
					else {
						deliveryFee.innerHTML = "Rs.90"
						checkOutAmount.innerHTML = checkOutPrice + 90-totalProdDisc-categDiscount;
					}			
			})
			.catch((error) => {
	
				console.log('Error:', error.message);
			});
		 }
		 else {
			Swal.fire({
				title: 'Product Out Of Stock',
				text: 'Cannot add more quantity',
				timer: 3000,
				timerProgressBar: true,
				allowOutsideClick: true,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
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



function cancelOrder(orderId) {
	Swal.fire({
    title: 'Reason For Cancellation',
    input: 'select',
    inputOptions: {
        'I changed my mind': 'I changed my mind',
        'High shipping charges': 'High shipping charges',
        'Long delivery time': 'Long delivery time',
        'Found a better deal': 'Found a better deal'
    },
		inputPlaceholder: 'Choose a reason',
		confirmButtonColor:'#008000',
		showCancelButton: true,
		cancelButtonColor: '#d33',
    inputValidator: function(value) {
        return new Promise(function(resolve, reject) {
            if (value !== '') {
                fetch("/cancel_order", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reason: value,id:orderId })
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                }).then((data) => {
                    window.location.href = "/order_detail?id="+data._id;
                    resolve();
                }).catch((error) => {
                    reject(error); 
                });
            } else {
                reject('Please select a reason'); 
            }
        });
    }
});

}

function removeCart(prodId) {
	Swal.fire({
		title: 'Remove Product',
		text: 'Are you sure you want to remove this product from the cart?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, remove it!',
		cancelButtonText: 'No, keep it'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/remove_cart/"+prodId;
		}
	});
}

function checkStock() {
	fetch("/check_stock", { method: 'GET' })
	.then((response) => {
	
	if (!response.ok) {
		throw new Error('Network response was not ok.');
		}
		return response.json()
	}).then((data) => {
		if (data.find(item => item === false) === false) {
			Swal.fire({
				title: 'Cart Item Out Of Stock',
				text: 'Items you are trying to checkout is currently out of stock.Please review and try again later.',
				timer: 5000,
				timerProgressBar: true,
				allowOutsideClick: true,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
			});
		}
		else if ((data.find(item => item === "unlisted") === "unlisted")||(data.find(item=> item==="deleted")==="deleted")) {
		
			Swal.fire({
				title: 'Cart Item Currently Unavailable',
				text: 'Items you are trying to checkout is currently unavailable.Please review and try again later.',
				timer: 5000,
				timerProgressBar: true,
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
			})
		}
		else {
			window.location.href = "/check_out";
		}
	})
}


function deleteAddress(id) {
	Swal.fire({
		title: 'Delete Address',
		text: 'Are you sure you want to remove this Address',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, remove it!',
		cancelButtonText: 'No, keep it'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/delete_address?id="+id;
		}
	});
}


function removeWishlist(prodId) {
	Swal.fire({
		title: 'Remove Product',
		text: 'Are you sure you want to remove this product from the wishlist?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, remove it!',
		cancelButtonText: 'No, keep it'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/remove_wishlist/"+prodId;
		}
	});
}

function returnProduct(orderId) {
	Swal.fire({
    title: 'Reason For Return',
    input: 'select',
    inputOptions: {
        'Damaged Product': 'Damaged Product',
        'Poor Quality': 'Poor Quality',
        'Wrong Product': 'Wrong Product',
        'I didnt like it': 'I didnt like it'
    },
    inputPlaceholder: 'Choose a reason',
    showCancelButton: true,
    inputValidator: function(value) {
        return new Promise(function(resolve, reject) {
            if (value !== '') {
                fetch("/return_reason", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reason: value,id:orderId }) 
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                }).then((data) => {
                  window.location.href = "/order_detail?id="+data._id;
                    resolve();
                }).catch((error) => {
                    reject(error); 
                });
            } else {
                reject('Please select a reason'); 
            }
        });
    }
});

}


document.addEventListener("DOMContentLoaded", function() {
	const items = document.querySelectorAll('.items');
	if (items.length != 0) {
		const isCurrentRouteSelected = (route) => {
			return window.location.pathname === route;
		};
	
		const selectCurrentRoute = () => {
			items.forEach(item => {
					
				if (item.dataset.route.split(',').some(isCurrentRouteSelected)) {
					item.classList.add('selected');
				} else {
					item.classList.remove('selected');
				}
			});
		};

		selectCurrentRoute();

		items.forEach(item => {
			item.addEventListener('click', function () {
				items.forEach(item => {
					item.classList.remove('selected');
				});
			
				this.classList.add('selected');
			});
		});
	}
});



function fetchInvoiceData(orderId) {
	return fetch('/invoice?orderId='+orderId)
			.then(response => {
					if (!response.ok) {
							throw new Error('Network response was not ok');
					}
					return response.json();
			});
}

function generatePDF(id) {
	fetchInvoiceData(id)
	.then(data => {
			var pdf = new jsPDF({
					orientation: 'p',
					unit: 'mm',
					format: 'a4'
			});

		  var y = 25;	
      pdf.setFont("helvetica", "bold");
      pdf.setFillColor(251, 85, 49); 
      pdf.setTextColor(251, 85, 49); 
      pdf.setFontSize(14);
      pdf.text("EVER", 15, y);
      pdf.setTextColor(0, 0, 0); 
      pdf.text("BO", pdf.getTextWidth("EVER") + 15, y);
		  pdf.setFont("helvetica", "normal");
			pdf.setFontSize(24);
		  pdf.text("Invoice", 95, y, { align: "center" });
		  
			const currentDate = new Date();
			const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
			const formattedDate = currentDate.toLocaleDateString('en-IN', dateOptions);
			
			const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
			const formattedTime = currentDate.toLocaleTimeString('en-IN', timeOptions);
			
			pdf.setFontSize(11);
			pdf.text("Date: " + formattedDate, 160, y);
			pdf.text("Time: " + formattedTime, 160, y +5);
			y += 10;

			let address = [
					data.addressChosen.house_no,
					`${data.addressChosen.street}, ${data.addressChosen.landmark}`,
					`${data.addressChosen.pincode}, ${data.addressChosen.district}, ${data.addressChosen.state}`
			].join('\n');
			pdf.setFontSize(11); 
		  pdf.text("Shipping Address:\n" + address, 15, y + 16);
		
			pdf.setFontSize(11);
		  pdf.text("Customer Name : " + data.userId.name, 126, y + 16);
		
		  pdf.setFontSize(11);
		  pdf.text("Order Id : " + data._id, 126, y + 21);
		
		  pdf.setFontSize(11);
		  pdf.text("Payment : " + data.paymentType, 126, y+26);

			y += 42; 
			pdf.setFillColor(200, 200, 200);
			pdf.rect(20, y, 170, 8, 'F');
			pdf.setTextColor(0, 0, 0);
			pdf.text("Product", 30, y + 5);
			pdf.text("Quantity", 120, y + 5);
			pdf.text("Price", 153, y + 5);
			y += 18;
		var cartTotal = 0;
			data.cartData.forEach(item => {
					pdf.text(item.productId.name, 25, y);
					pdf.text(item.productQuantity.toString(), 125, y);
					pdf.text( "Rs."+item.totalPrice.toFixed(2), 153, y);
				  y += 10;
				 cartTotal+=item.totalPrice
			});

		var shippingCharges=0
		if (data.grandTotalCost === cartTotal) {
			pdf.text("Shipping Charges : ", 110, 115);
			pdf.text("Rs." + 0 ,153,115)
		} else {
			shippingCharges=90
			pdf.text("Shipping Charges : ", 110, 115);
			pdf.text("Rs."+ shippingCharges.toFixed(2),153,115)
		}
		pdf.text("Product Discount : ",110,125)
		pdf.text("Rs." + data.productDiscountTotal, 153, 125)
		
		pdf.text("Category Discount : ",110,135)
		pdf.text("Rs." + data.categoryDiscountTotal,153, 135)
		
		pdf.text("Coupon Discount : ",110,145)
		pdf.text("Rs."+data.couponDiscount,153, 145)
		
		pdf.text("Total : ", 110, 155);
		pdf.text("Rs."+data.grandTotalCost.toFixed(2), 153, 155)
		
			pdf.save('Invoice.pdf');
	
			})
			.catch(error => {
					console.error("Error fetching invoice data:", error);
			});
}


function checkCod() {

	var total = document.getElementById("priceCheckOut")
	var amount = parseInt(total.innerHTML)
	
		if (amount>= 1000) {
			document.getElementById("cod").checked=false
			Swal.fire({
				title: 'COD Not Available',
				text: 'Cash on delivery is only avaliable for orders under 1000.',
				timer: 4000,
				timerProgressBar: true,
				allowOutsideClick: true,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
			});
		} 

}

function checkWalletBalance() {
	fetch("/check_wallet", { method: 'GET' })
	.then((response) => {
	
	if (!response.ok) {
		throw new Error('Network response was not ok.');
		}
		return response.json()
	}).then((data) => {

		var total = document.getElementById("priceCheckOut")
		var amount = parseInt(total.innerHTML)
		
		var balance = data.wallet.walletBalance

		if (amount > balance) {
			document.getElementById("wallet").checked=false
			Swal.fire({
				title: 'Insufficent Balance',
				text: 'Please Check your Wallet.',
				timer: 4000,
				timerProgressBar: true,
				allowOutsideClick: true,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
			});
		} 
	})
}
 
if (document.getElementById('deliverHereButton')){
	document.getElementById('deliverHereButton').addEventListener('click', function() {
		var paymentSection = document.getElementById('paymentBox');
		if (paymentSection) {
				paymentSection.scrollIntoView({ behavior: 'smooth' });
		}
	});
}


function couponCheck() {

	var totalAmount = document.getElementById('sumTot') //input
	var couponCode = document.getElementById('couponCode') //input
  var code=couponCode.value.trim()
const data=JSON.stringify({coupon:code})
  fetch('/coupon_check', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			 Accept:"application/json"
		},
	body: data
	}).then((response) => {
	   return	response.json()
  })
		.then((couponData) => {
			if (couponData.Status === "Valid") {
				if (new Date(couponData.data.startDate) < new Date(Date.now()) && new Date(couponData.data.expiryDate) > new Date(Date.now())) {
					if (totalAmount.value < couponData.data.minimumPurchase) {
						Swal.fire({
							title: 'Coupon cant be applied',
							text: `The purchase amount should be more than ${couponData.data.minimumPurchase}`,
							timer: 3000,
							timerProgressBar: true,
							allowOutsideClick: true,
							allowEscapeKey: false,
							allowEnterKey: false,
							showConfirmButton: false
						});
					}
					else {
						var total = Math.floor((totalPay.value) * (couponData.data.discountPercentage / 100))
						if (total <= couponData.data.maximumDiscount) {
							var discountData = document.getElementById("couponDiscount")
							discountData.value = total;
							document.getElementById("couponDiscountTotal").innerHTML = total;
							grandTotal.value = totalPay.value - total;
							checkOutPrice.innerHTML = totalPay.value - total;
							document.getElementById("apply-btn").classList.add("hidden")
							document.getElementById("remove-btn").classList.remove("hidden")

							Swal.fire({
								title: 'Coupon Applied Successfully',
								text: `You have received a discount of Rs.${total} . Enjoy your savings!`,
								timer: 3000,
								timerProgressBar: true,
								allowOutsideClick: true,
								allowEscapeKey: false,
								allowEnterKey: true,
								showConfirmButton: false
							});
						}
						else {
							var discountData = document.getElementById("couponDiscount")
							discountData.value = couponData.data.maximumDiscount;
							document.getElementById("couponDiscountTotal").innerHTML = couponData.data.maximumDiscount;
							grandTotal.value = totalPay.value - couponData.data.maximumDiscount;
							checkOutPrice.innerHTML = totalPay.value - couponData.data.maximumDiscount;
							document.getElementById("apply-btn").classList.add("hidden")
							document.getElementById("remove-btn").classList.remove("hidden")

							Swal.fire({
								title: 'Coupon Applied Successfully',
								text: `You have received a discount of Rs.${couponData.data.maximumDiscount} . Enjoy your savings!`,
								timer: 3000,
								timerProgressBar: true,
								allowOutsideClick: true,
								allowEscapeKey: false,
								allowEnterKey: true,
								showConfirmButton: false
							});

						}
					}
				}
				else {
					Swal.fire({
						title: 'Coupon cant be applied',
						text: 'The couponcode entered is either expired or not applicable now',
						timer: 3000,
						timerProgressBar: true,
						allowOutsideClick: true,
						allowEscapeKey: false,
						allowEnterKey: false,
						showConfirmButton: false
					});
				}
			}
			else {
				Swal.fire({
					title: 'Invalid Coupon Code',
					text: 'The coupon code you have entered is invalid',
					timer: 3000,
					timerProgressBar: true,
					allowOutsideClick: true,
					allowEscapeKey: false,
					allowEnterKey: false,
					showConfirmButton: false
				});
			}
		}); 

}
	
function couponRemove() {
	document.getElementById("couponDiscountTotal").innerHTML = 0
	checkOutPrice.innerHTML = totalPay.value
	grandTotal.value = totalPay.value
	document.getElementById("couponDiscount").value = 0
	document.getElementById("apply-btn").classList.remove("hidden")
	document.getElementById("remove-btn").classList.add("hidden")

	Swal.fire({
		title: 'Coupon Removed Successfully',
		text: 'Your checkout is now ready to roll',
		timer: 3000,
		timerProgressBar: true,
		allowOutsideClick: true,
		allowEscapeKey: false,
		allowEnterKey: true,
		showConfirmButton: false
	});
  
}
  


const orderConfirm = document.getElementById("orderConfirm")

if (orderConfirm) {
	orderConfirm.addEventListener('submit', confirmOrder);
}
function confirmOrder(e) {
	e.preventDefault();
  
	fetch("/check_stock", { method: 'GET' })
	.then((response) => {
	
	if (!response.ok) {
		throw new Error('Network response was not ok.');
		}
		return response.json()
	}).then((data) => {
		if (data.find(item => item === false) === false) {
			Swal.fire({
				title: 'Cart Item Out Of Stock',
				text: 'Items you are trying to checkout is currently out of stock.Please review and try again later.',
				timer: 5000,
				timerProgressBar: true,
				allowOutsideClick: true,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
			});
		} else if ((data.find(item=> item==="unlisted")==="unlisted")||(data.find(item=> item==="deleted")==="deleted")) {
		
			Swal.fire({
				title: 'Cart Item Currently Unavailable',
				text: 'Items you are trying to checkout is currently unavailable.Please review and try again later.',
				timer: 5000,
				timerProgressBar: true,
				allowOutsideClick: true,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false
			})
		}
		else {
		 	
	var couponCode = document.getElementById('couponCode') //input
	var code = couponCode.value.trim()
  var discountData = document.getElementById("couponDiscount").value

	if (parseInt(discountData) !== 0) {
	
	const data = JSON.stringify({ coupon: code })

  fetch('/coupon_check', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			 Accept:"application/json"
		},
	body: data
	}).then((response) => {
	   return	response.json()
  })
		.then((couponData) => {

		if (new Date(couponData.data.startDate) < new Date(Date.now()) && new Date(couponData.data.expiryDate) > new Date(Date.now())) {
				
			const formData = new FormData(orderConfirm);
			const plainFormData = Object.fromEntries(formData.entries());
			const formDataJsonString = JSON.stringify(plainFormData);
		
			fetch('/confirm_order', {
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
					if (data.payment === "COD") {
						window.location.href="/confirm_order"
					}
					else if (data.payment === "Wallet") {
						window.location.href="/confirm_order"
					}else{
						
						var options = { 
							"key": "rzp_test_bePMUEE1PKoNJ7",  
							"amount": data.amount,  
							"currency": "INR",  
							"order_id":data.id,
							"handler": function (response){ 
									
								fetch('/razorpay_status', {
									method: 'POST',
									headers: {
										"Content-Type": "application/json",
										 Accept:"application/json"
									},
								body: JSON.stringify({status:"Complete"})
								}).then((response) => {
									 return	response.json()
								})
									.then((data) => {
										window.location.href="/confirm_order"
								}); 
		
							}, 
							"theme": { 
									"color": "#FB5531" 
							} 
						}; 
						var razorpayObject = new Razorpay(options); 
						razorpayObject.on('payment.failed', function (response){ 
		
		
							fetch('/razorpay_status', {
								method: 'POST',
								headers: {
									"Content-Type": "application/json",
									 Accept:"application/json"
								},
							body: JSON.stringify({status:"Failed"})
							}).then((response) => {
								 return	response.json()
							})
								.then((data) => {
									window.location.href="/order"
							}); 
							
						}); 
						
						Swal.fire({
							title: 'Proceed to payment',
							icon: 'warning',
							showCancelButton: false,
							showConfirmButton: true,
							allowOutsideClick: false,
							confirmButtonColor: '#008000',
							confirmButtonText: 'Pay Now'
						}).then((result) => {
							if (result.isConfirmed) {
								razorpayObject.open(); 
								
							}
						});
					}
				}); 
				}
				else {
					Swal.fire({
						title: 'Coupon cant be applied',
						text: 'The couponcode entered is either expired or not applicable now',
						timer: 3000,
						timerProgressBar: true,
						allowOutsideClick: true,
						allowEscapeKey: false,
						allowEnterKey: false,
						showConfirmButton: false
					});
				}
		}); 
			

	}
	else {
		
		const formData = new FormData(orderConfirm);
			const plainFormData = Object.fromEntries(formData.entries());
			const formDataJsonString = JSON.stringify(plainFormData);
		
			fetch('/confirm_order', {
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
					if (data.payment === "COD") {
						window.location.href="/confirm_order"
					}
					else if (data.payment === "Wallet") {
						window.location.href="/confirm_order"
					}else{
						
						var options = { 
							"key": "rzp_test_bePMUEE1PKoNJ7",  
							"amount": data.amount,  
							"currency": "INR",  
							"order_id":data.id,
							"handler": function (response){ 
									
								fetch('/razorpay_status', {
									method: 'POST',
									headers: {
										"Content-Type": "application/json",
										 Accept:"application/json"
									},
								body: JSON.stringify({status:"Complete"})
								}).then((response) => {
									 return	response.json()
								})
									.then((data) => {
										window.location.href="/confirm_order"
								}); 
		
							}, 
							"theme": { 
									"color": "#FB5531" 
							} 
						}; 
						var razorpayObject = new Razorpay(options); 
						razorpayObject.on('payment.failed', function (response){ 
		
		
							fetch('/razorpay_status', {
								method: 'POST',
								headers: {
									"Content-Type": "application/json",
									 Accept:"application/json"
								},
							body: JSON.stringify({status:"Failed"})
							}).then((response) => {
								 return	response.json()
							})
								.then((data) => {
									window.location.href="/order"
							}); 
							
						}); 
						
						Swal.fire({
							title: 'Proceed to payment',
							icon: 'warning',
							showCancelButton: false,
							allowOutsideClick: false,
							confirmButtonColor: '#008000',
							confirmButtonText: 'Pay Now',
						}).then((result) => {
							if (result.isConfirmed) {
								razorpayObject.open(); 
								
							}
						});
					}
				}); 

			}

		}//end

	})
	
	
}


const reOrder = document.getElementById("reOrder")

if (reOrder) {
	reOrder.addEventListener('submit', orderNew);
}
function orderNew(e) {
	e.preventDefault();
	const formData = new FormData(reOrder);
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

  fetch('/confirm_order', {
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

				var options = { 
					"key": "rzp_test_bePMUEE1PKoNJ7",  
					"amount": data.amount,  
					"currency": "INR",  
					"order_id":data.id,
					"handler": function (response){ 
							
						fetch('/razorpay_status', {
							method: 'POST',
							headers: {
								"Content-Type": "application/json",
								 Accept:"application/json"
							},
						body: JSON.stringify({status:"Complete",attempt:"rePay"})
						}).then((response) => {
							 return	response.json()
						})
							.then((data) => {
								window.location.href="/confirm_order"
						}); 

					}, 
					"theme": { 
							"color": "#FB5531" 
					} 
				}; 
				var razorpayObject = new Razorpay(options); 
				razorpayObject.on('payment.failed', function (response){ 


					fetch('/razorpay_status', {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							 Accept:"application/json"
						},
					body: JSON.stringify({status:"Failed",attempt:"rePay"})
					}).then((response) => {
						 return	response.json()
					}).then((data) => {
							window.location.href="/order"
					}); 
					
				}); 
				
				Swal.fire({
					title: 'Proceed to payment',
					text: 'Are you sure you want to proceed to payment',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#008000',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					cancelButtonText: 'No'
				}).then((result) => {
					if (result.isConfirmed) {
						razorpayObject.open(); 
						
					}
				});
	}); 
}


document.addEventListener("DOMContentLoaded", function () {
	const div=document.getElementById("paginationDiv")
  const divs = document.querySelectorAll('.page-no-div');
  const urlParams = new URLSearchParams(window.location.search);
  let selectedPage = urlParams.get('page');
	if (div) {
		if (!selectedPage) {
			selectedPage = divs[0].dataset.page;
		}

		const selectCurrentPage = () => {
			divs.forEach(div => {
				const page = div.dataset.page;
				if (page === selectedPage) {
					div.classList.add('selected');
				} else {
					div.classList.remove('selected');
				}
			});
		};

		selectCurrentPage();

		divs.forEach(div => {
			div.addEventListener('click', function () {
				divs.forEach(div => {
					div.classList.remove('selected');
				});
				this.classList.add('selected');
			});
		});
	}
});


document.addEventListener('DOMContentLoaded', function () {
  const createOfferButton = document.getElementById("referralCreate");

  if (createOfferButton) {
    createOfferButton.addEventListener('click', createReferralOffer);
  }

  function createReferralOffer() {
    fetch("/referral_create", { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        if (data.referral.referral_code) {
          const referralCodeInput = document.createElement('input');
          referralCodeInput.type = 'text';
          referralCodeInput.className = 'form-control';
          referralCodeInput.id = 'referralCode';
          referralCodeInput.name = 'name';
          referralCodeInput.placeholder = 'Referral Code';
          referralCodeInput.value = data.referral.referral_code;

          const inputDiv = document.createElement('div');
          inputDiv.className = 'col-md-6 mt-3';
          inputDiv.appendChild(referralCodeInput);

          const rowDiv = document.createElement('div');
          rowDiv.className = 'row mt-2 mx-2 d-flex justify-content-center';
          rowDiv.appendChild(inputDiv);

          const buttonDiv = document.createElement('div');
          buttonDiv.className = 'mt-4 mb-3 text-center';

          const referButton = document.createElement('button');
          referButton.className = 'btn profile-button btn-sm';
          referButton.id = 'referFriends';
          referButton.type = 'button';
          referButton.textContent = 'Refer Friends';
          buttonDiv.appendChild(referButton);

          const referralDiv = document.createElement('div');
          referralDiv.className = 'hidden';
          referralDiv.id = 'referral-div';

          const hr = document.createElement('hr');
          const referralText = document.createElement('h4');
          referralText.className = 'text-center pt-4';
          referralText.textContent = 'When they earn you earn too !';

          const referralP = document.createElement('p');
          referralP.className = 'text-center pt-2';
          referralP.textContent = 'Wanna Send referral code via Gmail ?';

          const form = document.createElement('form');
          form.id = 'referralForm';

          const formRow = document.createElement('div');
          formRow.className = 'row mt-3 mx-2 d-flex justify-content-center';

          const formCol = document.createElement('div');
          formCol.className = 'col-md-6 mt-3';

          const emailInput = document.createElement('input');
          emailInput.type = 'text';
          emailInput.className = 'form-control';
          emailInput.id = 'referralMail';
          emailInput.name = 'email';
          emailInput.placeholder = 'Enter Email to Refer';
          emailInput.setAttribute('oninput', "clear_error('email-error')");

          formCol.appendChild(emailInput);

          const emailButtonDiv = document.createElement('div');
          emailButtonDiv.className = 'text-center align-self-end mx-0';

          const emailButton = document.createElement('button');
          emailButton.className = 'btn btn-dark';
          emailButton.id = 'inviteFriends';
          emailButton.type = 'submit';
          emailButton.textContent = 'Invite';

          emailButtonDiv.appendChild(emailButton);

          formRow.appendChild(formCol);
          formRow.appendChild(emailButtonDiv);

          form.appendChild(formRow);

          const formErrorRow = document.createElement('div');
          formErrorRow.className = 'row d-flex mb-2 mb-5 justify-content-center';

          const formErrorSpan = document.createElement('span');
          formErrorSpan.id = 'email-error';
          formErrorSpan.className = 'error-msg';

          formErrorRow.appendChild(formErrorSpan);

          form.appendChild(formErrorRow);

          referralDiv.appendChild(hr);
          referralDiv.appendChild(referralText);
          referralDiv.appendChild(referralP);
          referralDiv.appendChild(form);

          const createOfferDiv = createOfferButton.parentElement;

          createOfferDiv.replaceWith(rowDiv);
          rowDiv.insertAdjacentElement('afterend', buttonDiv);
          buttonDiv.insertAdjacentElement('afterend', referralDiv);

          // Attach event listener to the dynamically created refer button
          referButton.addEventListener('click', function() {
            referralDiv.classList.remove('hidden');
          });

          // Attach event listener to the dynamically created form
          attachSubmitEventListener(form);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});

function attachSubmitEventListener(form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const input = document.getElementById("referralMail").value.trim();
    const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let flag = 1;

    if (input === "" || input == null) {
      document.getElementById("email-error").innerHTML = "&#x1F6C8; Email is a required field";
      flag = 0;
    } else if (input.match(validRegex) === null) {
      document.getElementById("email-error").innerHTML = "&#x1F6C8; Invalid email address";
      flag = 0;
    }

    if (flag !== 0) {
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);

      fetch("/invite_friends", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: formDataJsonString
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Invitation Sent",
            text: `Email has been sent to ${data}`,
            icon: "success"
          }).then(() => {
            document.getElementById("referralMail").value = "";
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });
}



var referr = document.getElementById("referFriends")
if (referr) {
	document.addEventListener('click',expandReferralDiv)
}
function expandReferralDiv() {
	document.getElementById("referral-div").classList.remove("hidden")
}

	const referrOfferForm = document.getElementById("referralForm");

	if (referrOfferForm) {
		referrOfferForm.addEventListener('submit', referFriend);
	}
	function referFriend(e) {
		
		e.preventDefault()
		var input = document.getElementById("referralMail").value.trim()
		var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
		var flag = 1;
		  
		if (input == null || input == "") {
			document.getElementById("email-error").innerHTML = "&#x1F6C8; Email is a required field"
			flag = 0;
		} else if(input.match(validRegex)==null) {
			document.getElementById("email-error").innerHTML = "&#x1F6C8; Invalid email address"
			flag = 0;
		}
     
	const formData = new FormData(referrOfferForm);
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);


		if (flag != 0) {
			fetch("/invite_friends",
				{
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						 Accept:"application/json"
					},
				body: formDataJsonString
				}
			).then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok.');
					}
					return response.json();
			}).then((data) =>{
			    
				if (data) {
					Swal.fire({
						title: "Invitation Sent",
						text: `Email has been sent to ${data}`,
						icon: "success"
					}).then(() => {
						document.getElementById("referralMail").value=""
					})
					}
				})
		}

	}

	
	
var referralShow = document.getElementById("referralClick")
if (referralShow) {
	referralShow.addEventListener('click',showReferralOption)
}
function showReferralOption() {

	document.getElementById("referralCodeDisplay").classList.remove("hidden")
}


function referralCheck() {

	var referralCode = document.getElementById('codeReferral') //input
  var code=referralCode.value.trim()
	const data = JSON.stringify({ codeReferral: code })
	
  fetch('/referral_check', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			 Accept:"application/json"
		},
	body: data
	}).then((response) => {
	   return	response.json()
  })
		.then((referralData) => {
			if (referralData.Status === "Valid") {
					Swal.fire({
						title: 'Referral offer successfully applied',
						text: 'The reward will be reflected in your wallet after completing payment',
						timer: 3000,
						timerProgressBar: true,
						allowOutsideClick: true,
						allowEscapeKey: false,
						allowEnterKey: false,
						showConfirmButton: false
					});
				   document.getElementById('referralDiscount').value=referralData.data.referral.referral_code
					document.getElementById("referralApply").classList.add("hidden")
					document.getElementById("referralRemove").classList.remove("hidden")
			}
			else if(referralData.Status==="Applied") {
				Swal.fire({
					title: 'Offer claimed already',
					text: 'This offer is already claimed,This code no longer works for future orders ',
					timer: 3000,
					timerProgressBar: true,
					allowOutsideClick: true,
					allowEscapeKey: false,
					allowEnterKey: false,
					showConfirmButton: false
				});
			}
			else {
				Swal.fire({
					title: 'Invalid Referral Code',
					text: 'The referral code you have entered is invalid',
					timer: 3000,
					timerProgressBar: true,
					allowOutsideClick: true,
					allowEscapeKey: false,
					allowEnterKey: false,
					showConfirmButton: false
				});
			}
		}); 

}
	
function referralRemove() {
	document.getElementById('referralDiscount').value = ""
	document.getElementById('codeReferral').value=""
	document.getElementById("referralApply").classList.remove("hidden")
	document.getElementById("referralRemove").classList.add("hidden")
}

	
//-----JS for Price Range slider-----

let minPrice;
let maxPrice
$(function() {
	$( "#slider-range" ).slider({
			range: true,
			min: 200,
			max: 3500,
			values: [ 200, 3500 ],
			slide: function( event, ui ) {
					$( "#amount" ).val( "Rs." + ui.values[ 0 ] + " - Rs." + ui.values[ 1 ] );
			}
	});
	$( "#amount" ).val( "Rs." + $( "#slider-range" ).slider( "values", 0 ) +
			" - Rs." + $( "#slider-range" ).slider( "values", 1 ) );

	// Add event listener to filter button
	$('.filter_button').on('click', function() {
			 minPrice = $( "#slider-range" ).slider( "values", 0 );
		   maxPrice = $("#slider-range").slider("values", 1);
		
		filterPrice(minPrice,maxPrice)

	});
});




// Function to parse URL and update page based on query parameters
function handleURLChange() {
  const storedData = sessionStorage.getItem('pageState');
  const updatedState = storedData ? JSON.parse(storedData) : {};

  // If sessionStorage data is not available, parse URL parameters
	if (!storedData) {
		const urlParams = new URLSearchParams(window.location.search);

		// Category
		const category = urlParams.get('category');
		if (category) {
			updatedState.category = category;
		}

		// Sorting
		const sortBy = urlParams.get('sortBy');
		if (sortBy) {
			updatedState.sortBy = sortBy;
		}

		// Price range
		const priceRange = urlParams.get('priceRange');
		if (priceRange) {
			updatedState.priceRange = priceRange;
		}

		// Page
		const page = parseInt(urlParams.get('page')) || 1;
		if (page) {
			updatedState.page = page;
		}

		// Search term
		const searchTerm = urlParams.get('searchTerm');
		if (searchTerm) {
			updatedState.searchTerm = searchTerm;
		}

		//price min
		const priceMin = urlParams.get('priceMin')
		if (priceMin) {
			updatedState.priceMin = priceMin
		}

		//price max
		const priceMax = urlParams.get('priceMax')
		if (priceMax) {
			updatedState.priceMax = priceMax
		}
		
	}
  // Update state and page
  updateState(updatedState);
}

// Function to update sessionStorage with page state
function updateSessionStorage(key, value) {
  const storedData = sessionStorage.getItem('pageState');
  const currentState = storedData ? JSON.parse(storedData) : {};
  currentState[key] = value;
  sessionStorage.setItem('pageState', JSON.stringify(currentState));
}

// Function to update the page UI
function updateState(newState) {

	if (newState.category) {

		var categList = document.querySelectorAll(".mme-2")
		var categ = Array.from(categList)

		categ.map((each) => {

			if (each.value == newState.category) {
				each.checked = true;
			}
		})
	}

	if (newState.searchTerm) {
	var searchBar = document.getElementById('seachInput')
		if (searchBar) {
			searchBar.value = newState.searchTerm;
			}
	}
	if (newState.sortBy) {
		var sortSpan = document.getElementById('sortSpan')
		if (sortSpan) {
			sortSpan.innerHTML = newState.sortBy;

			}

	}
	if (newState.minPrice && newState.maxPrice) {
		$(function () {
			const newMinPrice = newState.minPrice;
			const newMaxPrice = newState.maxPrice;

			// Initialize the slider with dynamic values
			$("#slider-range").slider({
				range: true,
				min: 200,
				max: 3500,
				values: [newMinPrice, newMaxPrice],
				slide: function (event, ui) {
					$("#amount").val("Rs." + ui.values[0] + " - Rs." + ui.values[1]);
				}
			});

			// Set the initial amount
			$("#amount").val("Rs." + $("#slider-range").slider("values", 0) +
				" - Rs." + $("#slider-range").slider("values", 1));

		})
  }
}
// Function to handle search button click
const searchForm = document.getElementById("searchForm");
if (searchForm) {
	searchForm.addEventListener('submit', (e) => {
		e.preventDefault()

    const searchInput = document.querySelector('.search-bar');
    const searchTerm = searchInput.value;

    // Update sessionStorage with the latest search term
    updateSessionStorage('searchTerm', searchTerm);


    // Update URL with search term and other parameters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);

    window.location.search = urlParams.toString();
  });
}

//Function to handle category
function onlyOne(checkbox) {

	var checkboxes = document.getElementsByName('check')
	var categoryName = checkbox.value;

	var data = sessionStorage.getItem('pageState')
	var dataStored = JSON.parse(data)

	// Update URL with search term
	const urlParams = new URLSearchParams(window.location.search);

		if (categoryName==dataStored?.category){

			checkboxes.forEach((item) => {
				if (item) item.checked = false
			})
			delete dataStored.category

			sessionStorage.setItem('pageState', JSON.stringify(dataStored));

			urlParams.delete('category')
			
			window.location.search = urlParams.toString();
			
	}
	 else{
		
		checkboxes.forEach((item) => {
			if (item !== checkbox) item.checked = false
	})
     
	
    // Update sessionStorage with the latest category name
    updateSessionStorage('category', categoryName);


		urlParams.set('category', categoryName);
	
    window.location.search = urlParams.toString();
	}
	
}

function sortProducts(sort) {

	var sortBy = sort.innerHTML;
  
    // Update sessionStorage with the sort name
    updateSessionStorage('sortBy', sortBy);

		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set('sortBy', sortBy);

		window.location.search = urlParams.toString();

}

function pageSelect(page) {

	var page = page.innerHTML;

   // Update sessionStorage with the page no
	 updateSessionStorage('page', page);
	
		 // Update URL with page no
		 const urlParams = new URLSearchParams(window.location.search);
	   urlParams.set('page', page);


		 window.location.search = urlParams.toString();

}

function filterPrice(minPrice,maxPrice) {

	var minPrice = minPrice;
	var maxPrice = maxPrice;
  
	// Update sessionStorage with the price range
	updateSessionStorage('minPrice', minPrice);
	updateSessionStorage('maxPrice', maxPrice);

	 // Update URL with price range
	 const urlParams = new URLSearchParams(window.location.search);
	 urlParams.set('minPrice', minPrice);
   urlParams.set('maxPrice', maxPrice);
 

	 window.location.search = urlParams.toString();

}


// Initialize page based on URL
handleURLChange();


//clear all filters function
var clearFilters = document.getElementById("clearFilters")

if (clearFilters) {

	clearFilters.addEventListener("click", clearAllFilters)
	
	function clearAllFilters() {

		const storedData = sessionStorage.getItem('pageState');

		if (storedData) {
			sessionStorage.removeItem('pageState');
         
			window.location.href='/shop'
		}
		
	}

}
