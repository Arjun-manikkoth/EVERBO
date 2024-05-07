//prevent resubmission
if ( window.history.replaceState ) {
	window.history.replaceState(null, null, window.location.href);
}

	 
function clearError(id) { 
	if (document.getElementById(id)) {
		document.getElementById(id).innerHTML = ""; 
	 }
}

function validateLogin() {
	var flag = 1;
	var emailSpan = document.getElementById("email-error-login")
	var passwordSpan = document.getElementById("password-error-login")
	var emailLogin = document.getElementById("email-login").value.trim()
	var passwordLogin = document.getElementById("password-login").value.trim()
  
	var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
	
	if (emailLogin == "" || emailLogin == null) {
		emailSpan.innerHTML = "&#x1F6C8; Email is a required field"
		document.getElementById("email-login").focus();
		flag = 0;
	}
	else if (emailLogin.match(validRegex)) {
		emailSpan.innerHTML = "";
	}
	else {
		emailSpan.innerHTML = "&#x1F6C8; Invalid email format"
		document.getElementById("email-login").focus();
		flag = 0;
	}
	if (passwordLogin == "" || passwordLogin == null) {
		passwordSpan.innerHTML = "&#x1F6C8; Password is a required field"
		document.getElementById("password-login").focus();
		flag = 0;
	}
	else { 
		passwordSpan.innerHTML = "";
	}
	if (flag == 0)
		return false
	else
		return true
}

function validateCategory() { 
		var flag = 1;
		var categorySpan = document.getElementById("category-error")
		var descriptionSpan = document.getElementById("description-error")
	  var imageSpan = document.getElementById("image-error")
	  var discountSpan=document.getElementById("discount-error")
  	var category = document.getElementById("categoryName").value.trim()
		var description = document.getElementById("description").value.trim()
		var discount = document.getElementById("discount").value.trim()
	  var image = document.getElementById("image")
	
		if (category == "" || category == null) {
			categorySpan.innerHTML = "&#x1F6C8; Category is a required field"
			document.getElementById("categoryName").focus();
			flag = 0;
		} else {
			categorySpan.innerHTML = ""
		}
	
	if (description == "" || description == null) {
		descriptionSpan.innerHTML = "&#x1F6C8; Description is a required field"
		document.getElementById("description").focus();
		flag = 0;
	}
	else {
		descriptionSpan.innerHTML = ""
	}
	if (discount == "" || discount == null) {
		discountSpan.innerHTML = "&#x1F6C8; Discount is a required field"
		flag = 0;
	} else if (isNaN(discount)||discount<0) {
		discountSpan.innerHTML = "&#x1F6C8; Discount should be a number"
		flag = 0;
	}
	else {
		discountSpan.innerHTML = ""
}
		if (image.value == "" || image.value == null) {
			imageSpan.innerHTML = "&#x1F6C8; Image not uploaded"
			document.getElementById("image").focus();
			flag = 0;
		}
		else { 
				var allowedExtensions = ["jpg", "jpeg", "png"];
			for (var i = 0; i < image.files.length; i++) {
				var file = image.files[i];
					var extension = file.name.split('.').pop().toLowerCase();
					if (allowedExtensions.indexOf(extension) === -1) {
							imageSpan.innerHTML = "&#x1F6C8; Invalid file format";
							flag = 0;
							break;
					} else {
						if (image.files[i].size > 204800) {
							imageSpan.innerHTML = "&#x1F6C8; Image size should be within 200kb";
							flag = 0;
							break;
						} else {
							imageSpan.innerHTML = "";
						}		
					}
			}		
	}	
  if(flag==0)
		return false
	else
		return true
}

function validateEditCategory() { 
	var flag = 1;
	var categorySpan = document.getElementById("category-error")
	var descriptionSpan = document.getElementById("description-error")
	var imageSpan=document.getElementById("image-error")
	var category = document.getElementById("categoryName").value.trim()
	var description = document.getElementById("description").value.trim()
	var image = document.getElementById("image")

	if (category == "" || category == null) {
		categorySpan.innerHTML = "&#x1F6C8; Category is a required field"
		flag = 0;
	} else {
		categorySpan.innerHTML = ""
	}
if (description == "" || description == null) {
	descriptionSpan.innerHTML = "&#x1F6C8; Description is a required field"
	flag = 0;
}
else {
	descriptionSpan.innerHTML = ""
	}
	
	if (image.value == "" || image.value == null) {
		imageSpan.innerHTML = "&#x1F6C8; Image not uploaded"
		document.getElementById("image").focus();
		flag = 0;
	}
	else { 
			var allowedExtensions = ["jpg", "jpeg", "png"];
		for (var i = 0; i < image.files.length; i++) {
				var file = image.files[i];
				var extension = file.name.split('.').pop().toLowerCase();
				if (allowedExtensions.indexOf(extension) === -1) {
						imageSpan.innerHTML = "&#x1F6C8; Invalid file format";
						flag = 0;
						break;
				} else {
					if (image.files[i].size > 204800) {
						imageSpan.innerHTML = "&#x1F6C8; Image size should be within 200kb";
						flag = 0;
						break;
					} else {
						imageSpan.innerHTML = "";
					}	
				}
		}		
}	
	
	if (flag == 0)
			return false
	else
		return true
}

function validateProduct() { 
	   var flag = 1;
	   var productSpan = document.getElementById("product-error")
		 var descriptionSpan = document.getElementById("description-error")
	   var imageSpan = document.getElementById("image-error")
	   var priceSpan = document.getElementById("price-error")
	   var quantitySpan = document.getElementById("quantity-error")	
	   var discountSpan=document.getElementById("discount-error")	
		 var description = document.getElementById("description").value.trim()
	   var image = document.getElementById("image")
	   var product = document.getElementById("productName").value.trim()
		 var price = document.getElementById("price").value.trim()
	   var quantity = document.getElementById("quantity").value.trim()
	   var discount = document.getElementById("discount").value.trim()
	   var limit = Math.floor(price * 10) / 100
	
		 if (product == "" || product == null) {
			productSpan.innerHTML = "&#x1F6C8; Product is a required field"
			flag = 0;
		} else {
			productSpan.innerHTML = ""
	  }

	 if (description == "" || description == null) {
		 descriptionSpan.innerHTML = "&#x1F6C8; Description is a required field"
		 flag = 0;
	 }
	 else {
		 descriptionSpan.innerHTML = ""
	}

		 if (image.value == "" || image.value == null) {
			 imageSpan.innerHTML = "&#x1F6C8; Image not uploaded"
			 flag = 0;
		 }
		 else if (image.files.length < 3) {
			imageSpan.innerHTML = "&#x1F6C8;You need to add 3 images "
			 flag=0
		 }
		 else if (image.files.length > 3) {
			 imageSpan.innerHTML = "&#x1F6C8;You can only add 3 images "
			 flag=0
		 }
		 else { 
			var allowedExtensions = ["jpg", "jpeg", "png"];
    for (var i = 0; i < image.files.length; i++) {
        var file = image.files[i];
        var extension = file.name.split('.').pop().toLowerCase();
        if (allowedExtensions.indexOf(extension) === -1) {
            imageSpan.innerHTML = "&#x1F6C8; Invalid file format";
            flag = 0;
            break;
        } else {
					if (image.files[i].size > 204800) {
						imageSpan.innerHTML = "&#x1F6C8; Image size should be within 200kb";
						flag = 0;
						break;
					} else {
						imageSpan.innerHTML = "";
					}	
        }
    }
	}
	
     
	  if (price == "" || price == null) {
			priceSpan.innerHTML = "&#x1F6C8; Price is a required field"
			flag = 0;
		}
		else if(isNaN(price)) {
			priceSpan.innerHTML = "&#x1F6C8; Price should be a number"
			flag = 0;
		}
		else if(price<=0) {
			priceSpan.innerHTML = "&#x1F6C8; Price should be greater than 0"
			flag = 0;
  	}
	  else {
		 priceSpan.innerHTML = ""
	  }
		
		if (discount == "" || discount == null) {
			discountSpan.innerHTML = "&#x1F6C8; Discount is a required field"
			flag = 0;
		} else if (isNaN(discount)||discount<0) {
			discountSpan.innerHTML = "&#x1F6C8; Discount should be a number"
			flag = 0;
		}
		else if (discount>limit) {
			discountSpan.innerHTML = "&#x1F6C8; Discount limit is max 10%"
			flag = 0;
		}
		else {
			discountSpan.innerHTML = ""
	}
	
	  if (quantity == "" || quantity == null) {
			quantitySpan.innerHTML = "&#x1F6C8; Quantity is a required field"
			
			flag = 0;
		}
		else if(isNaN(quantity)) {
			quantitySpan.innerHTML = "&#x1F6C8; Quantity should be a number"
			flag = 0;
		}
		else if(quantity<0) {
			quantitySpan.innerHTML = "&#x1F6C8; Quantity should be greater than 0"
			flag = 0;
  	}
		else {
		  quantitySpan.innerHTML = ""
		} 	
	if (flag == 0) 
		return false 	 
	else
		return true		 
 }


 function validateEditProduct() { 
	var flag = 1;
	var productSpan = document.getElementById("product-error")
	var descriptionSpan = document.getElementById("description-error")
	var priceSpan = document.getElementById("price-error")
	var quantitySpan = document.getElementById("quantity-error")
	var discountSpan=document.getElementById("discount-error")	  
	var description = document.getElementById("description").value.trim()
	var product = document.getElementById("productName").value.trim()
	var price = document.getElementById("price").value.trim()
	var quantity = document.getElementById("quantity").value.trim()
  var discount = document.getElementById("discount").value.trim()
	if (product == "" || product == null) {
		productSpan.innerHTML = "&#x1F6C8; Product is a required field"
	 flag = 0;
 } else {
	 productSpan.innerHTML = ""
 }

if (description == "" || description == null) {
	descriptionSpan.innerHTML = "&#x1F6C8; Description is a required field"
	flag = 0;
}
else {
	descriptionSpan.innerHTML = ""
	 }	 
	 
	 
 if (price == "" || price == null) {
	 priceSpan.innerHTML = "&#x1F6C8; Price is a required field"
	 flag = 0;
 }
 else if(isNaN(price)) {
	 priceSpan.innerHTML = "&#x1F6C8; Price should be a number"
	 flag = 0;
 }
 else if(price<=0) {
	priceSpan.innerHTML = "&#x1F6C8; Price should be greater than 0"
	flag = 0;
}
 else {
	priceSpan.innerHTML = ""
	 }
	 
 if (discount == "" || discount == null) {
	discountSpan.innerHTML = "&#x1F6C8; Discount is a required field"
	flag = 0;
} else if (isNaN(discount)||discount<0) {
	discountSpan.innerHTML = "&#x1F6C8; Discount should be a number"
	flag = 0;
}
else if (discount>limit) {
	discountSpan.innerHTML = "&#x1F6C8; Discount limit is max 10%"
	flag = 0;
}
else {
	discountSpan.innerHTML = ""
	 }
	 
 if (quantity == "" || quantity == null) {
	 quantitySpan.innerHTML = "&#x1F6C8; Quantity is a required field"
	 flag = 0;
 }
 else if(isNaN(quantity)) {
	 quantitySpan.innerHTML = "&#x1F6C8; Quantity should be a number"
	 flag = 0;
 }
 else if(quantity<0) {
	quantitySpan.innerHTML = "&#x1F6C8; Quantity should be greater than 0"
	flag = 0;
}
 else {
	 quantitySpan.innerHTML = ""
	 } 	
	 
if (flag == 0) 
 return false 			
else
 return true		
}

function validateEditImages() {
	
	var flag = 1
	
	var image = document.getElementById("image")
	var imageSpan = document.getElementById("image-error")

	if (image.value == "" || image.value == null) {
		imageSpan.innerHTML = "&#x1F6C8; Image is a required field"
		flag = 0;
	}
	else if (image.files.length < 3) {
	 imageSpan.innerHTML = "&#x1F6C8;You need to add 3 images "
		flag=0
	}
	else if (image.files.length > 3) {
		imageSpan.innerHTML = "&#x1F6C8;You can only add 3 images "
		flag=0
		}
		else { 
			var allowedExtensions = ["jpg", "jpeg", "png"];
    for (var i = 0; i < image.files.length; i++) {
        var file = image.files[i];
        var extension = file.name.split('.').pop().toLowerCase();
        if (allowedExtensions.indexOf(extension) === -1) {
            imageSpan.innerHTML = "&#x1F6C8; Invalid file format";
            flag = 0;
            break;
        } else {
					if (image.files[i].size > 204800) {
						imageSpan.innerHTML = "&#x1F6C8; Image size should be within 200kb";
						flag = 0;
						break;
					} else {
						imageSpan.innerHTML = "";
					}	
        }
    }
	}

 if (flag == 0) 
 return false 			
 else
 return true
}

function validateEditImage() {
	
	var flag = 1
	var image = document.getElementById("single-image")
	var imageSpan = document.getElementById("single-image-error")

	if (image.value == "" || image.value == null) {
		imageSpan.innerHTML = "&#x1F6C8; Image is a required field";
		flag = 0;
	}
	else if (image.files.length > 1) {
		imageSpan.innerHTML = "&#x1F6C8; You cannot add more than 1 image";
		flag=0
	}
	else { 
			var allowedExtensions = ["jpg", "jpeg", "png"];
    for (var i = 0; i < image.files.length; i++) {
        var file = image.files[i];
        var extension = file.name.split('.').pop().toLowerCase();
        if (allowedExtensions.indexOf(extension) === -1) {
            imageSpan.innerHTML = "&#x1F6C8; Invalid file format";
            flag = 0;
            break;
        } else {
					if (image.files[i].size > 204800) {
						imageSpan.innerHTML = "&#x1F6C8; Image size should be within 200kb";
						flag = 0;
						break;
					} else {
						imageSpan.innerHTML = "";
					}	
        }
	}
	}

 if (flag == 0) 
 return false 			
 else
 return true
}

function unListProduct(prodId) {
		Swal.fire({
			title: 'Unlist Product',
			text: 'Are you sure you want to Unlist this product',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#008000',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Unlist it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = "/admin/product_view?id="+prodId;
			}
		});
}

function listProduct(prodId) {
		Swal.fire({
			title: 'List Product',
			text: 'Are you sure you want to List this product',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#008000',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, List it!',
			cancelButtonText: 'No, keep it'
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = "/admin/product_view?id="+prodId;
			}
		});
}
	


function deleteProduct(prodId) {
	Swal.fire({
		title: 'Delete Product',
		text: 'Are you sure you want to Delete this product',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/delete_products?id="+prodId;
		}
	});
}


function userBlock(prodId) {
	Swal.fire({
		title: 'Block User',
		text: 'Are you sure you want to Block this User',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/block?id="+prodId;
		}
	});
}

function userUnblock(prodId) {
	Swal.fire({
		title: 'Unblock User',
		text: 'Are you sure you want to Unblock this User',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/block?id="+prodId;
		}
	});
}

function listCategory(prodId) {
	Swal.fire({
		title: 'List Category',
		text: 'Are you sure you want to List this Category',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/category_view?id=" + prodId;
		}
	});
}

	function unListCategory(prodId) {
		Swal.fire({
			title: 'UnList Category',
			text: 'Are you sure you want to UnList this Category',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#008000',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = "/admin/category_view?id=" + prodId;
			}
		});
}
function logoutConfirm() {

	Swal.fire({
		title: 'Logout?',
		text: 'Are you sure you want to logout?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/logout"
		}
	});		
}


document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll('.nav-option');
	if (items.length != 0) {
		const isCurrentRouteSelected = (route) => {
			return window.location.pathname === route;
		};
	
		const selectCurrentRoute = () => {
			items.forEach(item => {
					
				if (isCurrentRouteSelected(item.dataset.route)) {
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

function validateCoupon() {
	var flag = 1;
	var expirySpan = document.getElementById("expiry-date-error")
	var codeSpan = document.getElementById("coupon-code-error")
	var discountSpan = document.getElementById("discount-percentage-error")
	var startSpan = document.getElementById("start-date-error")
	var minSpan = document.getElementById("min-purchase-error")
	var maxSpan=document.getElementById("max-discount-error")	 
	var couponCode = document.getElementById("couponCode").value.trim()
	var discount = document.getElementById("discountPercent").value.trim()
	var startDate = document.getElementById("startingDate").value.trim()
	var expiryDate = document.getElementById("expiryDate").value.trim()
	var minPurchase = document.getElementById("minPurchase").value.trim()
	var maxDiscount = document.getElementById("maxDiscount").value.trim()

	if (couponCode == "" || couponCode == null) {
	 codeSpan.innerHTML = "&#x1F6C8; Coupon code is a required field"
	 flag = 0;
 } else {
	 codeSpan.innerHTML = ""
 }

if (discount == "" || discount == null) {
	discountSpan.innerHTML = "&#x1F6C8; Discount is a required field"
	flag = 0;
}
else if(isNaN(discount)){
	discountSpan.innerHTML = "&#x1F6C8; Discount should be a number"
	flag=0
}
else if(discount<0){
	discountSpan.innerHTML = "&#x1F6C8; Discount should be a positive value"
	flag=0
}
else if (discount < 5 || discount > 90) {
	discountSpan.innerHTML = "&#x1F6C8; Discount should be between 5% - 90%"
	flag=0
	}
else {
	discountSpan.innerHTML=""
	}
 if (startDate == "" || startDate == null) {
	 startSpan.innerHTML = "&#x1F6C8; Start date is a required field"
	 flag = 0;
 }
 else {
	 startSpan.innerHTML = ""
 }
 if (expiryDate == "" || expiryDate == null) {
	 expirySpan.innerHTML = "&#x1F6C8; Expiry date is a required field"
	 flag = 0;
 }
 else if(expiryDate<=startDate){
	 expirySpan.innerHTML = "&#x1F6C8; Please select a different date"	
	 flag = 0;
 }
 else {
	 expirySpan.innerHTML = ""
 }

	
 if (minPurchase == "" || minPurchase == null) {
	minSpan.innerHTML = "&#x1F6C8; This is a required field"
	flag = 0;
}
else if(isNaN(minPurchase)){
	minSpan.innerHTML = "&#x1F6C8; Amount should be a number"
	flag=0
 }
 else if(minPurchase<=0){
	minSpan.innerHTML = "&#x1F6C8; Amount should be a positive value"
	flag=0
	}
else {
	minSpan.innerHTMLS=""
	}

	if (maxDiscount == "" || maxDiscount == null) {
		 maxSpan.innerHTML = "&#x1F6C8; This is a required field"
		flag = 0;
	}
	else if(isNaN(maxDiscount)){
		maxSpan.innerHTML = "&#x1F6C8; Discount should be a number"
		flag=0
	}
	else if(maxDiscount<=0){
		maxSpan.innerHTML = "&#x1F6C8; Discount should be a positive value"
		flag=0
		}
	else {
		maxSpan.innerHTML=""
		}
	
if (flag == 0) 
 return false 			
else
 return true

}

function deleteCoupon(id) {
	Swal.fire({
		title: 'Delete Coupon',
		text: 'Are you sure you want to Delete this Coupon',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/delete_coupon?id=" + id;
		}
	});
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
		if (totalAmount >= 1500) { 
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

function changeOrderStatus(orderId) {
	Swal.fire({
    title: 'Choose an option',
		input: 'select',
    inputOptions: {
        'Pending': 'Pending',
        'Shipped': 'Shipped',
        'Delivered': 'Delivered',
		   	'Returned': 'Returned',
				'Cancelled': 'Cancelled'
    },
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor:'#d33',
    inputValidator: function(value) {
        return new Promise(function(resolve, reject) {
            if (value !== '') {
                fetch("/admin/order_edit", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: value,id:orderId }) 
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                }).then((data) => {
                    window.location.href = "/admin/order_detail?id="+orderId;
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

function removeBanner(id) {
	Swal.fire({
		title: 'Unlist Banner',
		text: 'Are you sure you want to Unlist this image',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/bannerCheck?id="+id;
		}
	});
}

function activateBanner(id) {
	Swal.fire({
		title: 'Display Banner',
		text: 'Are you sure you want to display this image',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#008000',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = "/admin/bannerCheck?id="+id;
		}
	});
}

