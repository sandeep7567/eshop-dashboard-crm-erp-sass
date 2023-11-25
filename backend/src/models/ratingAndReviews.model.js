const mongoose = require("mongoose");

// Define the RatingAndReview schema
const RatingAndReviewSchema = new mongoose.Schema({
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	rating: {
		type: Number,
		required: true,
		min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5"],
	},
	review: {
		type: String,
		required: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Product",
		index: true,
	},
});

const RatingAndReview = mongoose.model("RatingAndReviewSchema", RatingAndReviewSchema);

export default RatingAndReview;