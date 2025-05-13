import type React from "react";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../http/api";
import { toast } from "sonner";
import axiosIntense from "../../http/axios-instence";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axiosIntense.post(`${BASE_URL}/auth/sign-in`, formData);
        toast.success("Login succefully");
        window.location.pathname = "/";
      } catch (error) {
        toast.error("Login or password invalid.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              placeholder="john doe"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              autoComplete="username"
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={"password"}
              placeholder="Enter your password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.5,
                bgcolor: "#6200ee",
                fontSize: "1rem",
              }}
            >
              Sign in
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/sign-up"
                style={{ color: "#9333ea", textDecoration: "none" }}
              >
                Create an account
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
