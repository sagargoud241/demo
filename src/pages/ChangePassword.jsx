import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9999/api/v1/auth/change-password", {
        token,
        new_password: newPassword,
        conform_password: confirmPassword,
      });

      if (response.data.code === "SUCCESS") {
        setMessage("Password updated successfully!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      setMessage("Password update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded w-80 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-center mb-4">Change Password</h2>

        <input type="text" placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} className="p-2 rounded text-black" required />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 rounded text-black" required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 rounded text-black" required />

        <button className="bg-pink-500 hover:bg-pink-600 p-2 rounded font-bold">Update Password</button>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default ChangePassword;
