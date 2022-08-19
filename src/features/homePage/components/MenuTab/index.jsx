import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import orderDetailApi from '../../../../api/orderDetailApi';
import localStorageCustom from '../../../../app/localStorageCustom';
import FormAddOrder from '../FormAddOrder';
import MenuItem from '../MenuImage';
import './MenuTab.scss';
import 'react-notifications/lib/notifications.css';

function MenuTab(props) {
    const imgUrl = 'https://www.watami.vn/Data/Sites/1/News/328/kw-menu-festive-(w260-x-h360)-2.jpg';

    const initialValues = {
        name: '',
        quantity: 1,
        typeId: 1,
    }

    const handleOnClickSubmitForm = (obj, { resetForm }) => {
        resetForm({ obj: '' });
        createOrder(obj);
    }

    const createOrder = async (order) => {
        const user = localStorageCustom.getUser();
        const body = {
            'typeId': order.typeId,
            'userId': user.id,
            'name': order.name,
            'quantity': order.quantity,
        };
        console.log("body: ", body);
        try {
            const response = await orderDetailApi.createOrder(body);
            if (response.status === 201) {
                NotificationManager.success('Order successfully!', 'Add Order');
            } else {
                NotificationManager.error('Order failure!', 'Add Order');
            }
        } catch (error) {
            console.log("error: ", error);
        }

    }

    const getFormAddOrder = (
        <FormAddOrder initialValues={initialValues} onSubmit={handleOnClickSubmitForm} />
    );


    return (
        <div className='menu-tab'>
            <div className='menu-image'>
                <MenuItem photoUrl={imgUrl} />
            </div>
            <div className='form-add-order'>
                {
                    getFormAddOrder
                }
            </div>
            <NotificationContainer />
        </div>
    );
}

MenuTab.propTypes = {
};

export default MenuTab;