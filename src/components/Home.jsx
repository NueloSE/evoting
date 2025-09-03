import Contact from "./Contact";
import Hero from "./Hero";
import Ready from "./Ready";
import Reason from "./Features";
import Work from "./Work";
import Header from "./header";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Reason />
      <Work />
      <Contact />
      <Ready />
      <Footer />
    </div>
  );
}

export default Home;
