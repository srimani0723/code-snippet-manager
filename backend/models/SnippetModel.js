import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    forkParent: {
      type: {
        parentSnippetId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Snippet",
        },
        parentUserDetails: {
          name: { type: String, ref: "User" },
          email: { type: String, ref: "User" },
        },
      },
      default: null,
    },
    forkUsers: {
      type: [
        {
          email: {
            type: String,
            ref: "User",
          },
          name: { type: String, ref: "User" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const SnippetModel = mongoose.model("Snippet", snippetSchema);

export default SnippetModel;
