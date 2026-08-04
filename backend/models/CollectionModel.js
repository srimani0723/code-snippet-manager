import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "collection description...",
    },
    snippets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snippet" }],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const CollectionModel = mongoose.model("Collection", collectionSchema);

export default CollectionModel;
