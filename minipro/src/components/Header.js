import React from "react";
import Search from "./Search";
import "./Header.css"
const Header = () => {
  return (
    <div className="search-header">
      {/* <h1 className="display-4">Search Books</h1> */}
      <h2 className="lead" style={{marginTop:25,color:"smokywhite"}} >SEARCH FOR BOOK TITLE HERE</h2>
      <Search />
    </div>
  );
};

export default Header;
