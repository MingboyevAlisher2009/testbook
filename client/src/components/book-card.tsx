"use client";

import type React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Link,
} from "@mui/material";
import { EditIcon, Trash2 } from "lucide-react";

type BookStatus = "new" | "reading" | "finished";

interface BookCardProps {
  title: string;
  coverUrl: string;
  pages: number;
  publishedYear: number;
  isbn: string;
  author: string;
  status?: BookStatus;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  coverUrl,
  pages,
  publishedYear,
  isbn,
  author,
  status = "new",
  onEdit,
  onDelete,
}) => {
  const getStatusChip = () => {
    switch (status) {
      case "new":
        return (
          <Chip
            label="New"
            sx={{
              bgcolor: "#ff4d4f",
              color: "white",
              fontWeight: 500,
              borderRadius: "16px",
              px: 1,
            }}
          />
        );
      case "reading":
        return (
          <Chip
            label="Reading"
            sx={{
              bgcolor: "#fadb14",
              color: "black",
              fontWeight: 500,
              borderRadius: "16px",
              px: 1,
            }}
          />
        );
      case "finished":
        return (
          <Chip
            label="Finished"
            sx={{
              bgcolor: "#52c41a",
              color: "white",
              fontWeight: 500,
              borderRadius: "16px",
              px: 1,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        width: 450,
        borderRadius: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            position: "absolute",
            right: -40,
            top: 20,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            zIndex: 2,
          }}
        >
          <IconButton
            aria-label="delete"
            sx={{
              bgcolor: "#ff4d4f",
              color: "white",
              "&:hover": { bgcolor: "#ff7875" },
              width: 40,
              height: 40,
              borderRadius: 2,
              borderBottomLeftRadius: 0,
            }}
            onClick={onDelete}
          >
            <Trash2 />
          </IconButton>
          <IconButton
            aria-label="edit"
            sx={{
              bgcolor: "#7c4dff",
              color: "white",
              "&:hover": { bgcolor: "#9d84ff" },
              width: 40,
              height: 40,
              borderRadius: 2,
              borderTopLeftRadius: 0,
            }}
            onClick={onEdit}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Cover:{" "}
            <Link href={coverUrl} color="primary" underline="hover">
              {coverUrl}
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Pages: {pages}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Published: {publishedYear}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Isbn: {isbn}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {author} / {publishedYear}
          </Typography>
          {getStatusChip()}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
