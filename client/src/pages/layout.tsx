import { Navbar } from "@/components/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
