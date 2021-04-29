import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productsModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';


const app = express.Router();

 
// app.post("/", async (req, res) => {
//         const newProduct = new Product(req.body);
//         const savedProduct = await newProduct.save();
//         res.send(req.body);
// });



app.post( '/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {

            console.log(req.user);
          
          const product = new Product({
            seller : req.user._id , 
            sellerName : req.user.name ,
            title : 'samle name ' + Date.now(),
            image: '/images/dress1.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample description',
            availableSizes : []
          });


          try {
          const createdProduct = await product.save();
          res.send(createdProduct);
          console.log(createdProduct);
            
          } catch (error) {
            console.log(error);
          }
          

        })


);
      


app.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    console.log(req.body);
    if (product) {
      try {
        product.title = req.body.title;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        product.availableSizes = req.body.availableSizes;
        const updatedProduct = await product.save();
        res.send(updatedProduct);
        console.log(updatedProduct);

        
      } catch (error) {
        console.log(error);
      }
      
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

app.get("/all" , async(req,res)=>{
  const products = await Product.find({})
  res.send({products}) 
})


app.get("/", async (req, res) => {
        const seller = req.query.seller || '';
        const sellerFilter = seller ? { seller } : {};

        const title = req.query.title || '';
        const titleFilter = title ? { title: { $regex: title=== "all" ? '' : title , $options: 'i' } } : {};

        const category = req.query.category || '';
        const categoryFilter = category ? { category : { $regex: category=== "all" ? '' : category , $options: 'i' } } : {};

        const pageSize = 9 ;
        const page = Number(req.query.pageNumber) || 1;

        const order = req.query.order || '';
        const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
        const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
        const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

        const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
        const ratingFilter = rating ? { rating: { $gte: rating } } : {};
        const sortOrder = order === 'lowest' ? { price: 1 } : 
                          order === 'highest' ? { price: -1 } : 
                          order === 'toprated' ? { rating: -1 } : { _id: -1 };


        
        const count = await Product.count({
              ...sellerFilter,
              ...titleFilter,
              ...categoryFilter,
              ...priceFilter,
              ...ratingFilter, })


        const products = await Product.find({ 
          ...sellerFilter , 
          ...titleFilter ,
          ...categoryFilter,
          ...priceFilter , 
          ...ratingFilter }).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);

          res.send({ products, page, pages: Math.ceil(count / pageSize) , count  });

          
}); 


app.get( '/categories', expressAsyncHandler(async (req, res) => {
    console.log('being hit');
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);






app.get('/:id', async (req, res) => {

        const product = await Product.findById(req.params.id);

        if (product) {
          res.send(product);
        } else {
          res.status(404).send({ message: 'Product Not Found' });
        }
});


// app.delete("/:id", async (req, res) => {
//         const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//         res.send(deletedProduct);
// });

app.delete(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send(deleteProduct);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);





app.post( '/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {

    const productId = req.params.id;
    const product = await Product.findById(productId);


    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res.status(400).send({ message: 'You already submitted a review' });
      }


      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      }

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;

      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });

    } 
    
    
    else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);



export default app;




