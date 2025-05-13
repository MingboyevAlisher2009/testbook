import axios from "axios";
import BooksModel from "../model/books.model.js";

const errorResponse = (res, status, message) => {
  return res.status(status).json({
    status: "error",
    message,
  });
};

const successResponse = (res, status, data) => {
  return res.status(status).json({
    status: "success",
    data,
  });
};

export const getBooks = async (req, res) => {
  const { userId } = req;
  try {
    const data = await BooksModel.find({ userId }).select("-userId");

    return successResponse(res, 200, data);
  } catch (error) {
    console.log("Books get error:", error);
    return errorResponse(res, 500, error);
  }
};

export const createBook = async (req, res) => {
  const { userId } = req;
  const { isbn } = req.body;

  if (!isbn) {
    return errorResponse(res, 400, { message: "ISBN is required" });
  }

  try {
    let bookData;
    try {
      const response = await axios.get(
        `https://openlibrary.org/isbn/${isbn}.json`
      );
      bookData = response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Book not found with ISBN:", isbn);
        return errorResponse(res, 404, {
          message: "Book not found. Please check the ISBN and try again.",
        });
      }
      throw error;
    }

    if (!bookData || Object.keys(bookData).length === 0) {
      console.log("Book data is empty for ISBN:", isbn);
      return errorResponse(res, 404, {
        message: "Book not found. Please check the ISBN and try again.",
      });
    }

    let bookInfo;
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?isbn=${isbn}`
      );

      if (!response.data.docs || response.data.docs.length === 0) {
        console.log("No additional book info found for ISBN:", isbn);
        return errorResponse(res, 404, {
          message:
            "Book details not found. Please check the ISBN and try again.",
        });
      }

      bookInfo = response.data.docs[0];
    } catch (error) {
      console.log("Error fetching additional book info:", error.message);
      bookInfo = { author_name: ["Unknown"] };
    }

    if (!bookInfo.author_name || bookInfo.author_name.length === 0) {
      console.log("No author name found for ISBN:", isbn);
      bookInfo.author_name = ["Unknown"];
    }

    const book = await BooksModel.create({
      userId,
      title: bookData.title || "Unknown Title",
      author:
        bookInfo.author_name[0] || bookInfo.author_name || "Unknown Author",
      published: bookData.publish_date || "Unknown",
      isbn,
      pages: bookData.number_of_pages || 0,
      status: "new",
      cover: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
    });

    return successResponse(res, 201, book);
  } catch (error) {
    console.error("Error creating book:", error.message);
    return errorResponse(res, 500, {
      message: "Failed to create book",
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    if (!id) {
      return errorResponse(res, 400, { message: "Book ID is required" });
    }

    const { status } = req.body;
    if (status && !["new", "reading", "finished"].includes(status)) {
      return errorResponse(res, 400, { message: "Invalid status value" });
    }

    const data = await BooksModel.findById(id);

    if (!data) {
      return errorResponse(res, 404, { message: "Book not found" });
    }
    console.log(data.userId, userId);

    if (data.userId.toString() !== userId.toString()) {
      return errorResponse(res, 403, {
        message: "Only the book owner can update it",
      });
    }

    data.status = req.body.status;
    const updatedBook = await data.save();
    return successResponse(res, 201, updatedBook);
  } catch (error) {
    console.log("Updating error:", error);
    return errorResponse(res, 500, error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    if (!id) {
      return errorResponse(res, 400, { message: "Book ID is required" });
    }

    const book = await BooksModel.findById(id);
    if (!book) {
      return errorResponse(res, 404, { message: "Book not found" });
    }

    if (book.userId.toString() !== userId.toString()) {
      return errorResponse(res, 403, {
        message: "Only the book owner can delete it",
      });
    }

    await BooksModel.findByIdAndDelete(id);

    return successResponse(res, 200, {
      message: "Book deleted successfully",
      deletedBookId: id,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return errorResponse(res, 500, {
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
