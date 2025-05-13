import { Box, Button, Stack } from "@mui/material";
import pageNotFound from "../../assets/page-not-found.png";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
      }}
    >
      <Box sx={{ textAlign: "center", px: 2 }}>
        <img src={pageNotFound} alt="Page not found" />

        <Stack
          direction="row"
          spacing={2}
          marginTop={5}
          justifyContent="center"
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#6200ea",
              "&:hover": { bgcolor: "#3700b3" },
              color: "#fff",
            }}
            onClick={() => (window.location.href = "/")}
          >
            Go Home Page
          </Button>

          <Button
            variant="outlined"
            sx={{ borderColor: "#6200ea", color: "#6200ea" }}
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
