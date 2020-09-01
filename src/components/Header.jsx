import React from "react"
import logo from "../images/logo.png"

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#394259",
        boxShadow: "0px 0px 3px #222",
        top: 0,
        height: "fit-content",
        position: "fixed",
        width: "100vw",
      }}
    >
      <img
        src={logo}
        alt="Learn2Esport logo"
        height="30 px"
        style={{ margin: "15px 0 10px 300px" }}
      />
    </div>
  )
}

export default Header
