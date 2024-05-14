const Order = require("../models/orderModel")
const moment = require("moment")
const { jsPDF } =require("jspdf")
require('jspdf-autotable')
const fs = require('fs');
const { Parser } = require('json2csv')


//view orders page
const salesDataLoad = async (req, res) => {
  try {
    req.session.salesReport=""
    let page = 1
    if (req.query.page) {
      page=req.query.page
    }

    let from = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let to = moment().add(1, 'days').format('YYYY-MM-DD');
   
    if (req.query.from) {
      from = req.query.from;
       to = req.query.to;
    }
    let limit = 5;
    let count = await Order.find({}).countDocuments()
    let totalPages=Math.ceil(count/limit)
    const orderData = await Order.find({grandTotalCost:{$exists:true,$ne:null},orderStatus:"Delivered",$and: [ { createdAt: { $gte: from } }, { createdAt: { $lte: to } } ]}).limit(limit).skip((page-1)*limit).sort({createdAt:-1}).populate("addressChosen").populate("userId").populate("cartData.productId")
    if (orderData.length != 0) {
      req.session.salesReport =orderData 
      res.render("sales_report", { orderData,totalPages,currentPage:page})
    }
    else {
      res.render("sales_report",{totalPages,currentPage:page,msg:"No Recent Orders"})
    }
    
  }
  catch (error) {
    console.log(error.message);
  }
}

//download sales report pdf
const downloadSalesPdf = async (req, res) => {
  try {
    const data = req.session.salesReport;
    let table = [];

    for (let i of data) {
      let row = [];
      row.push(i._id);
      row.push(i.userId.name);
      const orderDate = new Date(i.orderDate).toLocaleString('en-US', { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      row.push(orderDate);
      row.push(i.productDiscountTotal + i.categoryDiscountTotal + i.couponDiscount);
      row.push(i.grandTotalCost);
      row.push(i.paymentType);
      table.push(row);
    }

    const doc = new jsPDF();
    doc.autoTable({
      head: [['Order Id', 'Customer', 'Order Date', 'Total Discount', 'Total Amount', 'Payment Type']],
      body: table,
    });

    // Instead of saving the PDF locally, send it directly to the client
    const pdfBuffer = doc.output('arraybuffer');
    res.setHeader('Content-Disposition', 'attachment; filename="table.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBuffer));

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

const downloadSalesCsv = async (req, res) => {
  try {
    const data = req.session.salesReport;

    const jsons2csvParser = new Parser();
    const csv = jsons2csvParser.parse(data);

    const fileName = `sales_report_${Date.now()}.csv`;

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'text/csv');

    res.status(200).send(csv);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  salesDataLoad,
  downloadSalesPdf,
  downloadSalesCsv
}