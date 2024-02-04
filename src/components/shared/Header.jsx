import React from 'react'
import { Link } from 'react-router-dom'
import SamcoLogo from '../assest/images/samco.png'


const Header = () => {
    return(
        <nav className="header">
            <div className="container nav-link">
                <Link to={"/"} className="navbar-brand">
                    <img src={SamcoLogo} alt='samco' title='samco' />
                </Link>
                <ul className="navbar-wrapper">
                    <li className="nav-item">
                        <Link to={"/posts"} className="navbar-link active" aria-current="page">Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/products"} className="navbar-link">Products</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header