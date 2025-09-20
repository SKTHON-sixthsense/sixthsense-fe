import AiSection from "./AiSection";
import Content from "./Content";
import FilterBar from "./FilterBar";

import Logo from "@/assets/icon/Logo.svg";

export default function HomePage() {
  const location = "서울시 성북구";
  const jobs = ["직업1", "직업2"];

  return (
    <main className="bg-[#9861A6]">
      <header className="w-full bg-white p-[16px]">
        <Logo />
      </header>
      <AiSection />
      <FilterBar location={location} jobs={jobs} />
      <Content />
    </main>
  );
}
