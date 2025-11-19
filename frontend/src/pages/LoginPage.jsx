import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just navigate to tasks page
    // In a real app, you'd authenticate here
    navigate("/tasks");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-gray-900">
            <div className="text-3xl">🎯</div>
            <span className="text-3xl font-semibold">Tasker</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isLogin ? "Login to manage your tasks" : "Sign up to get started"}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-gray-700 font-medium text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-gray-700 font-medium text-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 hover:shadow-lg transition-all"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            {isLogin ? (
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-gray-900 font-semibold underline hover:text-gray-700"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-gray-900 font-semibold underline hover:text-gray-700"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
