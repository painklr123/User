"use client";

import { handleLogin } from "../action";

export default function Form() {
  return (
    <form
      action={async (formData) => {
        const response = await handleLogin(formData);
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
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Mật khẩu..."
          required
        />
      </div>
      <div className="d-grid">
        <button className="btn btn-primary">Đăng nhập</button>
      </div>
    </form>
  );
}