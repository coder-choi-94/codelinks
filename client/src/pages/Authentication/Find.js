import React, { Component } from 'react';
import axios from 'axios';

class Find extends Component {

    handleCall = () => {
        axios.get('/api/call')
                .then((resData) => {
                    console.log(resData);
                })
                .catch((err) => {

                })
    }
    render() {
        const {handleCall} = this;
        return (
            <div>
                <button onClick={handleCall}>전화걸기</button>
            </div>
        );
    }
}

export default Find;