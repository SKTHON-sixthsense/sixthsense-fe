import BottomNavigation from "@/shared/components/BottomNavigation";
import Header from "@/shared/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <BottomNavigation />
    </>
  );
}
