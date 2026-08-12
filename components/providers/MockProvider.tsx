"use client";

import { useEffect, useState } from "react";

type MockProviderProps = {
  children: React.ReactNode;
};

let mockingPromise: Promise<void> | null = null;

export function MockProvider({ children }: MockProviderProps) {
  const [isReady, setIsReady] = useState(
    process.env.NODE_ENV === "production",
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    async function enableMocking() {
      if (!mockingPromise) {
        mockingPromise = import("@/mocks/browser").then(
          async ({ worker }) => {
            await worker.start({
              onUnhandledRequest: "bypass",
            });
          },
        );
      }

      await mockingPromise;

      setIsReady(true);
    }

    enableMocking();
  }, []);

  if (!isReady) {
    return null;
  }

  return children;
}