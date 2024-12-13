import { getSession } from "@/utils/session";
import Link from "next/link";

export default async function Header() {
  const user = await getSession();

  return (
    <header>
      {/* <h1>USERS</h1> */}
      <ul className="d-flex gap-1 list-unstyled">
        {user ? (
          <>
            <li>
              <div className="avatar-container">
                <img
                  src={`http://localhost/laravel/back-end/storage/app/public/users/${user.image}`}
                  className="avatar-image"
                />
              </div>
            </li>
            <li style={{ fontSize: "25px" ,marginTop: "10px"}}>Xin chào {user.name}
              <a href="/auth/logout" style={{ fontSize: "15px" ,marginTop: "10px", marginLeft: "10px"}}>Đăng xuất</a>
            </li>
            </>
        ) : (
          <>
            
          </>
        )}
      </ul>
    </header>
  );
}
