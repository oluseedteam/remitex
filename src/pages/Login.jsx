import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://api.remitex.co/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log("LOGIN RESPONSE:", data)

      if (!response.ok) {
        setLoading(false);
        setError(data.message || "Invalid credentials");
        return;
      }

      // Save token & user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);

      if (data.user?.role === "admin") {
        window.location.href = "/admin"; // Admin dashboard
      } else {
        window.location.href = "/dashboard"; // User dashboard
      }

    } catch (err) {
      setLoading(false);
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 to-blue-600 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative">

        <p className="text-center text-gray-600 mb-6">
          Login to access the Dashboard
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 focus-within:ring-2 ring-blue-500 transition">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                required
                className="w-full outline-none text-gray-700"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3 mt-1 focus-within:ring-2 ring-blue-500 transition">
              <FiLock className="text-gray-500" />
              <input
                type="password"
                required
                className="w-full outline-none text-gray-700"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 transition text-white font-semibold py-3 rounded-xl shadow-md text-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Logging in...</span>
            ) : (
              "Login"
            )}
          </button>

          <Link to="/register">
            <p style={{fontFamily: 'Dm sans'}} className="text-center text-sm">
              Don't have an account? <span className="text-blue-500">Register</span>
            </p>
          </Link>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          © {new Date().getFullYear()} Remitex — All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
