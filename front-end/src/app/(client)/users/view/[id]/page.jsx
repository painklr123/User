import Form from "./Form";
import { notFound } from 'next/navigation';

export const metadata = {
    title: "Thông tin người dùng",
};
const getUser = async (id) => {
  const response = await fetch(`${process.env.SERVER_API}/users/${id}`);
  const {data: user} = await response.json();
  return user;
}
export default async function ViewUserPage({params}) {
  const {id} = params;
  const user = await getUser(id);
  if(!user){
    return notFound();
  }
  return (
    <div>
      <h1>Thông tin người dùng</h1>
      <Form user={user} id={id}/>
    </div>
  );
}
