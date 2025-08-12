const ADDRESS_MESSAGES = {
    NOT_ADDED: "Address not added",
    ADDRESS_EXISTS: "Address already exists",
};

const AUTH_MESSAGES = {
    WRONG_CREDENTIALS: "Invalid credentials",
    ACCOUNT_NOT_FOUND: "Account doesnot exist",
    ACCOUNT_EXISTS: "Already a user",
    ACCESS_DENIED: "Access Denied",
    REGISTRATION_FAILED: "Registration failed",
};

const OTP_MESSAGES = {
    OTP_EXPIRED: "OTP expired",
    INVALID_OTP: "Invalid OTP",
};

const WISHLIST_MESSAGES = {
    ADD_FAILED: "Couldn't add item",
};

const PASSWORD_MESSAGES = {
    NEW_PASSWORD_LOGIN: "Please login with your new password",
    PASSWORD_RESET_FAILED: "Password reset failed",
    CONFIRM_PASSWORD_FAILED: "Please Check the password",
};

const EMAIL_MESSAGES = {
    CHECK_MAIL: "Please check your Email for the link",
    MAIL_ACCOUNT_CHECK_FAILED: "Couldn't find an account with specified Email address",
};

const BANNER_MESSAGES = {
    BANNER_ADDED: "Banner added successfully",
};

const CART_MESSAGES = {
    FAILED_ADD_TO_CART: "Couldn't add item",
    FAILED_REMOVE_FROM_CART: "Couldnt remove product",
};

const CATEGORY_MESSAGES = {
    NOT_ADDED: "Address not added",
    CATEGORY_EXISTS: "Category already exists",
    CATEGORY_ADD_FAILED: "Failed to add category",
    CATEGORY_UPDATE_FAILED: "Couldn't update category",
};

const COUPON_MESSAGES = {
    NO_COUPONS: "No Coupons are added yet",
    COUPON_EXISTS: "Coupon already added",
    COUPON_ADD_FAILED: "Failed to add coupon",
};

const ORDER_MESSAGES = {
    NO_ORDERS: "No Recent Orders",
};

const COMMON_MESSAGES = {
    INTERNAL_SERVER_ERROR: "Internal Server Error",
};

const PRODUCT_MESSAGES = {
    NO_PRODUCTS: "No Products Added",
    PRODUCT_EXISTS: "Product already added",
    PRODUCT_UPDATE_FAILED: "Couldn't update product",
    PRODUCT_ADD_FAILED: "Failed to add product",
};

module.exports = {
    ADDRESS_MESSAGES,
    AUTH_MESSAGES,
    OTP_MESSAGES,
    WISHLIST_MESSAGES,
    PASSWORD_MESSAGES,
    EMAIL_MESSAGES,
    BANNER_MESSAGES,
    CART_MESSAGES,
    CATEGORY_MESSAGES,
    COUPON_MESSAGES,
    ORDER_MESSAGES,
    COMMON_MESSAGES,
    PRODUCT_MESSAGES,
};
