import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center px-16 py-6">
        <div className="flex items-center gap-2">
          <div className="text-2xl">🎯</div>
          <span className="text-2xl font-semibold text-gray-900">Tasker</span>
        </div>
        <nav className="hidden md:flex gap-10">
          <a
            href="#home"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#benefits"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Benefits
          </a>
          <a
            href="#reviews"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Reviews
          </a>
        </nav>
        <div className="flex gap-4 items-center">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try for free
          </Link>
        </div>
      </header>

      <main className="px-16 py-8">
        <section className="py-12">
          <div>
            <h1 className="text-8xl font-bold leading-tight text-gray-900 mb-8">
              Take Control Of Your Tasks
              <span className="inline-block relative mx-4">
                <img
                  src="/schedule-preview.png"
                  alt="My schedule"
                  className="w-52 rounded-xl shadow-lg align-middle"
                />
              </span>
              <span className="block text-gray-300 mt-2">Manage</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tasker platform helps you stay on top of your tasks
              <br />
              and track your time efficiently.
            </p>
          </div>
        </section>

        <section className="mt-16 p-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-3xl flex justify-center items-center">
          <img
            src="/dashboard-preview.png"
            alt="Tasker Dashboard"
            className="w-full max-w-4xl rounded-xl shadow-2xl"
          />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
