import supabase from "@/utils/supabase";

export async function getJobs({ location, company_id, searchQuery }) {
  let query = supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }
  return data;
}

export async function getSavedJobs() {
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job: jobs(*, company: companies(name, logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  // Remove duplicates based on job_id
  const uniqueJobsMap = new Map();
  data.forEach((savedJob) => {
    if (!uniqueJobsMap.has(savedJob.job_id)) {
      uniqueJobsMap.set(savedJob.job_id, savedJob);
    }
  });

  return Array.from(uniqueJobsMap.values());
}


export async function getSingleJob({ job_id }) {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company: companies(name, logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

export async function saveJob({ alreadySaved }, saveData) {
  if (alreadySaved) {
    // Remove saved job
    const { data, error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (error) {
      console.error("Error removing saved job:", error);
    }
    return data;
  } else {
    // Add saved job
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (error) {
      console.error("Error saving job:", error);
    }
    return data;
  }
}

export async function updateHiringStatus({ job_id }, isOpen) {
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
}

export async function getMyJobs({ recruiter_id }) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*, company: companies(name, logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
}

export async function deleteJob({ job_id }) {
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error deleting job:", error);
  }
  return data;
}

export async function addNewJob(_, jobData) {
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
}
