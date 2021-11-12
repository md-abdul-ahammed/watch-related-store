import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navigation = () => {
    const { user, logout } = useAuth()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/explore">Explore</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to='/aboutUs'>About US</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/contactUs'>Contact US</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {
                            user.email ?
                                <>
                                    <Link to='/dashboard' className="nav-link">Dashboard</Link>
                                    <Link to='/login' onClick={logout} className="nav-link">Logout</Link>
                                </>
                                :
                                <>
                                    <Link to='/login' className="nav-link">Login</Link>
                                    <Link to='/register' className="nav-link">Register</Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;