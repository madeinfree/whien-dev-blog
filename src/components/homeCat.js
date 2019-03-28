import React from "react"
import { withPrefix } from "gatsby"

export default function HomeCat() {
  return (
    <>
      <h3>{`My Home Cat 🐱`}</h3>
      <img
        style={{ borderRadius: 3 }}
        src={withPrefix("/img/tata.jpg")}
        alt="tata-mycat"
      />
    </>
  )
}
