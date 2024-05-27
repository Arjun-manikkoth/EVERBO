const Order = require("../models/orderModel")
const User = require("../models/userModel")
const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
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

    let from = moment().subtract(7, 'days').format('YYYY-MM-DD');
    let to = moment().add(7, 'days').format('YYYY-MM-DD');
   
    if (req.query.from) {
      from = req.query.from;
       to = req.query.to;
    }
    let limit = 15;
    let count = await Order.find({grandTotalCost:{$exists:true,$ne:null},orderStatus:"Delivered",$and: [ { createdAt: { $gte: from } }, { createdAt: { $lte: to } } ]}).countDocuments()
    let totalPages=Math.ceil(count/limit)
    const orderData = await Order.find({grandTotalCost:{$exists:true,$ne:null},orderStatus:"Delivered",$and: [ { createdAt: { $gte: from } }, { createdAt: { $lte: to } } ]}).limit(limit).skip((page-1)*limit).sort({createdAt:-1}).populate("addressChosen").populate("userId").populate("cartData.productId")
    if (orderData.length != 0) {
      req.session.salesReport =orderData 
      res.render("sales_report", { orderData,totalPages,currentPage:page,from,to})
    }
    else {
      res.render("sales_report",{totalPages,currentPage:page,from,to,msg:"No Recent Orders"})
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


//admin dashboard load
const loadDashboard = async (req, res) => {
  try {

    //Total Users
    const totalUsers = await User.find({ $and: [{ is_verified: 1 }, { is_blocked: 0 }] }).countDocuments()
    
    //Total Orders
    const totalOrders = await Order.find({ $and: [{ orderStatus: "Delivered" }, {grandTotalCost:{$exists:true}}] }).countDocuments()
    
    //Total Cancelled/Returned orders
    const totalCancelledOrders = await Order.find({ $and: [{ $or:[{ orderStatus: "Cancelled"},{ orderStatus: "Returned"}] }, {grandTotalCost:{$exists:true}}] }).countDocuments()

    //Total revenue
    const orderData = await Order.find({ $and: [{ orderStatus: "Delivered" }, {grandTotalCost:{$exists:true}}] })
     
    const totalRevenue = orderData.reduce((total, value) => {

      return total += value.grandTotalCost
   }, 0)

    //Total categories
    const totalCategories = await Category.find({ $and: [{ is_listed:true}, {is_deleted:0}] }).countDocuments()

    //Total products
    const totalProducts = await Product.find({ $and: [{ is_listed:true}, {is_deleted:0}] }).countDocuments()
    
    //Top selling products
    
    const topProducts = await Order.aggregate([
      { $match: { orderStatus: { $eq: "Delivered" } ,grandTotalCost:{$exists:true}} },
      { $unwind: "$cartData" },
      { 
        $group: { 
          _id: "$cartData.productId", 
          totalSold: { $sum: "$cartData.productQuantity" } 
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 }, 
      {
        $lookup: {
          from: 'products', 
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: "$productDetails" } 
    ]);

    //Top selling categories
    
           const topCategories = await Order.aggregate([
            { $match: { orderStatus: { $eq: "Delivered" } ,grandTotalCost:{$exists:true}} }, // Match only delivered orders
            { $unwind: "$cartData" }, 
            { 
                $lookup: {
                    from: 'products', 
                    localField: 'cartData.productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            }, 
            { $unwind: "$productDetails" }, 
            { 
                $group: { 
                    _id: "$productDetails.category", 
                    totalSold: { $sum: "$cartData.productQuantity" } 
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 10 }, 
            {
                $lookup: {
                    from: 'categories', 
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            }, 
            { $unwind: "$categoryDetails" } 
        ]);

    let header = "Weekly"

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

// Get the start and end dates for each week in the current month
    const weeksInMonth = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    let currentWeekStart = firstDayOfMonth;

    while (currentWeekStart.getMonth() === currentMonth) {

      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);
      weeksInMonth.push({ start: currentWeekStart, end: weekEnd });
      currentWeekStart = new Date(weekEnd);
      currentWeekStart.setDate(currentWeekStart.getDate() + 1); // Move to next week
   
    }

    // Aggregate orders for each week
    const weeklySalesData = await Promise.all(weeksInMonth.map(async (week, index) => {
      const { start, end } = week;
      const totalSales = await Order.aggregate([
        {
          $match: {
            orderDate: { $gte: start, $lte: end },
            orderStatus: { $eq: "Delivered" },
            grandTotalCost: { $exists: true }
          }
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$grandTotalCost" }
          }
        }
      ]);
      return { week: index + 1, totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0 };
    }));

    let totalSales = [];
    let labels = []

    weeklySalesData.map((each) => {

      totalSales.push(each.totalSales)
      labels.push("Week-" + each.week)
      
    })

    const totalSale = JSON.stringify([...totalSales])
    const label = JSON.stringify([...labels])

    //category wise sales graph
    
    const categorySalesData = await Order.aggregate([
      {
          $unwind: "$cartData"
      },
      {
          $lookup: {
              from: "products",
              localField: "cartData.productId",
              foreignField: "_id",
              as: "productDetails"
          }
      },
      {
          $unwind: "$productDetails"
      },
      {
          $lookup: {
              from: "categories",
              localField: "productDetails.category",
              foreignField: "_id",
              as: "categoryDetails"
          }
      },
      {
          $unwind: "$categoryDetails"
      },
      {
          $group: {
              _id: "$categoryDetails._id",
              categoryName: { $first: "$categoryDetails.name" },
              totalSales: { $sum: "$cartData.totalPrice" }
          }
      },
      {
          $project: {
              _id: 0,
              categoryId: "$_id",
              categoryName: 1,
              totalSales: 1
          }
      }
  ]);

    let categName = [];
    let categSalesTotal = [];
    categorySalesData.map((each) => {
      categName.push(each.categoryName)
      categSalesTotal.push(each.totalSales)
 })

 const categSalesTotals = JSON.stringify([...categSalesTotal])
 const categNames = JSON.stringify([...categName])

    res.render("dashboard", {
      totalUsers, totalOrders, totalCancelledOrders, totalRevenue, totalCategories, totalProducts,
      topProducts, topCategories, header, totalSale, label, categNames, categSalesTotals
    })
  }
  catch (error) {
    console.log(error.message);
  }
}


//dashboard sales graph filter 
const dashboardFilter = async (req, res) => {
  try {
 
    if (req.body.salesSelect === "weekly") {
    
    
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const weeksInMonth = [];
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      let currentWeekStart = firstDayOfMonth;

      while (currentWeekStart.getMonth() === currentMonth) {

        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(currentWeekStart.getDate() + 6);
        weeksInMonth.push({ start: currentWeekStart, end: weekEnd });
        currentWeekStart = new Date(weekEnd);
        currentWeekStart.setDate(currentWeekStart.getDate() + 1); // Move to the next week
      
      }

      // Aggregate orders for each week separately
      const weeklySalesData = await Promise.all(weeksInMonth.map(async (week, index) => {
        
        const { start, end } = week;

        const totalSales = await Order.aggregate([
          {
            $match: {
              orderDate: { $gte: start, $lte: end },
              orderStatus: { $eq: "Delivered" },
              grandTotalCost: { $exists: true }
            }
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$grandTotalCost" }
            }
          }
        ]);
        return { week: index + 1, totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0 };
      }));

      let totalSales = [];
      let labels = []

      weeklySalesData.map((each) => {
        totalSales.push(each.totalSales)
        labels.push("Week-" + each.week)
      })

   
      res.json({totalSales,labels,header:'weekly'})

    } else if (req.body.salesSelect === "monthly") {
    
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const monthlySalesData = [];

      for (let month = 0; month < 12; month++) {

      const monthStartDate = new Date(currentYear, month, 1);
      const monthEndDate = new Date(currentYear, month + 1, 0);

      const totalSales = await Order.aggregate([
          {
         $match: {
           orderDate: { $gte: monthStartDate, $lte: monthEndDate },
           orderStatus: { $eq: "Delivered" },
           grandTotalCost: { $exists: true }
           }
         },
       {
        $group: {
        _id: null,
        totalSales: { $sum: "$grandTotalCost" }
          }
       }
    ]);

  // Push the total sales for the current month to the monthlySalesData array
       monthlySalesData.push({
         month: month + 1, // Add 1 to month index to match January as 1
       totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0
     });
   }

// Extracting labels and sales data from the monthlySalesData array
    const totalSales = monthlySalesData.map(monthData => monthData.totalSales);
    const labels = monthlySalesData.map(monthData => "Month-" + monthData.month);

      res.json({totalSales,labels,header:"monthly"})
    }
    else if (req.body.salesSelect === "yearly") {
              
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const yearlySalesData = [];

    
            for (let i = 0; i < 4; i++) {
              const year = currentYear - i;

              const yearStartDate = new Date(year, 0, 1); 
              const yearEndDate = new Date(year, 11, 31); 

              // Aggregate orders for the current year
              const totalSales = await Order.aggregate([
                {
                  $match: {
                    orderDate: { $gte: yearStartDate, $lte: yearEndDate },
                    orderStatus: { $eq: "Delivered" },
                    grandTotalCost: { $exists: true }
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalSales: { $sum: "$grandTotalCost" }
                  }
                }
              ]);

              yearlySalesData.push({
                year: year,
                totalSales: totalSales.length > 0 ? totalSales[0].totalSales : 0
              });
            }

            const totalSales = yearlySalesData.map(yearData => yearData.totalSales);
            const labels = yearlySalesData.map(yearData => yearData.year);
 
            res.json({totalSales,labels,header:"Yearly"})
    }
    


  }
  catch (error)
  {
    console.log(error.message)
  }
}


module.exports = {
  salesDataLoad,
  downloadSalesPdf,
  downloadSalesCsv,
  loadDashboard,
  dashboardFilter
}