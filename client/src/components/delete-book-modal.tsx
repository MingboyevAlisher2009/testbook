import type React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { CircleX } from "lucide-react";

interface DeleteBookModalProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle: string;
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({
  open,
  isLoading,
  onClose,
  onConfirm,
  bookTitle,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: "100%",
          maxWidth: 450,
          p: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <DialogTitle sx={{ p: 0, fontSize: 20, fontWeight: 600 }}>
          Delete book
        </DialogTitle>
        <IconButton onClick={onClose} size="small" sx={{ p: 0 }}>
          <CircleX />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, mb: 3 }}>
        <DialogContentText sx={{ color: "text.primary" }}>
          Are you sure you want to delete <strong>{bookTitle}</strong>? This
          action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: 0, display: "flex", gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          sx={{
            borderColor: "#9333ea",
            color: "#9333ea",
            "&:hover": {
              borderColor: "#7e22ce",
              backgroundColor: "rgba(147, 51, 234, 0.04)",
            },
            borderRadius: 1,
            py: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={onConfirm}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ff4d4f",
            "&:hover": {
              backgroundColor: "#ff7875",
            },
            borderRadius: 1,
            py: 1,
          }}
        >
          {isLoading ? "Loading..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBookModal;
