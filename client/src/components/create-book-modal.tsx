import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import { CircleX, LinkIcon } from "lucide-react";

interface CreateBookModalProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (isbn: string) => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  open,
  isLoading,
  onClose,
  onSubmit,
}) => {
  const [isbn, setIsbn] = useState("");

  const handleSubmit = () => {
    onSubmit(isbn);
    setIsbn("");
  };

  const handleClose = () => {
    setIsbn("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          Create a book
        </DialogTitle>
        <IconButton onClick={handleClose} size="small" sx={{ p: 0 }}>
          <CircleX />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, mb: 3 }}>
        <Box sx={{ mb: 1, fontWeight: 500 }}>ISBN</Box>
        <TextField
          fullWidth
          value={isbn}
          onChange={(e) => setIsbn(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="________________"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 0, display: "flex", gap: 2 }}>
        <Button
          onClick={handleClose}
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
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#9333ea",
            "&:hover": {
              backgroundColor: "#7e22ce",
            },
            borderRadius: 1,
            py: 1,
          }}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBookModal;
