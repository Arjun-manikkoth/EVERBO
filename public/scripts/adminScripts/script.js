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
	var emailLogin = document.getElementById("email-login").value
	var passwordLogin = document.getElementById("password-login").value
  
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
		var imageSpan=document.getElementById("image-error")
  	var category = document.getElementById("categoryName").value
		var description = document.getElementById("description").value
		var image = document.getElementById("image").value
	
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
		if (image == "" || image == null) {
			imageSpan.innerHTML = "&#x1F6C8; Image not uploaded"
			document.getElementById("image").focus();
			flag = 0;
		}
		else { 
			imageSpan.innerHTML = "";
	}	
		if (flag == 0)
				return false
		else
			return true
}

function validateEditCategory() { 
	var flag = 1;
	var categorySpan = document.getElementById("category-error")
	var descriptionSpan = document.getElementById("description-error")
	var imagespan=document.getElementById("image-error")
	var category = document.getElementById("categoryName").value
	var description = document.getElementById("description").value
	var image = document.getElementById("image").value

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
	if (flag == 0)
			return false
	else
		return true
}

function validateProduct() { 
	   var flag = 1;
	   var productSpan = document.getElementById("product-error")
		 var categorySpan = document.getElementById("category-error")
		 var descriptionSpan = document.getElementById("description-error")
	   var imageSpan = document.getElementById("image-error")
	   var priceSpan = document.getElementById("price-error")
		 var quantitySpan=document.getElementById("quantity-error")	 
		 var category = document.getElementById("categoryName").value
		 var description = document.getElementById("description").value
	   var image = document.getElementById("image").value
	   var product = document.getElementById("productName").value
		 var price = document.getElementById("price").value
		 var quantity = document.getElementById("quantity").value
	 
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
		 if (image == "" || image == null) {
			 imageSpan.innerHTML = "&#x1F6C8; Image not uploaded"
			 flag = 0;
		 }
		 else { 
			 imageSpan.innerHTML = "";
	 }
     
	  if (price == "" || price == null) {
			priceSpan.innerHTML = "&#x1F6C8; Price is a required field"
			flag = 0;
		}
		else if(isNaN(price)) {
			priceSpan.innerHTML = "&#x1F6C8; Price should be a number"
			flag = 0;
  	}
	  else {
		 priceSpan.innerHTML = ""
	  }
	
	  if (quantity == "" || quantity == null) {
			quantitySpan.innerHTML = "&#x1F6C8; Quantity is a required field"
			
			flag = 0;
		}
		else if(isNaN(quantity)) {
			quantitySpan.innerHTML = "&#x1F6C8; Quantity should be a number"
			flag = 0;
  	}
		else {
			productSpan.innerHTML = ""
		} 	
	console.log(flag)
	if (flag == 0) 
		return false 	 
	else
		return true		 
 }


 function validateEditProduct() { 
	var flag = 1;
	var productSpan = document.getElementById("product-error")
	var categorySpan = document.getElementById("category-error")
	var descriptionSpan = document.getElementById("description-error")
	var imageSpan = document.getElementById("image-error")
	var priceSpan = document.getElementById("price-error")
	var quantitySpan=document.getElementById("quantity-error")	 
	var category = document.getElementById("categoryName").value
	var description = document.getElementById("description").value
	var image = document.getElementById("image").value
	var product = document.getElementById("productName").value
	var price = document.getElementById("price").value
	var quantity = document.getElementById("quantity").value

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
 else {
	priceSpan.innerHTML = ""
 }

 if (quantity == "" || quantity == null) {
	 quantitySpan.innerHTML = "&#x1F6C8; Quantity is a required field"
	 flag = 0;
 }
 else if(isNaN(quantity)) {
	 quantitySpan.innerHTML = "&#x1F6C8; Quantity should be a number"
	 flag = 0;
 }
 else {
	 productSpan.innerHTML = ""
 } 	
console.log(flag)
if (flag == 0) 
 return false 			
else
 return true		
}
function validateEditImages() {
	
	var flag = 1
	
	var image = document.getElementById("image").value
	var imageSpan = document.getElementById("image-error")

	if (image == "" || image == null) {
		imageSpan.innerHTML = "&#x1F6C8; Image is a required field"
		flag = 0;
	}
	else {
		imageSpan.innerHTML = ""
	}

 if (flag == 0) 
 return false 			
 else
 return true
}
function validateEditImage() {
	
	var flag = 1
	
	var image = document.getElementById("single-image").value
	var imageSpan = document.getElementById("single-image-error")

	if (image == "" || image == null) {
		imageSpan.innerHTML = "&#x1F6C8; Image is a required field"
		flag = 0;
	}
	else {
		imageSpan.innerHTML = ""
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
			confirmButtonColor: '#3085d6',
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
			confirmButtonColor: '#3085d6',
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
		confirmButtonColor: '#3085d6',
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
		confirmButtonColor: '#3085d6',
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
		confirmButtonColor: '#3085d6',
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
		confirmButtonColor: '#3085d6',
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
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.href = "/admin/category_view?id=" + prodId;
			}
		});
	}