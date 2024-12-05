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
                  src="https://i.imgur.com/gYO8m35.jpeg"
                  width={60} // Kích thước tùy chỉnh
                  height={40} 
                  className="avatar-image"
                />
              </div>
            </li>
            <li style={{ fontSize: "25px" ,marginTop: "20px"}}>Xin chào {user.name}
              <a href="/auth/logout" style={{ fontSize: "15px" ,marginTop: "20px", marginLeft: "10px"}}>Đăng xuất</a>
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
