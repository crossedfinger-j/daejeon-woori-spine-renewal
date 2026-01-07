import {
  HeroSection,
  QuickBookingCTA,
  CenterShowcase,
  DoctorHighlight,
  LocationPreview,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickBookingCTA />
      <CenterShowcase />
      <DoctorHighlight />
      <LocationPreview />
    </>
  );
}
