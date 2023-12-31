"use client"
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";


interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      {/* metadata */}
      <Heading
        title="LMS Home"
        description="E learning platform for student to learn and get help from teachers"
        keywords="Programmin,Redux,ML,"
      />
      {/* Header */}
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      {/* HERO INCOMPLETE */}
      <Hero />
      <Courses />
      <Reviews />
    </div>
  )
}

export default Page;