"use client"
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const CourseSearch = dynamic(() => import("./Suspense"), {
  ssr: false,
});

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading Search Page...</div>}>
      <CourseSearch />
    </Suspense>
  );
}
