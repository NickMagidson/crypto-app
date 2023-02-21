import React from "react";
import { Spin } from 'antd';

const Loader = () => {
    return(
        <div className="loader">
        <h1>We're experiencing issues with our news API.</h1>
        <h3>Please check back later :)</h3>
            <Spin />
        </div>
    )
}

export default Loader;