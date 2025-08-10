

# HireHub

A modern full-stack job portal application built with **React**, **Supabase**, and **Firebase Authentication**. HireHub lets recruiters post job listings, and job seekers explore, save, and manage opportunities with ease.

---

##  Features

 User Authentication with Firebase  
 Real-time Supabase database integration  
 Secure Role-Based Access via Row Level Security (RLS)  
 Upload and serve company logos via Supabase Storage  
 Fully responsive, clean UI with Tailwind CSS  
 State management via React hooks  

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS  
- **Backend:** Supabase (PostgreSQL, RLS, Storage)  
- **Auth:** Firebase Authentication  
- **Icons & UI:** Lucide React, React Spinners  
- **State Handling:** React Hooks  

---

## Installation & Setup

1️⃣ Clone the repository:
```bash
git clone https://github.com/Siva-54/HireHub.git
cd hirehub
```

2️⃣ Install dependencies:
```bash
npm install
```

3️⃣ Configure environment variables:
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

4️⃣ Run the development server:
```bash
npm run dev
```