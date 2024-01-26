import { ReactNode } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h3>hello world</h3>
      <div>{children}</div>
    </>
  );
};

export default Layout;
