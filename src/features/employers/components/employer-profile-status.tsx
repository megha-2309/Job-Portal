import { Button } from "@/src/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/src/components/ui/item";
import { ShieldAlertIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentEmployerDetails } from "../../server/employers.queries";

export async function EmployerProfileCompletionStatus() {
    const currentEmployer = await getCurrentEmployerDetails();

    if(!currentEmployer) return redirect("/login")

        if(currentEmployer.isProfileCompleted) return null;
  return (
    <div className="flex flex-col gap-6">
      <Item className="border-destructive bg-destructive/10">
        <ItemMedia
          variant="icon"
          className="bg-destructive "
        >
          <ShieldAlertIcon />
        </ItemMedia>

        <ItemContent>
          <ItemTitle>Incomplete Profile</ItemTitle>

          <ItemDescription className="text-muted-foreground">
            You haven't completed your employer profile yet. Please complete
            your profile to post jobs and access all features.
          </ItemDescription>
        </ItemContent>

       <ItemActions>
  <Link href="/employer-dashboard/settings">
    <Button size="sm" variant="destructive">
      Complete Profile
    </Button>
  </Link>
</ItemActions>
      </Item>
    </div>
  );
}



// import { Button } from "@/src/components/ui/button";
// import {
//   Item,
//   ItemActions,
//   ItemContent,
//   ItemDescription,
//   ItemMedia,
//   ItemTitle,
// } from "@/src/components/ui/item";
// import { ShieldAlertIcon } from "lucide-react";
// import Link from "next/link";

// export async function EmployerProfileCompletionStatus() {
//   return (
//     <div className="flex flex-col gap-6">
//       <Item className="border border-orange-200 bg-orange-50">
//         <ItemMedia
//           variant="icon"
//           className="bg-orange-100 text-orange-600"
//         >
//           <ShieldAlertIcon />
//         </ItemMedia>

//         <ItemContent>
//           <ItemTitle className="text-foreground">
//             Incomplete Profile
//           </ItemTitle>

//           <ItemDescription className="text-muted-foreground">
//             You haven't completed your employer profile yet. Please complete
//             your profile to post jobs and access all features.
//           </ItemDescription>
//         </ItemContent>

//         <ItemActions>
//           <Button size="sm" variant="destructive" asChild>
//             <Link href="/employer-dashboard/settings">
//               Complete Profile
//             </Link>
//           </Button>
//         </ItemActions>
//       </Item>
//     </div>
//   );
// }