import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Target } from "lucide-react";

const LandingPage = () => {
  const words = ["Track", "Manage", "Control"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center px-16 py-6">
        <div className="flex items-center gap-2">
          <Target className="w-7 h-7 text-gray-900" />
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
              <span className="block text-gray-300 mt-2 h-[1.2em] overflow-hidden relative">
                <span
                  className="absolute w-full transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateY(-${currentWordIndex * 35}%)`,
                  }}
                >
                  {words.map((word, index) => (
                    <span key={index} className="block h-[1.5em]">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tasker platform helps you stay on top of your tasks
              <br />
              and track your time efficiently.
            </p>
          </div>
        </section>

        {/* <section className="mt-16 p-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-3xl flex justify-center items-center"></section> */}
      </main>
    </div>
  );
};

export default LandingPage;
