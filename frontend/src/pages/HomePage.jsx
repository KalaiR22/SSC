import React, { useRef } from "react";
import Hero from "../components/Hero";
import Service from "../components/Service";
import WhyChallenge from "../components/WhyChallenge";
import Explore from "../components/Explore";
import Footer from "../components/Footer";
import Challenges from "../components/Challenges";
import Header from "../components/Header";

export default function HomePage() {
  const challengesRef = useRef(null);

  return (
    <div className="absolute">
      <Header />
      <Hero challengesRef={challengesRef} />
      <Service />
      <div ref={challengesRef}>
        <Challenges />
      </div>
      <WhyChallenge />
      <Explore challengesRef={challengesRef} />
      <Footer />
    </div>
  );
}
