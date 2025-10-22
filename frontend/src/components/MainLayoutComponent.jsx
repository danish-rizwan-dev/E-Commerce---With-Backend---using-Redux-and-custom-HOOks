import { Navbar } from "./navbar.jsx";
export function MainLayoutComponent({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
