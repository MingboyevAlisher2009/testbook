import { model, Schema } from "mongoose";

const book = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    published: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "reading", "finished"],
    },
  },
  { timestamps: true }
);

const BooksModel = model("Books", book);

export default BooksModel;
