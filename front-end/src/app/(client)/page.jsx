import Link from "next/link";

export default function HomePage() {
  return(
    <div>
      <h1>Trang chủ</h1>
      <Link href="/users" className="btn btn-primary btn-sm">
        Quản lý người dùng
      </Link>
    </div>
  );
}
