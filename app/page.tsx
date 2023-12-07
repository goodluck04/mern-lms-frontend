"use client"
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
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
      />
      
    </div>
  )
}

export default Page;