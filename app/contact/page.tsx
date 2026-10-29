import type { Metadata } from "next";
import ContactForm from "@/components/home/ContactForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <div className="px-5 pb-24 pt-36 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="font-fraunces text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1] tracking-[-0.03em]">Tell me what you are making.</h1>
            <p className="mt-6 max-w-sm leading-relaxed text-home-mute">A few lines about the product and the deadline is enough. Replies usually arrive within two working days.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
