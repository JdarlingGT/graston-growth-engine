"use client";

import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to Graston Provider Directory—your trusted source for finding certified Graston Technique® practitioners.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          To connect patients with qualified Graston Technique® providers through a user-friendly, reliable, and comprehensive directory.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Our dedicated team of developers, designers, and healthcare experts works together to maintain and enhance this platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our History</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Founded in 2020, the Graston Provider Directory has grown into an essential tool for patients and providers worldwide.
        </p>
      </section>
    </div>
  );
};

export default About;