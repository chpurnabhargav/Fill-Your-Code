import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Improved function to detect programming language in code
  const detectLanguage = (code) => {
    // Extract language from markdown code block if present
    if (code.startsWith("```")) {
      const firstLine = code.split("\n")[0];
      const declaredLanguage = firstLine.replace("```", "").trim().toLowerCase();
      
      if (declaredLanguage && declaredLanguage !== "") {
        // Map common language aliases
        const languageMap = {
          "js": "javascript",
          "py": "python",
          "rb": "ruby",
          "ts": "typescript",
          "cs": "csharp",
          "c++": "cpp",
          "sh": "bash",
          "shell": "bash",
          "html": "html",
          "css": "css",
          "jsx": "javascript",
          "tsx": "typescript",
          "c#": "csharp",
          "objective-c": "objectivec",
          "objc": "objectivec",
          "rust": "rust",
          "rs": "rust",
          "golang": "go",
          "pl": "perl",
          "coffee": "coffeescript",
          "kt": "kotlin",
          "fs": "fsharp",
          "f#": "fsharp",
          "hs": "haskell",
          "vb": "vbnet",
          "lua": "lua",
          "clj": "clojure",
          "groovy": "groovy",
          "r": "r",
          "matlab": "matlab",
          "scala": "scala",
          "elm": "elm",
          "dart": "dart",
          "ex": "elixir",
          "exs": "elixir",
          "erl": "erlang",
          "lisp": "lisp",
          "asm": "assembly",
          "ps1": "powershell"
        };
        
        
        return languageMap[declaredLanguage] || declaredLanguage;
      }
    }
    
    // Language detection patterns - enhanced with more specific patterns
    const patterns = {
      python: /\b(import\s+|from\s+\w+\s+import|def\s+\w+\s*\(|class\s+\w+\s*\(|if\s+__name__\s*==\s*["']__main__["']:|@\w+|async\s+def)\b/i,
      java: /\b(public\s+class|private\s+|protected\s+|public\s+static\s+void\s+main|System\.out\.print|import\s+java\.|extends|implements)\b/i,
      javascript: /\b(const\s+|let\s+|var\s+|function\s+|document\.|window\.|console\.|=>\s*\{|\$\(|require\(|import\s+|export\s+)\b/i,
      html: /\b(<!DOCTYPE\s+html>|<html|<head|<body|<script|<div|<span|<a\s+href|<img\s+src|<link\s+rel|<meta\s+)/i,
      css: /\b(@media|@import|@keyframes|\{|\}|margin:|padding:|color:|background:|font-|display:|position:|#[a-fA-F0-9]{3,6})\b/i,
      c: /\b(#include\s+<\w+\.h>|printf\(|scanf\(|malloc\(|void\s+\w+\s*\(|int\s+main\s*\(|\w+_t\s+|\*\w+\s*=|&\w+|return\s+\d+;)\b/i,
      cpp: /\b(#include\s+<iostream>|using\s+namespace\s+std|std::|cout\s+<<|cin\s+>>|vector<|class\s+\w+\s*\{|template\s+<|::\s*)\b/i,
      csharp: /\b(using\s+System;|namespace\s+|Console\.|public\s+class|static\s+void\s+Main|string\[\]\s+args|var\s+\w+\s*=)\b/i,
      php: /\b(<\?php|\?>|\$_GET|\$_POST|\$_SERVER|\$_SESSION|\$_COOKIE|\$this->|echo\s+|function\s+\w+\s*\(|namespace\s+)\b/i,
      ruby: /\b(def\s+|class\s+|module\s+|require\s+|gem\s+|attr_|puts\s+|end$|do\s+\||\.\s*each\s+do|^\s*#.*$)\b/i,
      go: /\b(package\s+|import\s+\(|func\s+\w+\s*\(|type\s+\w+\s+struct|func\s+\(\w+\s+\*\w+\)|fmt\.Print|var\s+\w+\s+\w+)\b/i,
      swift: /\b(import\s+Foundation|var\s+|let\s+|func\s+|class\s+|struct\s+|enum\s+|protocol\s+|extension\s+|guard\s+|if\s+let\s+)\b/i,
      rust: /\b(fn\s+\w+|let\s+mut|use\s+\w+::|struct\s+\w+|impl\s+|match\s+|Option<|Result<|pub\s+|::\s*|\s*->|#\[derive\(|\w+::\w+)\b/i,
      kotlin: /\b(fun\s+\w+|val\s+|var\s+|package\s+|class\s+|interface\s+|object\s+|data\s+class|companion\s+object|lateinit\s+var)\b/i,
      typescript: /\b(interface\s+|type\s+|class\s+|export\s+|import\s+|as\s+|from\s+|extends\s+|implements\s+|<\w+>|:\s*\w+)\b/i,
      sql: /\b(SELECT\s+|FROM\s+|WHERE\s+|JOIN\s+|INSERT\s+INTO|UPDATE\s+|DELETE\s+FROM|CREATE\s+TABLE|ALTER\s+TABLE|DROP\s+TABLE)\b/i,
      objectivec: /\b(@interface|@implementation|@protocol|@property|@end|#import|NSString|UIView|[NS|UI][A-Z][a-zA-Z]+\s*\*|\[\w+\s+\w+\])\b/i,
      perl: /\b(use\s+\w+;|my\s+\$\w+|print\s+|sub\s+\w+\s*{|foreach\s+my\s+\$\w+|\$\w+\s*=~\s*|\w+::\w+|\$#|\$@|\$\$)\b/i,
      r: /\b(library\(|install\.packages\(|data\.frame\(|ggplot\(|function\(|<-|%>%|summary\(|plot\(|read\.csv\()\b/i,
      matlab: /\b(function\s+\w+\s*=|fprintf\(|plot\(|for\s+\w+\s*=|if\s+\w+\s*==|elseif|disp\(|end$|zeros\(|ones\(|size\()\b/i,
      lua: /\b(function\s+\w+\s*\(|local\s+|require\s*\(|end$|then$|else$|elseif|for\s+\w+\s*=|pairs\(|ipairs\()\b/i,
      haskell: /\b(module\s+\w+|import\s+\w+|data\s+\w+\s*=|type\s+\w+\s*=|newtype\s+\w+\s*=|\w+\s*::\s*\w+|where$|let\s+\w+\s*=|do$)\b/i,
      scala: /\b(object\s+\w+|class\s+\w+|trait\s+\w+|def\s+\w+|val\s+\w+|var\s+\w+|import\s+\w+|case\s+class|extends\s+\w+|with\s+\w+)\b/i,
      groovy: /\b(class\s+\w+|def\s+\w+|import\s+\w+|extends\s+\w+|implements\s+\w+|println\s+|assert\s+|@\w+|package\s+\w+)\b/i,
      coffeescript: /\b(class\s+\w+|constructor:|->|=>|\s+extends\s+|import\s+\{|\s+from\s+'|console\.log|require\s+|module\.exports)\b/i,
      dart: /\b(import\s+'package:|class\s+\w+|extends\s+\w+|implements\s+\w+|@override|void\s+main\(|setState\(|Widget\s+build|Future<|async\s+|await\s+)\b/i,
      fsharp: /\b(let\s+\w+\s*=|let\s+rec\s+\w+\s*=|module\s+\w+|open\s+\w+|type\s+\w+\s*=|match\s+\w+\s+with|member\s+this\.)\b/i,
      elixir: /\b(defmodule\s+\w+|def\s+\w+|defp\s+\w+|use\s+\w+|import\s+\w+|alias\s+\w+|@\w+|%\{|\|\>|do$|end$)\b/i,
      erlang: /\b(-module\(|-export\(\[|-behaviour\(|spawn\(|receive|after|case\s+\w+\s+of|\w+:\w+|fun\(|end\.)\b/i,
      clojure: /\b(\(defn\s+\w+|\(def\s+\w+|\(ns\s+\w+|\(require\s+|\(use\s+|\(import\s+|\(let\s+\[|\(:import|\(:require)\b/i,
      powershell: /\b(function\s+\w+-\w+|\$\w+\s*=|Write-Host|Get-\w+|Set-\w+|New-\w+|Remove-\w+|ForEach-Object|Where-Object|-eq|-ne|-gt|-lt)\b/i,
      vbnet: /\b(Imports\s+\w+|Public\s+Class|Private\s+Sub|Public\s+Function|End\s+Class|End\s+Sub|End\s+Function|Dim\s+\w+\s+As\s+|Module\s+\w+|REM\s+)/i,
      assembly: /\b(\.text|\.data|\.bss|\.global\s+\w+|\.extern\s+\w+|mov\s+|jmp\s+|call\s+|ret\s+|push\s+|pop\s+|add\s+|sub\s+)\b/i,
      lisp: /\b(\(defun\s+\w+|\(setq\s+\w+|\(defvar\s+\w+|\(lambda\s+\(|\(let\s+\(|\(cond\s+\(|\(car\s+|\(cdr\s+|\(cons\s+)\b/i
    };
    // Check for language-specific patterns
    let maxScore = 0;
    let detectedLanguage = "txt";
    
    for (const [language, pattern] of Object.entries(patterns)) {
      const matches = (code.match(pattern) || []).length;
      if (matches > maxScore) {
        maxScore = matches;
        detectedLanguage = language;
      }
    }
    
    // Additional checks for HTML vs JSX
    if (detectedLanguage === "html" && 
        (code.includes("import React") || 
         code.includes("function") || 
         code.includes("const") || 
         code.includes("=>") || 
         code.includes("useState"))) {
      detectedLanguage = "javascript";
    }
    
    // SQL specific checks
    if (code.toLowerCase().includes("select") && 
        code.toLowerCase().includes("from") && 
        !code.includes("function") && 
        !code.includes("class")) {
      detectedLanguage = "sql";
    }
    
    return detectedLanguage;
  };

  // Enhanced function to get appropriate file extension
  const getFileExtension = (language) => {
    const extensions = {
      python: "py",
      java: "java",
      javascript: "js",
      typescript: "ts",
      c: "c",
      cpp: "cpp",
      csharp: "cs",
      php: "php",
      ruby: "rb",
      go: "go",
      swift: "swift",
      rust: "rs",
      kotlin: "kt",
      html: "html",
      css: "css",
      sql: "sql",
      bash: "sh",
      powershell: "ps1",
      markdown: "md",
      yaml: "yml",
      json: "json",
      xml: "xml",
      objectivec: "m",
      perl: "pl",
      r: "r",
      matlab: "m",
      lua: "lua",
      haskell: "hs",
      scala: "scala",
      groovy: "groovy",
      coffeescript: "coffee",
      dart: "dart",
      fsharp: "fs",
      elixir: "ex",
      erlang: "erl",
      clojure: "clj",
      vbnet: "vb",
      assembly: "asm",
      lisp: "lisp"
    };
    
    return extensions[language] || "txt";
  };
  
  // Improved language name function
  const getLanguageName = (language) => {
    const names = {
      python: "Python",
      java: "Java",
      javascript: "JavaScript",
      typescript: "TypeScript",
      c: "C",
      cpp: "C++",
      csharp: "C#",
      php: "PHP",
      ruby: "Ruby",
      go: "Go",
      swift: "Swift",
      rust: "Rust",
      kotlin: "Kotlin",
      html: "HTML",
      css: "CSS",
      sql: "SQL",
      bash: "Bash",
      powershell: "PowerShell",
      markdown: "Markdown",
      yaml: "YAML",
      json: "JSON",
      xml: "XML",
      objectivec: "Objective-C",
      perl: "Perl",
      r: "R",
      matlab: "MATLAB",
      lua: "Lua",
      haskell: "Haskell",
      scala: "Scala",
      groovy: "Groovy",
      coffeescript: "CoffeeScript",
      dart: "Dart",
      fsharp: "F#",
      elixir: "Elixir",
      erlang: "Erlang",
      clojure: "Clojure",
      vbnet: "VB.NET",
      assembly: "Assembly",
      lisp: "Lisp",
      txt: "Text"
    };
    
    return names[language] || "Not Available";
  };
  
  // Improved download function with better naming
  const downloadCode = (code) => {
    const language = detectLanguage(code);
    const fileExtension = getFileExtension(language);
    const languageName = getLanguageName(language);
    
    // Create a more descriptive filename based on the content
    let filename = `code_${new Date().toISOString().slice(0, 10)}`;
    
    // For classes, try to extract the class name
    if (language === "java" || language === "csharp" || language === "cpp") {
      const classMatch = code.match(/class\s+(\w+)/);
      if (classMatch && classMatch[1]) {
        filename = classMatch[1];
      }
    }
    
    // For Python functions, try to extract the main function name
    if (language === "python") {
      const funcMatch = code.match(/def\s+(\w+)/);
      if (funcMatch && funcMatch[1]) {
        filename = funcMatch[1];
      }
    }
    
    // For JavaScript/TypeScript, try to extract component or function name
    if (language === "javascript" || language === "typescript") {
      const funcMatch = code.match(/function\s+(\w+)|const\s+(\w+)\s*=/);
      if (funcMatch && (funcMatch[1] || funcMatch[2])) {
        filename = funcMatch[1] || funcMatch[2];
      }
    }
    
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.${fileExtension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Improved parseResponse function
  const parseResponse = (response) => {

    
    // If no markdown code blocks, try to detect code sections
    const lines = response.split('\n');
    let hasCodePattern = false;
    
    for (const line of lines) {
      if (
        line.includes('import ') ||
        line.includes('def ') ||
        line.includes('class ') ||
        line.includes('function ') ||
        line.includes('const ') ||
        line.includes('var ') ||
        line.includes('let ') ||
        line.includes('public ') ||
        line.includes('#include') ||
        (line.trim().startsWith('for ') && line.includes('(')) ||
        (line.trim().startsWith('if ') && line.includes('('))
      ) {
        hasCodePattern = true;
        break;
      }
    }
    
    if (hasCodePattern) {
      // Use a more sophisticated approach to separate code from explanation
      const codeLines = [];
      const explanationLines = [];
      
      let inCodeBlock = false;
      let codeIndentation = 0;
      let consecutiveEmptyLines = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        
        const isCodeLine = 
          trimmedLine.startsWith('import ') ||
          trimmedLine.startsWith('from ') ||
          trimmedLine.startsWith('def ') ||
          trimmedLine.startsWith('class ') ||
          trimmedLine.startsWith('function ') ||
          trimmedLine.startsWith('const ') ||
          trimmedLine.startsWith('var ') ||
          trimmedLine.startsWith('let ') ||
          trimmedLine.startsWith('public ') ||
          trimmedLine.startsWith('private ') ||
          trimmedLine.startsWith('#include') ||
          (trimmedLine.startsWith('for ') && trimmedLine.includes('(')) ||
          (trimmedLine.startsWith('if ') && trimmedLine.includes('(')) ||
          trimmedLine.startsWith('return ') ||
          trimmedLine.includes(' = ') ||
          trimmedLine.includes(' => ') ||
          trimmedLine.startsWith('package ');
        
        if (isCodeLine && !inCodeBlock) {
          inCodeBlock = true;
          codeIndentation = line.search(/\S/);
        }
        if (inCodeBlock) {
          if (trimmedLine === "") {
            consecutiveEmptyLines++;
            if (consecutiveEmptyLines > 2) {
              inCodeBlock = false;
              consecutiveEmptyLines = 0;
            }
          } else {
            consecutiveEmptyLines = 0;
          }
          
          // Check if we've returned to prose text
          if (trimmedLine !== "" && 
              line.search(/\S/) < codeIndentation && 
              !trimmedLine.startsWith('}') &&
              !trimmedLine.startsWith(')') &&
              !trimmedLine.startsWith(']') &&
              i > 0 && 
              lines[i-1].trim() === "") {
            inCodeBlock = false;
          }
          
          if (inCodeBlock) {
            codeLines.push(line);
          } else {
            explanationLines.push(line);
          }
        } else {
          explanationLines.push(line);
        }
      }
      
      // Combine the code and explanation
      const code = codeLines.join('\n');
      const explanation = explanationLines.join('\n').trim();
      
      return {
        code: code || response,
      };
          }
          
          // Default case: no code detected
          return { text: response };
        };
      
        const handleSend = async () => {
          if (input.trim() === "" || loading) return;
      
          const newMessages = [...messages, { text: input, sender: "user" }];
          setMessages(newMessages);
          setInput("");
          setLoading(true);
      
          try {
            const res = await fetch("https://fill-your-code-1.onrender.com/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt: input }),
            });
      
            const data = await res.json();
            
            // Parse the response to separate code and explanation
            const responseData = parseResponse(data?.response || "⚠️ AI didn't respond.");
            
            setMessages([...newMessages, { 
              ...responseData,
              sender: "bot" 
            }]);
          } catch (error) {
            console.error("Error:", error);
            setMessages([
              ...newMessages, 
              { 
                text: "⚠️ Error connecting to AI. Please try again later.", 
                sender: "bot",
                isError: true
              }
            ]);
          } finally {
            setLoading(false);
          }
        };
      
        const handleKeyPress = (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        };
      
        return (
          <div className="chat-container">
            <div className="chat-box">
              <div className="chat-header">
                <div className="status-indicator"></div>
                <h2>FILL YOUR CODE</h2>
              </div>
              
              <div className="messages">
                {messages.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p>Ask me anything...</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`message ${msg.sender} ${msg.isError ? 'error' : ''}`}
                    >
                      {msg.sender === 'user' ? (
                        <div className="message-content">{msg.text}</div>
                      ) : msg.code ? (
                        <div className="code-explanation-container">
                          <div className="code-section">
                            <div className="code-content">
                              <pre>{msg.code}</pre>
                            </div>
                            <div className="code-controls">
                              {/* Dynamic download button using improved language detection */}
                              <button 
  className="download-btn"
  onClick={() => downloadCode(msg.code)}
>
  <FiDownload /> Download {
    getLanguageName(detectLanguage(msg.code)) === "Not Available" 
      ? "Not Available" 
      : getLanguageName(detectLanguage(msg.code))
  } File
</button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="message-content">{msg.text}</div>
                      )}
                      <div className="message-time">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))
                )}
                
                {loading && (
                  <div className="message bot typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
      
              <div className="input-area">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write some code..."
                  disabled={loading}
                  rows={1}
                />
                <button 
                  onClick={handleSend} 
                  disabled={loading || input.trim() === ""}
                  className={input.trim() === "" ? "disabled" : ""}
                >
                  <IoSend />
                </button>
              </div>
            </div>
      

      <style jsx>{`
      .chat-container {
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - 254px);
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: #0f172a; /* Darker, richer background */
}

.chat-box {
  width: 100%;
  height: 100%;
  border-radius: 0;
  background-color: #1e293b;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2); /* Inner shadow for depth */
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #1e3a8a, #1e293b); /* Gradient header */
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.status-indicator {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  margin-right: 0.75rem;
  position: relative;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6); /* Glow effect */
}

.status-indicator:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #10b981;
  opacity: 0.4;
  animation: pulse 2s infinite;
  top: 0;
  left: 0;
}

.chat-header h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); /* Text shadow for depth */
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  background-image: linear-gradient(0deg, rgba(15, 23, 42, 0.3) 1px, transparent 1px);
  background-size: 100% 20px; /* Subtle line pattern background */
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;
}

.empty-icon {
  color: #64748b;
  margin-bottom: 1rem;
  opacity: 0.7;
  transform: scale(1.2);
  animation: floatIcon 3s ease-in-out infinite;
}

.empty-state p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.8;
}

.message {
  max-width: 90%;
  padding: 0.75rem 1rem;
  border-radius: 1.2rem;
  position: relative;
  animation: fadeIn 0.3s ease-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.user {
  align-self: flex-end;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
  border-top-right-radius: 0.25rem;
}

.bot {
  align-self: flex-start;
  background-color: #334155;
  color: #f8fafc;
  border-top-left-radius: 0.25rem;
  width: 85%;
}

.message-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 0.25rem;
  text-align: right;
}

.typing {
  padding: 0.75rem 1rem;
  width: 80px;
}

.typing-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

.input-area {
  width: 100%;
  padding: 1rem;
  background-color: #0f172a;
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
}

.input-area textarea {
  flex: 1;
  background-color: #1e293b;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 18px;
  padding: 0.85rem 1.25rem;
  color: #f8fafc;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  width: calc(100% - 80px);
  resize: none;
  overflow: auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-area textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-area textarea::placeholder {
  color: #64748b;
}

.input-area textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-area button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-left: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.input-area button:hover {
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.input-area button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}

.input-area button.disabled {
  background: linear-gradient(135deg, #475569, #334155);
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.error {
  background-color: rgba(239, 68, 68, 0.2) !important;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* Enhanced code display section */
.code-explanation-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #1a2234;
  border: 1px solid rgba(99, 102, 241, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.code-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #111827;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.code-content {
  padding: 1.25rem;
  max-height: 300px;
  overflow-y: auto;
  position: relative;
  background-image: linear-gradient(
    to right,
    rgba(99, 102, 241, 0.05) 1px,
    transparent 1px
  );
  background-size: 2.5rem 100%;
}

.code-content pre {
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #e2e8f0;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-controls {
  display: flex;
  justify-content: flex-start;
  padding: 0.75rem 1.25rem;
  background-color: #1e293b;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(to right, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.download-btn:hover {
  background: linear-gradient(to right, #059669, #047857);
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.download-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.explanation-section {
  padding: 1.25rem;
  background-color: #1e293b;
}

.explanation-section h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
  color: #94a3b8;
  font-weight: 600;
}

.explanation-content {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #f1f5f9;
  white-space: pre-line;
}

/* Styled scrollbars */
.code-content::-webkit-scrollbar,
.explanation-content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.code-content::-webkit-scrollbar-track,
.explanation-content::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.code-content::-webkit-scrollbar-thumb,
.explanation-content::-webkit-scrollbar-thumb {
  background-color: rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
}

.code-content::-webkit-scrollbar-thumb:hover,
.explanation-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(99, 102, 241, 0.5);
}

/* Enhanced animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-7px);
  }
}

@keyframes floatIcon {
  0%, 100% {
    transform: translateY(0) scale(1.2);
  }
  50% {
    transform: translateY(-10px) scale(1.3);
  }
}
      `}</style>
      </div>
  );}