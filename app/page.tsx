"use client"
import React, { FC } from "react";
import Heading from "./utils/Heading";

interface Props { }

const Page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="LMS Home"
        description="E learning platform for student to learn and get help from teachers"
        keywords="Programmin,Redux,ML,"
      />
    </div>
  )
}

export default Page;