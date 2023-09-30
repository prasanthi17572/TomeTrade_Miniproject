// import React from "react";
// import { Icon } from "semantic-ui-react";

// const About = () => {
//   const containerStyle = {
//     textAlign: "center", 
//     backgroundColor: "#f5f5f5",
//     padding: "100px",
//     borderRadius: "10px",
//     boxShadow: "10px 10px 10px rgba(0.2, 0, 0, 0.2)",
    
//   };
//   const socialIconsStyle={
//     marginTop:"120px",
//     paddingleft:"100px"
//   }

//   const headerStyle = {
//     color: "#007bff", // Blue color
//     fontSize: "24px",
//   };

//   const paragraphStyle = {
//     color: "#333", // Dark gray color
//     fontSize: "16px",
//     lineHeight: "1.5",
//     marginLeft: "280px",
//     marginRight: "280px",
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headerStyle}>Welcome to TomeTrade</h2>
//       <p style={paragraphStyle}>
//         This project aims to develop an e-bookstore where books can be bought
//         from the comfort of home through the internet. This online bookstore is
//         a virtual store on the internet where customers can browse the catalog
//         and select the books of interest and can read books online and can also
//         place an order. The customer can also upload books if he/she wants to
//         sell books by contacting the owner of the website.
//       </p>
//       <div style={socialIconsStyle}>
//       <Icon name="linkedin" size="big" link onClick={() => window.open("https://www.linkedin.com/")}/>
//         <Icon name="twitter" size="big" link onClick={() => window.open("https://twitter.com/")}/>
//         <Icon name="facebook" size="big" link onClick={() => window.open("https://www.facebook.com/")}/>
//         <Icon name="instagram" size="big" link onClick={() => window.open("https://www.instagram.com/")}/>
//       </div>
//     </div>
//   );
// };

// export default About;
import React, { useState } from "react";
import { Icon } from "semantic-ui-react";

const About = () => {
  const [showText, setShowText] = useState(false);

  const containerStyle = {
    marginLeft:150,
    marginRight:150,
    marginTop:100,
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    padding: "50px",
    borderRadius: "10px",
    boxShadow: "10px 10px 10px rgba(0.2, 0, 0, 0.2)",
    overflow: "hidden",
  };

  const socialIconsStyle = {
    marginTop: "100px",
    paddingLeft: "80px", // Corrected property name
  };

  const headerStyle = {
    color: "#007bff",
    fontSize: "24px",
  };

  const paragraphStyle = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "1.5",
    marginLeft: showText ? "0" : "100px",
    marginRight: "180px",
    transition: "margin-left 0.5s ease-in-out",
  };

  const handleIconClick = () => {
    setShowText(true);
  };

  return (
    <div style={containerStyle} >
      <h2 style={headerStyle}>Welcome to TomeTrade</h2>
      <p style={paragraphStyle}>
        This project aims to develop an e-bookstore where books can be bought
        from the comfort of home through the internet. This online bookstore is
        a virtual store on the internet where customers can browse the catalog
        and select the books of interest and can read books online and can also
        place an order. The customer can also upload books if he/she wants to
        sell books by contacting the owner of the website.
      </p>
      <div style={socialIconsStyle}>
        <Icon
          name="linkedin"
          size="big"
          link
          onClick={() => {
            window.open("https://www.linkedin.com/");
            handleIconClick();
          }}
        />
        <Icon
          name="twitter"
          size="big"
          link
          onClick={() => {
            window.open("https://twitter.com/");
            handleIconClick();
          }}
        />
        <Icon
          name="facebook"
          size="big"
          link
          onClick={() => {
            window.open("https://www.facebook.com/");
            handleIconClick();
          }}
        />
        <Icon
          name="instagram"
          size="big"
          link
          onClick={() => {
            window.open("https://www.instagram.com/");
            handleIconClick();
          }}
        />
      </div>
    </div>
  );
};

export default About;
