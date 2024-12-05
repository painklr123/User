import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LogoutPage() {
  await fetch(`${process.env.SERVER_API}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });
  return redirect(`${process.env.APP_URL}/auth/login`);
}