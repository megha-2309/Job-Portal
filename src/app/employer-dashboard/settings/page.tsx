import EmployerSettingsForm from "@/src/features/employers/components/employer-setting-form";
import { organizationTypes } from "@/src/features/employers/employer.schema";
import { getCurrentEmployerDetails } from "@/src/features/server/employers.queries";
import { redirect } from "next/navigation";

const EmployerSettings = async () => {
  const employer = await getCurrentEmployerDetails();

  if (!employer) return redirect("/login");

  console.log("currentEmployer: ", employer);
  return (
    <div>
      <EmployerSettingsForm
        initialData={{
          name: employer.employerDetails.name,
          description: employer.employerDetails.description,
          organizationType: employer.employerDetails.organizationType,
          teamSize: employer.employerDetails.teamSize,
          location: employer.employerDetails.location,
          websiteUrl: employer.employerDetails.websiteUrl,
          yearOfEstablishment:
            employer.employerDetails.yearOfEstablishment?.toString(),
        }}
      />
    </div>
  );
};

export default EmployerSettings;
