import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productImage: {
    type: String,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
  },
  countInStock: {
    type: Number,
    required: true,
    min: [0, "Count in stock must be greater than 0"],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ratingAndReviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RatingAndReview",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  Customer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  ],
}, { timestamps: true });

ProductSchema.plugin(mongooseAggregatePaginate);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
