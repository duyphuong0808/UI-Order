import React from 'react';
import PropTypes from 'prop-types';
import './MenuImage.scss';
import menuImage from '../../../../assets/image/kw-menu-festive-(w260-x-h360)-2.jpg';

MenuItem.propTypes = {
    photoUrl: PropTypes.string,
};

MenuItem.defaultProps = {
    photoUrl: "",
};

function MenuItem(props) {

    return (
        <img src={menuImage} alt='menu-img' className='menu-item' />
    );
}

export default MenuItem;