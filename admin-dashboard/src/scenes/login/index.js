import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "context/authContext";

import axios from "axios";
import { BASE_URL, headers } from "config";

import HashLoader from "react-spinners/HashLoader.js";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        formData,
        headers,
      );
      const { data } = response;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          admin: data.data,
          role: data.role,
          token: data.token,
        },
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Dashboard - Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleInputChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            onChange={handleInputChange}
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Log In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
