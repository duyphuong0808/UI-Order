import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';
import './FormAddOrder.scss';

function FormAddOrder(props) {
    const { initialValues } = props;

    //const [isHide, setIsHide] = useState(true);

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

    // const handleOnClickAddButton = () => {
    //     setIsHide(!isHide);
    // }

    return (
        <div className='form-add-order'>
            {/* <button onClick={handleOnClickAddButton} className='add-button'>Add</button> */}
            {/* {
                !isHide ?  */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={props.onSubmit}
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

                                <FormGroup className='add-order-form'>
                                    <Button type="submit" className='add-order-button'>
                                        {isSubmitting && <Spinner size="sm" />}
                                        Add order
                                    </Button>
                                </FormGroup>
                            </Form>
                        );
                    }
                }
            </Formik>
            {/* : ''
            } */}
        </div>
    );
}

FormAddOrder.propTypes = {
    onSubmit: PropTypes.func,
};

FormAddOrder.defaultProps = {
    onSubmit: null,
}

export default FormAddOrder;