import { useState } from 'react';
import Sidebar from './SideBar';
import { FaBars } from 'react-icons/fa';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar className={sidebarOpen ? 'open' : ''} />
      
      {/* Mobile sidebar toggle button */}
      <button 
        className="sidebar-toggle" 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <FaBars />
      </button>
      
      <main className="main-content">
        {children}
      </main>
      
      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
        }
        
        .main-content {
          flex: 1;
          margin-left: 250px;
          padding: 20px;
          transition: margin-left 0.3s ease;
        }
        
        .sidebar-toggle {
          display: none;
        }
        
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
          
          .sidebar-toggle {
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1010;
            background: #3b82f6;
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }
        }
      `}</style>
    </div>
  );
}