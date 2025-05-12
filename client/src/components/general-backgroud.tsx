import { Box } from "@mui/material";
import { ReactNode } from "react";

const GeneralBackgroud = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
      }}
      overflow={"hidden"}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-40%",
          width: "110%",
          height: "110%",
          backgroundColor: "#333333",
          borderRadius: 10,
          transform: "rotate(135deg)",
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GeneralBackgroud;
