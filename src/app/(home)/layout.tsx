"use client";

import BottomNavigation from "@/shared/components/BottomNavigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    if (onboardingComplete === "true") {
      setIsOnboardingComplete(true);
    } else {
      setIsOnboardingComplete(false);
    }
  }, [router]);

  if (isOnboardingComplete !== true) {
    return <SplashScreen />;
  }

  return children;
}
