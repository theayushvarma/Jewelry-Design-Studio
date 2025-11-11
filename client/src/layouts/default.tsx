import SelectionNavBar from "@/components/SelectionNavBar";
import { Link } from "react-router-dom";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen no-scrollbar">
      <SelectionNavBar />
      <main className="container mx-auto max-w-7xl p-6 flex-grow ">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          className="flex items-center gap-1 text-current"
          to="/#"
          title="Jewelry Design Studio"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Jewelry Design Studio</p>
        </Link>
      </footer>
    </div>
  );
}
