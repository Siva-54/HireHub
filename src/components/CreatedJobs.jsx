import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useAuth } from ".././contexts/AuthContext";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user } = useAuth();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.uid,
  });

  useEffect(() => {
    if (user?.uid){
      fnCreatedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobAction={fnCreatedJobs}
                  isMyJob
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;