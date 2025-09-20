import SplashLogo from "@/assets/icon/SplashLogo.svg";
import BottomButton from "@/shared/components/BottomButton";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-1"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(155, 126, 180, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 200, 116, 0.4), transparent 60%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center"
      >
        <SplashLogo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute right-0 bottom-0 left-0 z-10 p-[16px] pt-0"
      >
        <BottomButton
          onClick={async () => {
            router.push("/onboarding");
          }}
        >
          시작하기
        </BottomButton>
      </motion.div>
    </main>
  );
}
