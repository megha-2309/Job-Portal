import { getCurrentUser } from "@/src/features/auth/server/auth.queries";
import EmployerSidebar from "@/src/features/employers/components/employer-sidebar";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

 
  if (!user) {
    redirect("/login");
  }

  if (user.role !== "employer") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <EmployerSidebar />

      <main className="container mx-auto mt-5 ml-70 mr-5">
        {children}
      </main>
    </div>
  );
}