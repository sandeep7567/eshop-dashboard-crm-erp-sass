import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
  },
  userId:
  {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    }
  ]
}, { timestamps: true });

const Category = model("Category", CategorySchema);

export default Category;