
import { logoutUserAction } from "@/src/features/auth/server/auth.actions";
import { getCurrentUser } from "@/src/features/auth/server/auth.queries";
import { EmployerProfileCompletionStatus } from "@/src/features/employers/components/employer-profile-status";
import { StatsCards } from "@/src/features/employers/components/employer-stats";
import { redirect } from "next/navigation";
import React from "react";

const EmployerDashboard = async () => {
        const user = await getCurrentUser();
         console.log("user data employer: " , user)

         if(!user) return redirect("/login");

  return (
    <div className="space-y-6">
      <h1 className =" text-2xl font-semibold text-foreground">Hello, <span className="capitalize">{user?.name.toLowerCase()}</span></h1>
      <p className="text-muted-foreground">
        Here is your daily activities and applications
      </p>
      <StatsCards/>

      <EmployerProfileCompletionStatus/>
    </div>

  );
};

export default EmployerDashboard;



// import { getCurrentUser } from "@/src/features/auth/server/auth.queries";
// import { EmployerProfileCompletionStatus } from "@/src/features/employers/components/employer-profile-status";
// import { StatsCards } from "@/src/features/employers/components/employer-stats";

// import { db } from "@/src/config/db";
// import { employers } from "@/src/drizzle/schema";
// import { eq } from "drizzle-orm";

// import { redirect } from "next/navigation";

// const EmployerDashboard = async () => {
//   const user = await getCurrentUser();

//   if (!user) {
//     redirect("/login");
//   }

//   console.log("USER DATA:", user);

//   const employerResult = await db
//     .select()
//     .from(employers)
//     .where(eq(employers.id, user.id));

//   const employer = employerResult[0];

//   console.log("COMPLETE EMPLOYER DATA:", employer);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold text-foreground">
//         Hello,{" "}
//         <span className="capitalize">
//           {user.name.toLowerCase()}
//         </span>
//       </h1>

//       <p className="text-muted-foreground">
//         Here is your daily activities and applications
//       </p>

//       <StatsCards />

//       <EmployerProfileCompletionStatus />
//     </div>
//   );
// };

// export default EmployerDashboard;