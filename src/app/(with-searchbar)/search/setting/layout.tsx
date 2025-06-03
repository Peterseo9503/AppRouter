import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      setting Layout
      <div>{children}</div>
    </>
  );
}
