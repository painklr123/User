import Header from "./_components/Header";

export default function ClientLayout({children}) {
  return (
  <div className="container py-3">
    <Header />
    <main>{children}</main>
  </div>
  );
}