import axios from "axios";

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    const response = await axios.post(
      "http://localhost:9999/api/v1/auth/refresh-token",
      { refresh_token: refreshToken }
    );

    if (response.data.code === "SUCCESS") {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("refresh_token", response.data.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data.data.token;
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = "/login";
  }
};
