
import { FastField, Form, Formik } from 'formik';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import orderDetailApi from '../../../../api/orderDetailApi';
import localStorageCustom from '../../../../app/localStorageCustom';
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';
import { setOrder } from '../TabsComponent/tabsComponentSlice';
import './FormUpdateOrder.scss';



function FormUpdateOrder(props) {
    const order = useSelector((state) => state.tabsComponent);
    const dispath = useDispatch();
    const navigate = useNavigate();
  

    const [error, setError] = useState(null);

    const initialValues = {
        name: order.name || '',
        quantity: order.quantity || 1,
        typeId: order.typeId || 1,
    }

    const selectOption = [
        { value: 1, label: 'Loại 1 món' },
        { value: 2, label: 'Loại 2 món' },
        { value: 3, label: 'Loại 3 món' },

    ];

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),

        quantity: Yup.number('Quantity is a number').min(1)
            .required('This field is required.'),
    });

    const handleOnClickSubmitForm = (obj, { resetForm }) => {
        resetForm({ obj: '' });
        updateOrder(obj);
    }

    const updateOrder = async (item) => {
        const user = localStorageCustom.getUser();
        const userId = user.id;
        const body = {
            'id': order.id || 0,
            'typeId': item.typeId,
            'userId': `${userId}`,
            'name': item.name,
            'quantity': item.quantity,
            'date': order.date || '',
        };
        console.log("body: ", body);
        try {
            const action = setOrder(body);
            dispath(action);
            try {
                const response = await orderDetailApi.updateOrder(body);
                if (response.status === 200) {
                    navigate("/home-page");
                }
            } catch (error) {
                console.log("Error update order: ", error);
            }

        } catch (error) {
            console.log("error: ", error);
            setError('Update failed');
        }

    }

    return (
        <div className='box-form-update-order'>
            <div className='form-update-order'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleOnClickSubmitForm}
                >
                    {
                        formikProps => {
                            const { values, errors, touched, isSubmitting } = formikProps;
                            console.log({ values, errors, touched });

                            return (
                                <Form>
                                    <FastField
                                        name="name"
                                        component={InputField}
                                        label="Dish"
                                        placeholder="Enter dish name"
                                    />

                                    <FastField
                                        name="quantity"
                                        component={InputField}
                                        type='number'
                                        label="Quantity"
                                        placeholder="Enter quantity"
                                    />

                                    <FastField
                                        name="typeId"
                                        component={SelectField}
                                        label="Type"
                                        placeholder="Choose type of dish"
                                        options={selectOption}
                                    />
                                    {
                                        error ? <p>${error}</p> : ''
                                    }
                                    <FormGroup className='edit-order-button'>
                                        <Button type="submit" >
                                            {isSubmitting && <Spinner size="sm" />}
                                            Update order
                                        </Button>
                                    </FormGroup>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div>
        </div>
    );
}

FormUpdateOrder.propTypes = {
};

FormUpdateOrder.defaultProps = {
}

export default FormUpdateOrder;