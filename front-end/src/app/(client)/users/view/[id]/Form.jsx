"use client";

import { useRef, useState } from "react";
import { handleUpdateUser } from "../../action";

export default function Form({user, id}) {
  const [msg, setMsg] = useState("");
  const formRef = useRef();
  return (
    <div>
        <div className="mb-3">
            <label htmlFor="">Tên</label>
            <input 
                type="text" 
                name="name" 
                className="form-control" 
                placeholder="Tên..."
                defaultValue={user.name}
                disabled
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
                disabled
            />
        </div>
        <div className="mb-3">
            <label htmlFor="">Ảnh đại diện</label>
            <div className="avatar">
                <div className="w-24 rounded-xl">
                    <img src={`http://localhost/laravel/back-end/storage/app/public/users/${user.image}`} />
                </div>
            </div>
        </div>
    </div>
  );
}
