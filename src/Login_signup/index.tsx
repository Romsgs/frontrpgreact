import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../SessionContext";
import { config } from "../utils/config";

const LoginSignup: React.FC = () => {
  const { setSession } = useContext(SessionContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Alterna entre Login e Sign Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica dos campos
    if (
      (isLogin && email && password) ||
      (!isLogin && name && email && password)
    ) {
      try {
        const payload = isLogin
          ? { email, password } // Dados para login
          : { name, email, password }; // Dados para sign up

        const endpoint = isLogin
          ? `${config.base_url}${config.login}`
          : `${config.base_url}${config.new_user}`;
        console.log(endpoint);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Erro ao realizar o login ou cadastro.");
        }

        const data = await response.json();

        if (data.token) {
          // Armazena o token no sessionStorage
          sessionStorage.setItem("token", data.token);
          setSession({ logged: true }); // Atualiza o contexto de sessão para logado
          navigate("/"); // Redireciona para a página inicial
        } else {
          throw new Error("Token não recebido.");
        }
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
        {isLogin ? "Criar uma conta" : "Já tem uma conta? Faça login"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "300px",
    margin: "0 auto",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    width: "100%",
  },
  input: {
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  toggleButton: {
    marginTop: "10px",
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default LoginSignup;
