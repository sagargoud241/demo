import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // signup submit
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9999/api/v1/auth/signup",
        formData
      );

      console.log("Signup Response:", response.data);

      if (response.data.code === "SUCCESS") {
        setMessage("Signup successful! Please login.");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-md flex flex-col gap-3 w-96"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <input name="firstName" placeholder="First Name" onChange={handleChange} className="p-2 rounded text-black" required />
        <input name="middleName" placeholder="Middle Name" onChange={handleChange} className="p-2 rounded text-black" />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} className="p-2 rounded text-black" required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} className="p-2 rounded text-black" required />
        <input name="address" placeholder="Address" onChange={handleChange} className="p-2 rounded text-black" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="p-2 rounded text-black" required />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="p-2 rounded text-black" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 rounded text-black" required />

        <button className="bg-pink-500 hover:bg-pink-600 p-2 rounded font-bold">
          Sign Up
        </button>

        <p
          className="text-sm text-center cursor-pointer text-pink-400"
          onClick={() => navigate("/login")}
        >
          Already have an account? <button>Login</button>
        </p>

        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
