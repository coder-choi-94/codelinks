import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class RedirectPage extends Component {
    render() {
        return (
            <div>
                <Redirect to={"/main"}/>                
            </div>
        );
    }
}

export default RedirectPage;