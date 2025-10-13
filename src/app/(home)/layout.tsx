"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import useLocalStorage from "@/shared/hooks/useLocalStorage";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [onboardingComplete] = useLocalStorage<string | boolean>("onboardingComplete");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for localStorage to be read
    if (onboardingComplete !== null) {
      setIsReady(true);
    }
  }, [onboardingComplete]);

  // Show loading state while checking localStorage
  if (!isReady) {
    return <SplashScreen />;
  }

  // If onboarding is not complete, show splash screen with redirect logic
  // Check for both boolean true and string "true" due to JSON.parse behavior
  if (onboardingComplete !== "true" && onboardingComplete !== true) {
    return <SplashScreen />;
  }

  return children;
}
