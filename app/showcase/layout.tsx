import BackToShowcase from "@/components/layout/BackToShowcase";

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackToShowcase />
      {children}
    </>
  );
}
