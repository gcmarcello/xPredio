"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tsr } from "@/shared/router/tsr";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <tsr.ReactQueryProvider>{children}</tsr.ReactQueryProvider>
    </QueryClientProvider>
  );
}
