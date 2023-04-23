import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div style={{ margin: 8 }}>{children}</div>
    </main>
  );
}
