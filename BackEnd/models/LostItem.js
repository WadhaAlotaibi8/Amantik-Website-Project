import mongoose from "mongoose";

const LostItemSchema = new mongoose.Schema(
  {
    item: String,
    description: String,

    college: {
      type: String,
      required: true,
    },

    location: String,
    date: String,

    image: {
      type: String,
      default: "placeholder.jpg",
    },


    contact: String,
    category: String,
    status: String,

    postedBy: {
      type: String,
      required: true,
    },
  },
  { collection: "lostitems" }
);

export default mongoose.model("LostItem", LostItemSchema);
