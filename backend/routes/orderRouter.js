import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Coupon from '../models/couponModel.js';
import Order from '../models/ordersModel.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post( '/coupon/:id', isAuth, isAdmin , expressAsyncHandler(async (req, res) => {

  console.log(req.body.name);
  const coupon = await Coupon.findOne({name : req.body.name});
  if (coupon && coupon.length !==0 ) {
    console.log(coupon);
    res.send(coupon);
  } else {
    res.status(404).send({ message: 'Coupon Not Found' });
  }

  
})
);

orderRouter.delete( '/coupon/:id',isAuth,expressAsyncHandler(async (req, res) => {
  console.log('here delting');
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      const deleted = await coupon.remove();
      console.log('deleting an coupon');
      res.send(deleted);
    } else {
      res.status(404).send({ message: 'Coupon Not Found' });
    }
  })
);

orderRouter.get( '/coupon', isAuth , expressAsyncHandler(async (req, res) => {
  const coupons = await Coupon.find({});
  console.log(coupons);
  if (coupons) {
    res.send(coupons)
  } else { res.status(404).send({ message: 'Coupon Not Found' }) }
})
);


orderRouter.post( '/', isAuth, expressAsyncHandler(async (req, res) => {

      if (req.body.orderItems.length === 0) {
         res.status(400).send({ message: 'Cart is empty' });
         
      }
      
      else if (req.body.orderItems && req.body.shippingAddress && req.body.paymentMethod.paymentMethod
        && req.body.itemsPrice && req.body.shippingPrice && req.body.taxedPrice &&
        req.body.orderTotal &&  req.body.userInfo._id ) {


          const order = new Order({
            seller: req.body.orderItems[0].seller,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxedPrice,
            totalPrice: req.body.orderTotal,
            user: req.body.userInfo._id,
      });
      
      try {
        const createdOrder = await order.save();
        console.log(createdOrder);
        res.status(201).send({ message: 'New Order Created', order: createdOrder });

      }

      catch(err){
        console.log(err);
      }
      
      
      
      
      
          
        }

      else {
      console.log('data is missing');
      console.log(req.body.orderItems);
      console.log(req.body.shippingAddress);
      console.log(req.body.paymentMethod.paymentMethod);
      console.log(req.body.itemsPrice);
      console.log(req.body.shippingPrice);
      console.log(req.body.taxedPrice);
      console.log(req.body.orderTotal);
      console.log(req.body.userInfo._id);


    }
  })
);



orderRouter.get( '/mine', isAuth, expressAsyncHandler(async (req, res) => {

  console.log(req.user);
  const orders = await Order.find({ user: req.user._id });
  res.send(orders)

})
);



orderRouter.get( '/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    console.log('asdasdas');
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};
    console.log(sellerFilter);
    // if '/orderlist/seller' than it will filter results 
    // by the seller Id (that is actually userInfo._id) else {}
    const orders = await Order.find({ ...sellerFilter })
    res.send(orders);
  })
);




orderRouter.get( '/:id', isAuth, expressAsyncHandler(async (req, res) => {


    console.log('id');

    const order = await Order.findById(req.params.id);

    if (order) {
      res.send(order);

    } 
    
    else {
      res.status(404).send({ message: 'Order Not Found' });
    }

    

  })
);


orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      console.log('deleting an order');
      res.send(deleteOrder);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);



orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);








orderRouter.post( '/coupon', isAuth, isAdmin , expressAsyncHandler(async (req, res) => {

  console.log(req.body);
  const coupon = new Coupon({
    name : req.body.name ,
    type  : req.body.type,
    details : req.body.details , 
    discount : req.body.discount ,
});

try {
  const createdCoupon = await coupon.save();
  console.log(createdCoupon);
  res.send(createdCoupon);

}
catch(err){
  console.log(err);
}

  
})
);






export default orderRouter;