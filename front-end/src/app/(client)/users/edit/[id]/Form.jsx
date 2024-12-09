"use client";

import { useRef, useState } from "react";
import { handleUpdateUser } from "../../action";

export default function Form({user, id}) {
  const [msg, setMsg] = useState("");
  const formRef = useRef();
  return (
    <form 
        ref={formRef} 
        action={async (formData) => {
            formData.append("id", id);
            const data = Object.fromEntries(formData);
            console.log(JSON.stringify(data));
            const response = await handleUpdateUser(formData);
            if(!response){
                setMsg("Đã có lỗi xảy ra. Vui lòng thử lại sau");
                return;
            }
            setMsg('Cập nhật người dùng thành công');
        }}
    >
        <div className="mb-3">
            <label htmlFor="">Tên</label>
            <input 
                type="text" 
                name="name" 
                className="form-control" 
                placeholder="Tên..."
                defaultValue={user.name}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="">Email</label>
            <input 
                type="email" 
                name="email" 
                className="form-control" 
                placeholder="Email..."
                defaultValue={user.email}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="">Mật khẩu</label>
            <input 
                type="password" 
                name="password" 
                className="form-control" 
                placeholder="Mật khẩu..."
            />
        </div>
        <div className="mb-3">
            <label htmlFor="">Ảnh đại diện</label>
            <input
                type="file"
                name="image"
                className="form-control"
                placeholder="Hình ảnh"
            />
        </div>
        <button className="btn btn-primary">Cập nhật</button>
        {msg && <span className="text-danger">{msg}</span>}
    </form>
  );
}
