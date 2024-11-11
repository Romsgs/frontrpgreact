import React from "react";
import { useNavigate } from "react-router-dom";

interface Session {
  logged: boolean;
}

interface HeaderProps {
  session: Session;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      {session.logged ? (
        <>
          <button style={styles.button} onClick={() => navigate("/home")}>
            Home
          </button>
          <button style={styles.button} onClick={() => navigate("/about")}>
            About
          </button>
          <button style={styles.button} onClick={() => navigate("/contact")}>
            Contact
          </button>
        </>
      ) : (
        <>
          <button style={styles.button} onClick={() => navigate("/login")}>
            Log in
          </button>
          <button style={styles.button} onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "#333",
  },
  button: {
    color: "#fff",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Header;
