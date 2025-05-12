import { model, Schema } from "mongoose";

const book = new Schema({
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
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
});

const BookSchema = model("Books", book);

export default BookSchema;
