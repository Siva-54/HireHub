import supabase, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies() {
  console.log("Fetching companies from supabase...");
  console.log("Using Supabase client:", supabase);
  const { data, error } = await supabase.from("companies").select("*");
  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }
  return data;
}

export async function addNewCompany(_, companyData) {
  // Generate a unique filename for the logo upload 
  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const file = companyData.logo;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    console.error(storageError);
    throw new Error("Error uploading Company Logo");
  }

  // Construct public URL to the uploaded logo
  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  // Insert company data with logo URL into 'companies' table
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url: logo_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Company");
  }

  return data;
}
