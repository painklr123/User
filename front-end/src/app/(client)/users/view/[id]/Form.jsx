"use client";

import { useRouter } from 'next/navigation';

export default function Form({user, id}) {
  const router = useRouter()
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
                <div className="avatar-container">
                    <img 
                        src={`http://localhost/laravel/back-end/storage/app/public/users/${user.image}`}
                        className="avatar-image"
                    />
                </div>
            </div>
        </div>
        <div>
            <button className="btn btn-secondary btn_margin" onClick={() => router.back()}>
                Trở về
            </button>
        </div>
    </div>
  );
}
