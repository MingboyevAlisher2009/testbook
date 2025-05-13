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
import { toast } from "sonner";
import axiosIntense from "../../http/axios-instence";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: {
      username?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axiosIntense.post(`/auth/sign-up`, {
          username: formData.username,
          password: formData.password,
        });
        toast.success("User created succefully");
        window.location.pathname = "/";
      } catch (error) {
        toast.error("Something went wrong.");
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
      <Card sx={{ width: 400, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Sign up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
              type="password"
              placeholder="Enter your password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              color="error"
              autoComplete="new-password"
            />

            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Enter your confirm password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                bgcolor: "#6200ee",
              }}
            >
              Sign up
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Already have an account?{" "}
              <Link
                to="/auth/sign-in"
                style={{ color: "#9333ea", textDecoration: "none" }}
              >
                Go to sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
