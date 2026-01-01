import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear previous messages

    try {
      const response = await axios.post("http://localhost:9999/api/v1/auth/forget-password", {
        user_name: userName.trim(),
      });

      if (response.data.code === "SUCCESS") {
        setMessage("Token sent! Check your email.");
        setTimeout(() => navigate("/change-password"), 1500);
      } else if (response.data.code === "USER_NOT_FOUND") {
        // Custom error code from backend if user doesn't exist
        setMessage("User not found. Please check your username/email.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      // Handle network/server errors
      if (error.response && error.response.data?.code === "USER_NOT_FOUND") {
        setMessage("User not found. Please check your username/email.");
      } else {
        setMessage("Failed to send token. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded w-80 flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold text-center mb-4">Forget Password</h2>

        <input
          type="text"
          placeholder="Username / Email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <button className="bg-pink-500 hover:bg-pink-600 p-2 rounded font-bold">
          ForgetPassword
        </button>

        {message && <p className="text-center mt-2 text-yellow-400">{message}</p>}
      </form>
    </div>
  );
}

export default ForgetPassword;
