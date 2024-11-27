/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { tsr } from "@/shared/router/tsr";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { mutate, data, error } = tsr.auth.signUp.useMutation({
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRegister = async () => {
    console.log("registering...");
    mutate({ body: { email, password } });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Registrar Usuário</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "black",
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "8px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              color: "black",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Registrar
        </button>
      </form>
      {error && <p style={{ marginTop: "16px", color: "red" }}>{JSON.stringify(error)}</p>}
    </div>
  );
}
