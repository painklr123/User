"use client";
import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { debounce } from "@/utils/utils";
import Link from "next/link";

export default function UserList({ users }) {
  const [usersData, setUsers] = useState({
    data: [],
  });
  const getUsers = async (q) => {
    const response = await fetch(`${process.env.SERVER_API}/users?q=${q}`);
    const { data: users } = await response.json();
    setUsers(users);
  };
  const removeUser = async (id) => {
    const response = await fetch(`${process.env.SERVER_API}/users/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  };
  const handleSearch = debounce((e) => {
    getUsers(e.target.value);
  });
  const handleRemoveUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn?")) {
      const status = await removeUser(id);
      if (status) {
        getUsers("");
      }
    }
  };
  useEffect(() => {
    setUsers(users);
  }, []);
  return (
    <>
      <SearchForm onChange={handleSearch} />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center" width="5%">STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th className="text-center" width="5%">Xem</th>
            <th className="text-center" width="5%">Sửa</th>
            <th className="text-center" width="5%">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {usersData.data.map((user, index) => (
            <tr key={user.id}>
              <td className="text-center">{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link   
                  href={`/users/view/${user.id}`}
                  className="btn btn-primary btn-sm text-white"
                  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
                > 
                  Xem
                </Link>
              </td>
              <td>
                <Link
                  href={`/users/edit/${user.id}`}
                  className="btn btn-warning btn-sm text-white"
                  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
                >
                  Sửa
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm text-white"
                  onClick={() => handleRemoveUser(user.id)}
                  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}