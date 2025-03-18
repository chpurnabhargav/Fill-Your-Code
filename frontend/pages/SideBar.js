import { FaHome, FaUser, FaCode, FaProjectDiagram, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="branding">
          <h2 className="name">Bhargav</h2>
          <div className="tagline">Student</div>
        </div>
        
        <div className="social-links">
          <a href="https://github.com/chpurnabhargav" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/bhargav-chowdary-a783b1292/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/bhargav7776" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter />
          </a>
          <a href="mailto:chpurnabhargav@gmail.com" className="social-icon">
            <FaEnvelope />
          </a>
        </div>
      </div>
      
      <div className="copyright">
        © 2025 Bhargav
      </div>

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background-color: #111827;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem 0;
          position: fixed;
          left: 0;
          top: 0;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 100;
        }
        
        .sidebar-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .branding {
          padding: 0 1.5rem;
          margin-bottom: 2rem;
        }
        
        .name {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: #6366f1;
          letter-spacing: -0.5px;
        }
        
        .tagline {
          color: #94a3b8;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        
        .nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0 0.75rem;
          margin-bottom: auto;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          color: #cbd5e1;
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }
        
        .nav-icon {
          margin-right: 0.75rem;
          font-size: 1.25rem;
        }
        
        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: #f8fafc;
        }
          /* Replace your current .social-icon:hover with these styles */

/* GitHub icon - white glow */
.social-icon:nth-of-type(1):hover {
  background-color: rgba(33, 38, 45, 0.2);
  color: #f0f6fc;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(240, 246, 252, 0.7);
}

/* LinkedIn icon - blue glow */
.social-icon:nth-of-type(2):hover {
  background-color: rgba(10, 102, 194, 0.2);
  color: #0a66c2;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(10, 102, 194, 0.7);
}

/* Twitter/X icon - light blue glow */
.social-icon:nth-of-type(3):hover {
  background-color: rgba(29, 161, 242, 0.2);
  color: #1da1f2;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(29, 161, 242, 0.7);
}

/* Email icon - red glow */
.social-icon:nth-of-type(4):hover {
  background-color: rgba(234, 67, 53, 0.2);
  color: #ea4335;
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(234, 67, 53, 0.7);
}
        
        .nav-item.active {
          background-color: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          font-weight: 500;
        }
        
        .active .nav-icon {
          color: #6366f1;
        }
        
        .social-links {
          display: flex;
          flex-direction:column;
          justify-content: center;
          align-items:center;
          gap: 1rem;
          padding: 1.5rem;
        }
        
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px; /* Circle size */
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: #cbd5e1;
  transition: all 0.2s ease;
}

.social-icon svg {
  width: 50px;  /* Increase icon size */
  height: 50px;
}



       .social-icon:hover {
  background-color: rgba(99, 102, 241, 0.2);
  color: #6366f1;
  transform: translateY(-2px);
}
        .copyright {
          padding: 1rem 1.5rem 0;
          color: #64748b;
          font-size: 0.75rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}