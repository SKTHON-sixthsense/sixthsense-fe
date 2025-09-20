"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { internalAPI } from "../api/apiInstance";

interface RouteItem {
  route: string;
  delay: number;
}

interface AIAssistantResponse {
  transcription: string;
  intent: string;
  routingQueue: RouteItem[];
}

export const AIAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [routingQueue, setRoutingQueue] = useState<RouteItem[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const routingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (routingTimeoutRef.current) {
        clearTimeout(routingTimeoutRef.current);
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await processAudio(audioBlob);

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("마이크 접근 권한이 필요합니다.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  }, [isRecording]);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop all tracks to release microphone
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
    }
    setIsRecording(false);
    setIsProcessing(false);

    // Clear any pending routing
    if (routingTimeoutRef.current) {
      clearTimeout(routingTimeoutRef.current);
      routingTimeoutRef.current = null;
    }
    setRoutingQueue([]);
    setIsNavigating(false);
  }, [isRecording]);

  const processRoutingQueue = useCallback(
    (queue: RouteItem[]) => {
      if (queue.length === 0) {
        setIsNavigating(false);
        return;
      }

      setIsNavigating(true);
      setRoutingQueue([...queue]);

      const executeRoute = (remainingRoutes: RouteItem[]) => {
        if (remainingRoutes.length === 0) {
          setIsNavigating(false);
          setRoutingQueue([]);
          return;
        }

        const [currentRoute, ...nextRoutes] = remainingRoutes;

        console.log(`🚀 Navigating to: ${currentRoute.route} (delay: ${currentRoute.delay}ms)`);

        routingTimeoutRef.current = setTimeout(() => {
          // Handle special navigation commands
          if (currentRoute.route === "BACK") {
            router.back();
          } else if (currentRoute.route === "FORWARD") {
            router.forward();
          } else {
            // Regular route navigation
            router.push(currentRoute.route);
          }

          setRoutingQueue(nextRoutes);

          // Continue with next route
          if (nextRoutes.length > 0) {
            executeRoute(nextRoutes);
          } else {
            setIsNavigating(false);
            setRoutingQueue([]);
          }
        }, currentRoute.delay);
      };

      executeRoute(queue);
    },
    [router]
  );

  const processAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await internalAPI.post("/ai/assist", formData);

      if (response.status !== 200) {
        throw new Error("Failed to process audio");
      }

      const result: AIAssistantResponse = await response.data;

      // Process routing queue
      if (result.routingQueue && result.routingQueue.length > 0) {
        console.log("🎯 Processing routing queue:", result.routingQueue);
        processRoutingQueue(result.routingQueue);
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("음성 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <>
      {/* Floating Button - Only show when not recording, not processing, and not navigating */}
      <AnimatePresence>
        {!isRecording && !isProcessing && !isNavigating && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.3,
            }}
            onClick={handleToggleRecording}
            className="fixed right-6 bottom-6 z-[1000] h-16 w-16 rounded-full bg-blue-500 shadow-lg transition-colors duration-300 hover:bg-blue-600"
          >
            <div className="flex items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Recording Interface */}
      <AnimatePresence>
        {(isRecording || isProcessing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000]"
          >
            {/* Backdrop - Click to cancel */}
            <div
              className="absolute inset-0 cursor-pointer bg-black/50"
              onClick={cancelRecording}
            />

            {/* Gradient Background */}
            <motion.div
              initial={{
                background:
                  "linear-gradient(180deg, rgba(180, 94, 201, 0.00) 100%, rgba(180, 94, 201, 0.00) 100%)",
              }}
              animate={{
                background:
                  "linear-gradient(180deg, rgba(180, 94, 201, 0.00) 50.48%, #B45EC9 100%)",
              }}
              exit={{
                background:
                  "linear-gradient(180deg, rgba(180, 94, 201, 0.00) 100%, rgba(180, 94, 201, 0.00) 100%)",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            />

            <div className="absolute inset-0 bottom-0 z-10 flex flex-col items-center justify-end pb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-8 px-4 text-center text-[24px] font-[600] text-white"
              >
                필요한 기능을 말씀해주세요
              </motion.p>

              {/* Mic/Stop Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                onClick={handleToggleRecording}
                disabled={isProcessing}
                className={`h-20 w-20 rounded-full shadow-xl transition-all duration-300 ${
                  isProcessing
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-white hover:bg-gray-50 active:scale-95"
                }`}
              >
                <div className="flex items-center justify-center">
                  {isProcessing ? (
                    <div className="h-8 w-8 animate-spin rounded-full border-3 border-purple-500 border-t-transparent"></div>
                  ) : isRecording ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-6 w-6 rounded-sm bg-red-500"
                    />
                  ) : (
                    <svg
                      className="h-8 w-8 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  )}
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Progress Indicator */}
      <AnimatePresence>
        {isNavigating && routingQueue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-[1000] rounded-lg bg-white p-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <div className="text-sm">
                <p className="font-semibold text-gray-800">페이지 이동 중...</p>
                <p className="text-gray-600">
                  {routingQueue.length > 0 &&
                    `다음: ${
                      routingQueue[0].route === "BACK"
                        ? "뒤로 가기"
                        : routingQueue[0].route === "FORWARD"
                          ? "앞으로 가기"
                          : routingQueue[0].route
                    }`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
