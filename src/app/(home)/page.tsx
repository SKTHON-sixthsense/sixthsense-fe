import Content from "./Content";
import Header from "./Header";

export default function HomePage() {
  const location = "서울시 강남구";
  const jobs = ["직업1", "직업2"];

  return (
    <main className="bg-[#F4F4FB]">
      <Header location={location} jobs={jobs} />
      <Content />
    </main>
  );
}
