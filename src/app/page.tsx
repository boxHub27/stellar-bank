import AboutUs from "./components/AboutUs";
import Apply from "./components/Apply";
import ContactHeader from "./components/ContactHeader";
import Footer from "./components/Footer";
import AboutUsPage from "./components/FullAboutUsPage";
import Heror from "./components/Heror";
import NavHolder from "./components/NavHolder";
import Partners from "./components/Partners";
import ServicesCard from "./components/ServicesCard";
import SignUpForNewsLetter from "./components/SignUpForNewsLetter";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <main className="flex w-screen flex-col items-center justify-center ">
      <NavHolder />
      <Heror />
      <ServicesCard />
      <AboutUs />
      <Apply />
      <Partners />
      <Testimonial />
      <SignUpForNewsLetter />
      <div id="contact-us">
        <ContactHeader />
      </div>
      <Footer />
    </main>
  );
}
