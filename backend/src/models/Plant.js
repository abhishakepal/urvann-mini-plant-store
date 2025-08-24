import mongoose from "mongoose";

const PlantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    categories: { type: [String], default: [], index: true },
    inStock: { type: Boolean, default: true },
    image: { type: String, default: "" } // optional, for creativity
  },
  { timestamps: true }
);

// Helpful indexes for search/filter
PlantSchema.index({ name: "text", categories: "text" });
PlantSchema.index({ price: 1 });

export default mongoose.model("Plant", PlantSchema);
