import "./App.css";
import HeroSection from "./components/hero";
import HowItWorks from "./components/howitworks";
import Navbar from "./components/navbar";
import { UiToaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <UiToaster />
    </>
  );
}

export default App;
