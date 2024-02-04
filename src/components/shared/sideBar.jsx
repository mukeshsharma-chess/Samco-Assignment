import React from "react";
import Header from "./Header";

const SideBar = (props) => {
    return(
        <React.Fragment>
            <Header />
            <div className="wrapper">
                <div className="sidebar">
                    <ul>
                        <li>Home</li>
                        <li>Products</li>
                        <li>About</li>
                        <li>Contect</li>
                    </ul>
                </div>
                <div className="main-container">
                    {props.children}
                </div>
            </div>
            {/* <Footer /> */}
        </React.Fragment>
        
    )
}

export default SideBar;