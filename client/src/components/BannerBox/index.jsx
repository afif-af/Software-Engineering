import React from 'react';
import {Link} from "react-router-dom";


const BannerBox = ({ img, link }) => {
    return (
        <div className="w-full h-full overflow-hidden rounded-lg group">
            <Link to={link}>
                <img
                    src={img}
                    alt="banner"
                    className="w-full h-full transition-all group-hover:scale-105"
                />
            </Link>
        </div>
    );
};

export default BannerBox;
