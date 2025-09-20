"use client";

import BottomButton from "@/shared/components/BottomButton";

export default function Onboarding() {
  return (
    <main>
      Onboarding
      <BottomButton
        text="test"
        stickToBottom={true}
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />
    </main>
  );
}
