import Razorpay from "razorpay";
import crypto from "crypto";
import userModel from "../models/authModel.js";
import orderModel from "../models/orderModel.js";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';


// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = "INR";

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);



const placeOrderCOD = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { userId, items, amount, address, couponCode, discount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items provided in the order",
      });
    }

    // Generate unique order ID
    const uniqueOrderId = `COD-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;

    const orderData = {
      orderid: uniqueOrderId,
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "shubshukla2332@gmail.com", // Use env variable in production
        pass: "nbnv efod azbm dpwz",      // Use App Password
      },
    });

    // Common function to generate items HTML
    const generateItemsHTML = (items) => {
      return items.map((item) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;">
            <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
          </td>
          <td style="padding: 10px; border: 1px solid #ccc;">
            ${item.name} <br>
            ${item.variant ? `<span style="font-size: 12px; color: #888;">Size: ${item.variant}</span>` : ''}
          </td>
          <td style="padding: 10px; border: 1px solid #ccc;">
            ₹${item.price}
          </td>
          <td style="padding: 10px; border: 1px solid #ccc;">
            ${item.quantity || 1}
          </td>
        </tr>
      `).join("");
    };

    // Email to Customer
    const customerItemsHTML = generateItemsHTML(items);
    const customerMailOptions = {
      from: "Your Store <shubshukla2332@gmail.com>",
      to: address.email,
      subject: "🧾 Order Confirmation - Cash On Delivery",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
            <div style="padding: 20px; border-bottom: 1px solid #eee;">
              <h2 style="margin-bottom: 5px;">Thank you for your order, ${address.firstName}!</h2>
              <p style="color: #555;">Your Cash On Delivery order has been placed successfully.</p>
              <p style="color: #555; font-size: 14px; margin-top: 10px;">
                <strong>Note:</strong> Please keep the exact amount ready for delivery.
              </p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
              <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
              <p><strong>Total Amount:</strong> ₹${amount}</p>
              ${discount ? `<p><strong>Discount Applied:</strong> ₹${discount}</p>` : ''}
              ${couponCode ? `<p><strong>Coupon Code:</strong> ${couponCode}</p>` : ''}
              <p><strong>Payment Method:</strong> Cash On Delivery</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
              <p>
                ${address.firstName} ${address.lastName}<br>
                ${address.street}<br>
                ${address.city}, ${address.state}<br>
                ${address.country} - ${address.zipcode}<br>
                <strong>Phone:</strong> ${address.phone}
              </p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered (${items.length})</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  ${customerItemsHTML}
                </tbody>
              </table>
            </div>

            <div style="padding: 20px; text-align: center; color: #999;">
              <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
              <p style="font-size: 12px;">Thank you for shopping with us!</p>
            </div>
          </div>
        </div>
      `,
    };

    // Email to Admin
    const adminItemsHTML = generateItemsHTML(items);
    const adminMailOptions = {
      from: "Your Store <shubshukla2332@gmail.com>",
      to: "shubshukla2332@gmail.com", // Admin email
      subject: `🛒 New COD Order - ${uniqueOrderId}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
            <div style="padding: 20px; border-bottom: 1px solid #eee; background: #f8f9fa;">
              <h2 style="margin-bottom: 5px; color: #2c3e50;">New Cash On Delivery Order</h2>
              <p style="color: #555;">A new COD order has been placed and requires processing.</p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Details</h3>
              <p><strong>Order ID:</strong> ${uniqueOrderId}</p>
              <p><strong>Order Total:</strong> ₹${amount}</p>
              ${discount ? `<p><strong>Discount Applied:</strong> ₹${discount}</p>` : ''}
              ${couponCode ? `<p><strong>Coupon Code:</strong> ${couponCode}</p>` : ''}
              <p><strong>Payment Method:</strong> Cash On Delivery</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Customer Information</h3>
              <p>
                <strong>Name:</strong> ${address.firstName} ${address.lastName}<br>
                <strong>Email:</strong> ${address.email}<br>
                <strong>Phone:</strong> ${address.phone}<br>
                <strong>Address:</strong><br>
                ${address.street},<br>
                ${address.city}, ${address.state},<br>
                ${address.country} - ${address.zipcode}
              </p>
            </div>

            <div style="padding: 20px;">
              <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Items (${items.length})</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f0f0f0;">
                    <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  ${adminItemsHTML}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 10px; border: 1px solid #ccc; text-align: right;"><strong>Subtotal</strong></td>
                    <td style="padding: 10px; border: 1px solid #ccc;">₹${amount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="padding: 20px; background: #f8f9fa; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #555;">This order requires manual processing for delivery.</p>
              <p style="font-size: 12px; color: #999;">This is an automated notification. Do not reply to this email.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    res.json({
      success: true,
      message: "Order placed successfully (COD)",
      
      orderid: uniqueOrderId,
    });

  } catch (error) {
    console.error("Error in placeOrderCOD:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




// Place order using Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address, couponCode, discount } = req.body;

    // Step 1: Save order to DB with placeholder Razorpay orderid
    const newOrder = new orderModel({
      orderid: "", // will update this after Razorpay order is created
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      couponCode,
      discount,
    });
    await newOrder.save();

    // Step 2: Create Razorpay order using newOrder._id as receipt
    const options = {
      amount: (amount - (discount || 0)) * 100,
      currency: "INR",
      receipt: newOrder._id.toString(), // ✅ this connects payment with DB
    };

    razorpayInstance.orders.create(options, async (error, razorpayOrder) => {
      if (error) {
        console.error("Razorpay error:", error);
        return res.status(500).json({ success: false, message: "Razorpay order creation failed" });
      }

      // Step 3: Update order with Razorpay order ID
      newOrder.orderid = razorpayOrder.id;
      await newOrder.save();

      res.json({ success: true, order: razorpayOrder});
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const dbOrderId = orderInfo.receipt;
      const updatedOrder = await orderModel.findByIdAndUpdate(
        dbOrderId,
        { payment: true },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      // Setup nodemailer
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "shubshukla2332@gmail.com",     // use environment variable in real app
          pass: "nbnv efod azbm dpwz",       // use App Password (not Gmail login)
        },
      });

      // Common function to generate items HTML
      const generateItemsHTML = (items) => {
        return items
          .map(
            (item) => `
              <tr>
                <td style="padding: 10px; border: 1px solid #ccc;">
                  <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 6px;">
                </td>
                <td style="padding: 10px; border: 1px solid #ccc;">
                 ${item.name} <br>
                 ${item.variant ? `<span style="font-size: 12px; color: #888;">Size : ${item.variant}</span>` : ''}
               </td>
                <td style="padding: 10px; border: 1px solid #ccc;">
                  ₹${item.price}
                </td>
                <td style="padding: 10px; border: 1px solid #ccc;">
                  ${item.quantity || 1}
                </td>
              </tr>
            `
          )
          .join("");
      };

      // Email to Customer
      const customerItemsHTML = generateItemsHTML(updatedOrder.items);
      
      const customerMailOptions = {
        from: "shubshukla2332@gmail.com",
        to: updatedOrder.address.email,
        subject: "🧾 Order Confirmation - Your Order with Us is Confirmed!",
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
            <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
              <div style="padding: 20px; border-bottom: 1px solid #eee;">
                <h2 style="margin-bottom: 5px;">Thank you for your purchase, ${updatedOrder.address.firstName}!</h2>
                <p style="color: #555;">Your order has been confirmed and payment was successful.</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Summary</h3>
                <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
                <p><strong>Amount Paid:</strong> ₹${updatedOrder.amount}</p>
                <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
                <p><strong>Payment Status:</strong> Paid</p>
                <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Shipping Details</h3>
                <p>
                  ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
                  ${updatedOrder.address.street}<br>
                  ${updatedOrder.address.city}, ${updatedOrder.address.state}<br>
                  ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}<br>
                  Phone: ${updatedOrder.address.phone}
                </p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Items Ordered</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${customerItemsHTML}
                  </tbody>
                </table>
              </div>

              <div style="padding: 20px; text-align: center; color: #999;">
                <p>Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                <p style="font-size: 12px;">Thank you for shopping with us!</p>
              </div>
            </div>
          </div>
        `,
      };

      // Email to Admin
      const adminItemsHTML = generateItemsHTML(updatedOrder.items);
      
      const adminMailOptions = {
        from: "shubshukla2332@gmail.com",
        to: "shubshukla2332@gmail.com", // Admin email
        subject: `🛒 New Order Received - Order #${updatedOrder.orderid}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f6f9fc;">
            <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px #ccc;">
              <div style="padding: 20px; border-bottom: 1px solid #eee; background: #f8f9fa;">
                <h2 style="margin-bottom: 5px; color: #2c3e50;">New Order Notification</h2>
                <p style="color: #555;">A new order has been placed and payment is confirmed.</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Details</h3>
                <p><strong>Order ID:</strong> ${updatedOrder.orderid}</p>
                <p><strong>Order Total:</strong> ₹${updatedOrder.amount}</p>
                <p><strong>Payment Method:</strong> ${updatedOrder.paymentMethod}</p>
                <p><strong>Payment ID:</strong> ${orderInfo.id}</p>
                <p><strong>Order Date:</strong> ${new Date(updatedOrder.date).toLocaleString()}</p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Customer Information</h3>
                <p>
                  <strong>Name:</strong> ${updatedOrder.address.firstName} ${updatedOrder.address.lastName}<br>
                  <strong>Email:</strong> ${updatedOrder.address.email}<br>
                  <strong>Phone:</strong> ${updatedOrder.address.phone}<br>
                  <strong>Address:</strong><br>
                  ${updatedOrder.address.street},<br>
                  ${updatedOrder.address.city}, ${updatedOrder.address.state},<br>
                  ${updatedOrder.address.country} - ${updatedOrder.address.zipcode}
                </p>
              </div>

              <div style="padding: 20px;">
                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Order Items (${updatedOrder.items.length})</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 10px; border: 1px solid #ccc;">Image</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Item</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Price</th>
                      <th style="padding: 10px; border: 1px solid #ccc;">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${adminItemsHTML}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" style="padding: 10px; border: 1px solid #ccc; text-align: right;"><strong>Subtotal</strong></td>
                      <td style="padding: 10px; border: 1px solid #ccc;">₹${updatedOrder.amount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div style="padding: 20px; text-align: center; background: #f8f9fa; border-top: 1px solid #eee;">
                <p style="color: #555;">Order requires processing. Please take necessary action.</p>
                <p style="font-size: 12px; color: #999;">This is an automated notification. Do not reply to this email.</p>
              </div>
            </div>
          </div>
        `,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(customerMailOptions),
        transporter.sendMail(adminMailOptions)
      ]);

      return res.json({ success: true, message: "Payment Successful & Emails Sent" });
    } else {
      return res.json({ success: false, message: "Payment Not Yet Completed" });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//all order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


const userSingleOrder = async (req, res) => {
  try {
    const { orderid } = req.body;
    const orders = await orderModel.find({ orderid });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, orders: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};

//Users order for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update order status fpor admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Product Updated" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}



export { placeOrderCOD, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus, getSingleOrder, userSingleOrder };
