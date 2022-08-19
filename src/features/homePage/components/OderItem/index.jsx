import PropTypes from 'prop-types';
import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { GiSightDisabled } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import { List } from 'reactstrap';
import userApi from '../../../../api/userApi';
import localStorageCustom from '../../../../app/localStorageCustom';
import './OrderItem.scss';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function OderItem(props) {

    const { item, onClickUpdate, onClickDelete, onClickDisable, isAdmin } = props;

    const handleOnDeleteItem = () => {
        if (onClickDelete) {
            onClickDelete(item.id);
        }
    }

    const handleOnUpdateItem = () => {
        if (onClickUpdate) {
            onClickUpdate(item);
        }
    }

    const getDate = (index) => {
        return weekday[index];
    }

    const getMonth = (index) => {
        return month[index];
    }
  

    const formatDate = () => {
        const date = new Date(item.dateOrder);

        var dd = String(date.getDate()).padStart(2, '0');
        var mm = getMonth(date.getMonth()); //January is 0!
        var yyyy = date.getFullYear();
        var day = getDate(date.getDay());

        const result = day + ', ' + mm + ' ' + dd + ' ' + yyyy;
        return result;
    }

    return (

        <tr>
            <th scope="row">{item.id}</th>
            <td>{item.idUser}</td>
            <td>{item.nameType}</td>
            <td>{item.money}</td>
            <td>{item.nameDish}</td>
            <td>{item.quantity}</td>
            <td>{formatDate()}</td>
            <td>{item.price}</td>
            <td className='icon-box'>
                <AiTwotoneEdit onClick={handleOnUpdateItem} className='icon-button' />
            </td>
            {
                isAdmin ? <td className='icon-box'>
                    <GiSightDisabled onClick={onClickDisable} className='icon-button' />
                </td> : ""
            }
            <td className='icon-box'>
                <MdDelete onClick={handleOnDeleteItem} className='icon-button' />
            </td>
        </tr>
    );
}


OderItem.propTypes = {
    item: PropTypes.object,
    onClickUpdate: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickDisable: PropTypes.func,
    isAdmin: PropTypes.bool,
};

OderItem.defaultProps = {
    item: {},
    onClickUpdate: null,
    onClickDelete: null,
    onClickDisable: null,
    isAdmin: false,
};

export default OderItem;