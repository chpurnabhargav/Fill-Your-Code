import { useState, useRef, useEffect } from "react";
import { FaMoon, FaSun, FaDownload, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";

export default function Home() {
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setMessages((prev) => [...prev, { text: code, isUser: true }]);
    setCode("");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      let extractedCode = "⚠️ No code available.";
      let extractedExplanation = "";
      let language = "txt";
      let filename = "generated_code";

      if (data.completion && data.completion.parts?.length > 0) {
        const fullText = data.completion.parts[0].text;
        const codeRegex = /```([\w-]+)?\n([\s\S]*?)```/g;
        let match;
        let codeBlocks = [];

        while ((match = codeRegex.exec(fullText)) !== null) {
          language = match[1]?.trim().toLowerCase() || "txt";
          codeBlocks.push(match[2].trim());
        }

        if (codeBlocks.length > 0) {
          extractedCode = codeBlocks.join("\n\n");
          extractedExplanation = fullText.replace(codeRegex, "").trim();
        } else {
          extractedExplanation = fullText;
        }

        if (language === "java") {
          const classNameMatch = extractedCode.match(/public\s+class\s+(\w+)/);
          if (classNameMatch) {
            filename = classNameMatch[1];
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { text: { code: extractedCode, explanation: extractedExplanation, language }, isUser: false },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: { code: "❌ Server error occurred.", explanation: "" }, isUser: false },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleDownload = () => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage.text.code) return;

    let extension = lastMessage.text.language || "txt";

    const extMapping = {
      python: "py",
      javascript: "js",
      java: "java",
      c: "c",
      cpp: "cpp",
      html: "html",
      css: "css",
      txt: "txt",
    };

    extension = extMapping[extension] || "txt";

    let filename = "generated_code";
    if (extension === "java") {
      const classNameMatch = lastMessage.text.code.match(/public\s+class\s+(\w+)/);
      if (classNameMatch) {
        filename = classNameMatch[1];
      }
    }

    const blob = new Blob([lastMessage.text.code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen pb-32 flex flex-col items-center p-6 transition-all duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>

      <button onClick={() => setDarkMode(!darkMode)} className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <h1 className="text-5xl font-extrabold italic mb-6">Fill Your Code</h1>

      <div className="w-full h-96 overflow-y-auto bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-600 rounded-lg p-4 flex flex-col-reverse">
        <div>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-3`}>
              <div className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow-md ${message.isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-none"}`}>
                {message.isUser ? (
                  <p>{message.text}</p>
                ) : (
                  <div>
                    <strong>Code:</strong>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded-md overflow-x-auto">
                      <code>{message.text.code}</code>
                    </pre>
                    <strong>Explanation:</strong>
                    <p>{message.text.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div ref={chatEndRef}></div>
      </div>

      <textarea className="w-full h-24 p-3 mt-4 border border-gray-400 dark:border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black dark:bg-gray-900 dark:text-white" placeholder="Write some code..." value={code} onChange={(e) => setCode(e.target.value)} />

      <div className="mt-4 flex space-x-4 w-full justify-center">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition flex items-center" onClick={handleSubmit} disabled={loading}>
          {loading ? "⏳ Generating..." : "Get AI Suggestion"}
        </button>
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition flex items-center" onClick={handleDownload}>
          <FaDownload className="mr-2" /> Download Code
        </button>
      </div>

      {/* Styled Footer */}
      <footer className="w-full bg-blue-600 text-white text-center py-6 mt-10">
        <div className="container mx-auto flex flex-col items-center">
          <button onClick={() => setShowModal(true)} className="hover:underline text-lg font-semibold">About Me</button>
          <div className="flex space-x-4 mt-2">
            <a href="http://github.com/chpurnabhargav" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:scale-110 transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/bhargav-chowdary-a783b1292/?profileId=ACoAAEbky7wBv6BzXn5zvyYxqsDokLWozN9QkeA" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:scale-110 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>

      {/* About Me Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative w-96">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-2">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300">Hi, I'm Bhargav! 👋
I'm a Computer Science student at KLH University, Hyderabad, passionate about solving real-world challenges through technology. With expertise in C, Java, Python, SQL, PostgreSQL,HTML5, CSS, and Java Scipt , I enjoy developing innovative and impactful solutions.

As a Student-Educator at ACM KLH Bachupally, I actively organize events and create educational content to support fellow students. My goal is to build a career in a leading MNC, specializing in game development, where I can combine creativity with technology to shape immersive experiences.

Beyond coding, I love playing cricket, volleyball, and gaming—always up for a challenge, whether on the field or in the virtual world!

Let’s connect and create something amazing together!</p>
          </div>
        </div>
      )}  
    </div>
  );
}
