"use client";

import { useParams } from 'next/navigation';
import CourseIntroSection from './CourseIntroSection';

export default function Page() {
  const params = useParams();
  const courseId = params?.courseId;

  if (!courseId || typeof courseId !== 'string') {
    return <p>Loading...</p>;
  }

  return <CourseIntroSection courseId={courseId} />;
}
