import mongoose from 'mongoose'


const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const productSchema = new mongoose.Schema(
  {
    title: { type: String  },
    seller: { type: mongoose.Schema.Types.ObjectId } , 
    sellerName : { type : String } ,
    image: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category : {type : String} ,
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    availableSizes : [String] ,
    reviews: [reviewSchema],

  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model('Product', productSchema);
export default Product;
