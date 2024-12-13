"use client";

import { useRef, useState } from "react";
import { handleUpdateUser } from "../../action";
import { useRouter } from 'next/navigation';

export default function Form({ user, id }) {
    const router = useRouter()
    const [msg, setMsg] = useState("");
    const formRef = useRef();
  
    return (
      <form
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault(); // Prevent the default form submission behavior
  
          const formData = new FormData();
  
          // Dynamically append only non-empty inputs to formData
          const formElements = formRef.current.elements;
  
          for (const element of formElements) {
            if (element.name) {
              if (element.type === "file" && element.files.length > 0) {
                formData.append(element.name, element.files[0]);
              } else if (element.type !== "file" && element.value.trim() !== "") {
                formData.append(element.name, element.value);
              }
            }
          }
  
          console.log("FormData entries:", Array.from(formData.entries()));
  
          // Send the formData to the API
          const response = await handleUpdateUser(formData, id);
          if (!response) {
            setMsg("Đã có lỗi xảy ra. Vui lòng thử lại sau");
            return;
          }
  
          setMsg("Cập nhật người dùng thành công");
        }}
      >
        <div className="mb-3">
          <label htmlFor="name">Tên</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Tên..."
            defaultValue={user.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email..."
            defaultValue={user.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mật khẩu..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image">Ảnh đại diện</label>
          <input
            type="file"
            name="image"
            className="form-control"
            placeholder="Hình ảnh"
          />
        </div>
        <button type="submit" className="btn btn-primary btn_margin">
          Cập nhật
        </button>
        {msg && <span className="text-danger">{msg}</span>}
        <button className="btn btn-secondary btn_margin" onClick={() => router.back()}>
          Trở về
        </button>
      </form>
    );
  }