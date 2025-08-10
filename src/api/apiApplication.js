import supabase, { supabaseUrl } from "@/utils/supabase";

// - Apply to job (candidate)
export async function applyToJob(_, jobData) {
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  // Upload resume file
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) throw new Error("Error uploading Resume");

  // Construct public URL for the resume
  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // Insert application data with resume url
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }

  return data;
}
// - Edit Application Status (recruiter)
export async function updateApplicationStatus({ job_id }, status) {
  console.log("updateApplicationStatus called with:", { job_id, status });

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}

// - Get applications for candidate
export async function getApplications({ user_id }) {
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}
