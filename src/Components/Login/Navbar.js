import { Link } from "react-router-dom";

import React from 'react';

function Navbar(props){
    //const [user,setUser] = useState(localStorage.getItem('user'))

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        props.setLoggedIn(false)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <Link to="/" className="navbar-brand">Spoopify</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {props.loggedIn  !== false ?
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/songs" className="nav-link">Songs</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movies" className="nav-link">Movies</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/books" className="nav-link">Books</Link>
                    </li>
                </ul>
                : <div className="navbar-nav mr-auto"></div>}
                <div className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav">
                        {props.loggedIn  !== false ?
                        <li className="nav-item">
                            <button type="button" className="btn btn-link nav-link" onClick={handleLogout}>Log out</button>
                        </li>
                        :
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" >Login</Link>
                        </li>
                        }
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;