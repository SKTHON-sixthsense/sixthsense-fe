"use client";

import AiSection from "./AiSection";
import Content from "./Content";
import FilterBar from "./FilterBar";
import { privateAPI } from "@/shared/api/apiInstance";
import { useEffect, useState } from "react";

import Logo from "@/assets/icon/Logo.svg";

interface Employ {
  id: number;
  postName: string;
  companyName: string;
  s3Url: string;
  status: string;
  workLocation: string;
  salary: string;
  workDays: string;
  workHours: string;
  jobCategory: string;
  detailJobCategory: string[];
  employmentType: string;
  benefits: string;
  educationRequirement: string;
  preferredQualifications: string;
  homepageUrl: string;
  callNum: string;
}

export default function HomePage() {
  const [employs, setEmploys] = useState<Employ[]>([]);
  const [loading, setLoading] = useState(true);
  const location = "서울시 성북구";
  const jobs: string[] = [];

  useEffect(() => {
    const fetchEmploys = async () => {
      try {
        setLoading(true);
        const res = await privateAPI.get("/api/search/results", {});
        console.log(res);

        if (res.data.success) {
          setEmploys(res.data.data);
        } else {
          console.warn("[API 응답 실패]", res.data);
          setEmploys([]);
        }
      } catch (error) {
        console.error(error);
        setEmploys([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmploys();
  }, []);

  return (
    <main className="bg-[#9861A6]">
      <header className="w-full bg-white p-[16px]">
        <Logo />
      </header>
      <AiSection />
      <FilterBar location={location} jobs={jobs} />
      <Content employs={employs} loading={loading} />
    </main>
  );
}
