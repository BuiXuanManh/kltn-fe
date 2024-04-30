import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faStar as star } from '@fortawesome/free-regular-svg-icons';
const RateHandle = ({ rate }) => {
    const stars = (rate) => {
        const fullStars = Math.floor(rate);
        const hasHalfStar = rate - fullStars >= 0.5;
        const starArray = [];

        for (let i = 0; i < fullStars; i++) {
            starArray.push(<FontAwesomeIcon icon={faStar} key={i} />);
        }

        if (hasHalfStar) {
            starArray.push(<FontAwesomeIcon icon={faStarHalfAlt} key={starArray.length} />);
        }

        const remainingStars = 5 - Math.ceil(rate);
        for (let i = 0; i < remainingStars; i++) {
            starArray.push(<FontAwesomeIcon icon={star} key={starArray.length} />);
        }

        return starArray;
    };
    const starComponents = stars(rate);
    return (
        <div className='text-yellow-500'>
            {starComponents.map((s, index) => (
                <span key={index}>{s}</span>
            ))}
            <span className='text-black ml-2'>{rate}</span>
        </div>
    );
};

export default RateHandle;