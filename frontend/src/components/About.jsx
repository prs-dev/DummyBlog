import React from 'react'

const About = () => {

    const about = {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "20px"
    }

  return (
    <div style={about}>
        <h1>About</h1>
        <p>This is the test assignment given by websultanate software company.</p>
        <h3>Made By: Pratyush Srivastava</h3>
        <p>Contact Number: 9696362131</p>
        <p>Email: pratyushsri.25@gmail.com</p>
    </div>
  )
}

export default About