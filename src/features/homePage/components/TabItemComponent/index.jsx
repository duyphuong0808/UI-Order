import React from 'react';
import PropTypes from 'prop-types';
import './TabItemComponent.scss';

TabItemComponent.propTypes = {
    title: PropTypes.string,
    onItemClicked: PropTypes.func,
    isActive: PropTypes.bool,
};

TabItemComponent.defaultProps = {
    title: "",
    onItemClicked: null,
    isActive: false,
};

function TabItemComponent(props) {
    const { title, onItemClicked, isActive } = props;

    return (
        <div
            className={`tabitem tab_item_component ${isActive ? 'active nav-link' : 'tabitem--inactive'}`}
            onClick={onItemClicked}>
            <p className="tabitem__title">
                {title}
            </p>
        </div>
    )
}

export default TabItemComponent;