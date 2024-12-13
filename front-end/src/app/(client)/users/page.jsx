"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import UserList from "./UserList";
import { redirect, useRouter } from 'next/navigation';

const getUsers = async (pageNumber) => {
  const response = await fetch(`${process.env.SERVER_API}/users?page=${pageNumber}`);
  return response.json();
};

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Initialize the page to 1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null); // State for next page URL

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { success, data} = await getUsers(page);
        if (success) {
          setUsers(data);
          setNextPageUrl(data.next_page_url);
        } else {
          setError("Không thể tải được người dùng");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu");
      }
      setLoading(false);
    };

    fetchUsers();
  }, [page]); // This effect runs every time the page number changes

  if (loading) return <h2>Đang tải...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1 className="heading">Quản lý người dùng</h1>
      <Link href="/users/create" className="btn btn-primary mb-3 btn_margin">
        Thêm mới
      </Link>
      <button className="btn btn-secondary mb-3 btn_margin" onClick={() => redirect(`${process.env.APP_URL}`)}>
        Trang chủ
      </button>
      <UserList users={users} />
      <div className="pagination center">
        <button
          className="btn btn-secondary btn-sm"
          style={{display: 'flex',  justifyContent:'center', alignItems:'center', width:'50px'}}
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Trước
        </button>
        <span className="page-counter" >Trang {page}</span>
        <button 
          className="btn btn-secondary btn-sm"
          style={{display: 'flex',  justifyContent:'center', alignItems:'center', width:'50px'}}
          onClick={() => setPage(prevPage => prevPage + 1)}
          disabled={!nextPageUrl}
        >
          Sau
        </button>
      </div>
    </div>
  );
}
