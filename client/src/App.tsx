import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import Home from "./pages/home";
import SignUP from "./pages/auth/sign-up";
import useAuth from "./store/use-auth";
import { ReactNode, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Box } from "@mui/material";
import PageNotFound from "./pages/page-not-found";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useAuth();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to={"/auth/sign-in"} />;
};

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useAuth();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to={"/"} /> : children;
};

const App = () => {
  const { getUserInfo, isLoading } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#1b1c24",
        }}
      >
        <Loader2 size={80} className="text-white animate-spin" />
      </Box>
    );
  }

  return (
    <Routes>
      <Route
        path="/auth/sign-in"
        element={
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        }
      />
      <Route
        path="/auth/sign-up"
        element={
          <AuthRoute>
            <SignUP />
          </AuthRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
