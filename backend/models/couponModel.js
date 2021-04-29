import mongoose from 'mongoose';


const couponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true  },
    type: { type: String, required: true},
    details: { type: String },
    discount: { type: Number, required: true },

  },
);
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;