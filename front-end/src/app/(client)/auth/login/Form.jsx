"use client";

import { useState } from "react";
import { handleLogin } from "../action";

export default function Form() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <form
      action={async (formData) => {
        const response = await handleLogin(formData);
        console.log(response); // Handle response as needed
      }}
    >
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email..."
          required
        />
      </div>
      <div className="mb-3">
        <label>Mật khẩu</label>
        <div className="password-wrapper" style={{ position: "relative" }}>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="form-control"
            placeholder="Mật khẩu..."
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {passwordVisible ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </div>
      <div className="d-grid">
        <button className="btn btn-primary">Đăng nhập</button>
      </div>
    </form>
  );
}
