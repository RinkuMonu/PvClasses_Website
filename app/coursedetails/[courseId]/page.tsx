// app/coursedetails/[courseId]/page.tsx

"use client";  // Ensures this component is treated as a Client Component

import { useRouter } from 'next/navigation';  // Import from next/navigation
import CourseIntroSection from './CourseIntroSection';

export default function Page() {
  const router = useRouter();
  const { courseId } = router.query;

  if (!courseId) {
    return <p>Loading...</p>;
  }

  return <CourseIntroSection courseId={courseId as string} />;
}
