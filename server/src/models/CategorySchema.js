import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    code: { type: String, required: true }, // MC
    name: { type: String, required: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }
});

export default mongoose.model("Category", categorySchema);
