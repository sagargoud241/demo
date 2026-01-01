import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // clear previous messages

    try {
      const response = await axios.post("http://localhost:9999/api/v1/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("Login Response:", response.data);

      if (response.data.code === "SUCCESS") {
        setMessage("Login successful!");

        // Save tokens & user info
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        navigate("/"); // redirect to home
      } else if (response.data.code === "USER_NOT_FOUND") {
        // Backend returns if email not found
        setMessage("User not found. Please check your email.");
      } else if (response.data.code === "INVALID_PASSWORD") {
        // Backend returns if password is incorrect
        setMessage("Incorrect password. Please try again.");
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Handle backend error responses
      if (error.response) {
        const code = error.response.data?.code;
        if (code === "USER_NOT_FOUND") {
          setMessage("User not found. Please check your email.");
        } else if (code === "INVALID_PASSWORD") {
          setMessage("Incorrect password. Please try again.");
        } else {
          setMessage(error.response.data?.message || "Login failed. Please try again.");
        }
      } else {
        setMessage("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-md flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 p-2 rounded font-bold"
        >
          Login
        </button>

        <button
          type="button"
          className="text-sm text-blue-400 hover:underline mt-2"
          onClick={() => navigate("/forget-password")}
        >
          Forgot Password?
        </button>

        {message && <p className="text-center mt-2 text-yellow-400">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
