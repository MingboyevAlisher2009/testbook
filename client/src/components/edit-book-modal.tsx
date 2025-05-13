import { useState, useEffect, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { CircleX } from "lucide-react";

type BookStatus = "new" | "reading" | "finished";

interface EditBookModalProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (status: BookStatus) => void;
  bookTitle: string;
  currentStatus: BookStatus;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  open,
  isLoading,
  onClose,
  onSave,
  bookTitle,
  currentStatus,
}) => {
  const [status, setStatus] = useState<BookStatus>(currentStatus);

  useEffect(() => {
    if (open) {
      setStatus(currentStatus);
    }
  }, [open, currentStatus]);

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as BookStatus);
  };

  const handleSave = () => {
    onSave(status);
  };

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
          Edit book status
        </DialogTitle>
        <IconButton onClick={onClose} size="small" sx={{ p: 0 }}>
          <CircleX />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <strong>{bookTitle}</strong>
        </Box>

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
            Status
          </FormLabel>
          <RadioGroup value={status} onChange={handleStatusChange}>
            <FormControlLabel
              value="new"
              control={
                <Radio
                  sx={{
                    color: "#ff4d4f",
                    "&.Mui-checked": {
                      color: "#ff4d4f",
                    },
                  }}
                />
              }
              label="New"
            />
            <FormControlLabel
              value="reading"
              control={
                <Radio
                  sx={{
                    color: "#fadb14",
                    "&.Mui-checked": {
                      color: "#fadb14",
                    },
                  }}
                />
              }
              label="Reading"
            />
            <FormControlLabel
              value="finished"
              control={
                <Radio
                  sx={{
                    color: "#52c41a",
                    "&.Mui-checked": {
                      color: "#52c41a",
                    },
                  }}
                />
              }
              label="Finished"
            />
          </RadioGroup>
        </FormControl>
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
          onClick={handleSave}
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
          {isLoading ? "Loading..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookModal;
