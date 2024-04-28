const mongoose= require('mongoose')

const orderSchema= new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user'},
    orderNumber: { type: Number},
    orderDate: { type: Date, default: new Date()},
    paymentType: { type: String, default: 'toBeChosen' },
    paymentStatus:{type:String,default:"Pending"}, 
    orderStatus: { type: String, default: 'Pending' },
    discount :{type:Number,default:0},
    addressChosen : { type: mongoose.Types.ObjectId, required: true, ref: 'address'},
    cartData: [{
        productId: { type: mongoose.Types.ObjectId, ref: "product" },
        productQuantity: { type: Number,min:1},
        pricePerProduct: {type: Number},
        totalPrice: {type:Number}
      }],
    grandTotalCost: { type: Number},
    paymentId: { type: String, },
    reason:{type:String}  
},{timestamps:true})

module.exports= mongoose.model( 'order', orderSchema )

