import mongoose from "mongoose";

const FoundItemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // WHERE it was found
    college: {
      type: String,
      required: true,
    },

    // optional inside-campus location
    location: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "placeholder.jpg",
    }, 

    // HOW to retrieve it
    contact: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "General",
    },

    status: {
      type: String,
      default: "Found",
    },

    postedBy: {
      type: String,
      required: true,
    },
  },
  {
    collection: "founditems",
    timestamps: true,
  }
);

export default mongoose.model("FoundItem", FoundItemSchema);
