import { useAuth } from ".././contexts/AuthContext";
import ApplicationCard from "./ApplicationCard";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user } = useAuth();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user?.uid,
  });

   useEffect(() => {
    if (user?.uid) {
      fnApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications;