"use client"
import dynamic from "next/dynamic";

// Dynamically load client-only component
const UserProfile = dynamic(() => import("./client"), {
  ssr: false, // disable server-side rendering
});

export default function Page() {
  return <UserProfile />;
}
