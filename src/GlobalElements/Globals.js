import React from 'react';
import { Link } from 'react-router-dom';
import './Globals.css'

class Globals extends React.Component {
    render() {
        return (
            <BackToHome/>
        );
    }
}

class BackToHome extends React.Component {
    render() {
        return (
            <div id="parent" className="Home">
                <div id="wrap">
                <Link to='/'><p>Home</p></Link>
                </div>
                <div id="title">
                <p>Water Wars</p>
                </div>
            </div>
        );
    }
}

export default Globals;