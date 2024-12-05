import './globals.css';
import "bootstrap/dist/css/bootstrap.min.css";
export const metadata = {
  title: "Quản lý",
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}