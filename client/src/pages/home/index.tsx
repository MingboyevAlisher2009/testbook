import { Box, Button, Typography } from "@mui/material";
import Navbar from "./components/navbar";
import BookCard from "../../components/book-card";
import { useCallback, useEffect, useState } from "react";
import CreateBookModal from "../../components/create-book-modal";
import { toast } from "sonner";
import axiosIntense from "../../http/axios-instence";
import { IBook } from "../../types";
import { Loader2 } from "lucide-react";
import DeleteBookModal from "../../components/delete-book-modal";
import EditBookModal from "../../components/edit-book-modal";

const Home = () => {
  const [modals, setModals] = useState({
    create: false,
    delete: false,
    edit: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bookLoading, setbookLoading] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [bookInfo, setBookInfo] = useState<IBook>();
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async () => {
    setbookLoading(true);
    try {
      const { data } = await axiosIntense.get("/books");
      setBooks(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setbookLoading(false);
    }
  };

  const handleSubmit = async (isbn: string) => {
    setIsLoading(true);
    try {
      if (!isbn) {
        return toast.warning("Please enter ISBN!");
      }
      const { data } = await axiosIntense.post("/books", { isbn });
      toast.success("Book created succefully");
      setBooks([...books, data.data]);
      toggleModal("create");
    } catch (error: any) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (status: "new" | "reading" | "finished") => {
    if (!bookInfo?._id) {
      toast.error("Book information is missing");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axiosIntense.put(`/books/${bookInfo._id}`, {
        status,
      });

      const updatedBooks = books.map((book) =>
        book._id === data.data._id ? data.data : book
      );

      setBooks(updatedBooks);
      toast.success(`Book status updated to ${status}`);
      toggleModal("edit");
    } catch (error: any) {
      console.error("Error updating book:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!bookInfo?._id) {
      toast.error("Book information is missing");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axiosIntense.delete(`/books/${bookInfo?._id}`);
      const deletedBook = books.filter(
        (book) => book._id !== data.data.deletedBookId
      );
      setBooks(deletedBook);
      toast.success("Book deleted succefully");
      toggleModal("delete");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = useCallback((modalType: "create" | "delete" | "edit") => {
    setModals((prev) => ({
      ...prev,
      [modalType]: !prev[modalType],
    }));
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Box sx={{ paddingX: 10, color: "white" }}>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          {!!books.length ? (
            <Typography variant="h3">
              You’ve got
              <Box
                component="span"
                sx={{ color: "#9333ea", fontWeight: "bold" }}
              >
                {" "}
                {books ? books.length : "0"}{" "}
                {books && books.length > 1 ? "books" : "book"}
              </Box>
            </Typography>
          ) : (
            <Typography variant="h3">
              You didn't have any{" "}
              <Box
                component="span"
                sx={{ color: "#9333ea", fontWeight: "bold" }}
              >
                books
              </Box>
            </Typography>
          )}
          <Button
            onClick={() => toggleModal("create")}
            sx={{
              bgcolor: "#6200ee",
              color: "white",
              paddingX: 4,
              fontWeight: 500,
            }}
          >
            + Create a book
          </Button>
        </Box>
        <Typography fontWeight={400} fontSize={20} marginTop={2}>
          Your books today
        </Typography>
        {bookLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Loader2 size={80} className="text-white animate-spin" />
          </Box>
        )}
        {!books.length && (
          <Typography variant="h4" sx={{ textAlign: "center", marginTop: 5 }}>
            There were no books yet.
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 5,
          }}
        >
          {!!books.length &&
            books
              .filter(
                (book) =>
                  book.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  book.author
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  book.isbn.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((book, i) => (
                <BookCard
                  key={i}
                  title={book.title}
                  coverUrl={book.cover}
                  pages={book.pages}
                  publishedYear={book.published}
                  isbn={book.isbn}
                  author={book.author}
                  status={book.status}
                  onEdit={() => {
                    setBookInfo(book);
                    toggleModal("edit");
                  }}
                  onDelete={() => {
                    setBookInfo(book);
                    toggleModal("delete");
                  }}
                />
              ))}
        </Box>
      </Box>
      <CreateBookModal
        open={modals.create}
        isLoading={isLoading}
        onClose={() => toggleModal("create")}
        onSubmit={handleSubmit}
      />
      <EditBookModal
        open={modals.edit}
        isLoading={isLoading}
        onClose={() => toggleModal("edit")}
        onSave={handleEdit}
        bookTitle={bookInfo?.title || ""}
        currentStatus={bookInfo?.status || "new"}
      />
      <DeleteBookModal
        open={modals.delete}
        isLoading={isLoading}
        onClose={() => toggleModal("delete")}
        onConfirm={handleDelete}
        bookTitle={bookInfo?.title || ""}
      />
    </>
  );
};

export default Home;
