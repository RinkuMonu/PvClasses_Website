"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/main.css";
import "@/app/styles/font-awesome.css";

import HeroBanner from './HeroBanner';
import EducationSection from './EducationSection';
import CourserSection from './CourserSection';
import CallToAction from './CallToAction';
import HomeVideo from './HomeVideo';
import AchievementsSection from "./AchievementsSection";
import UpcomingEvents from "./UpcomingEvents";
import HomeNews from "./HomeNews";
import TestimonialSection from "./TestimonialSection";
import ReadyToStart from "./ReadyToStart";
export default function HomeCompoents() {



  return (
    <>
      <HeroBanner />
      <EducationSection />
      <CourserSection />
      <CallToAction />
      <HomeVideo />
      <AchievementsSection />
      <UpcomingEvents />
      <HomeNews />
      <TestimonialSection />
      <ReadyToStart />
    </>
  );
}
