import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import userApi from '../../../../api/userApi';
import InputField from '../../../../custom-fields/InputField';
import './RegisterComponent.scss';

function RegisterComponent(props) {
    const { email } = props;

    const initialError = {
        isError: false,
        errorMessage: '',
    }

    const [error, setError] = useState(initialError);

    const initialValues = {
        password: '',
        confirm: '',
        name: '',
        email: email,
    }

    let navigate = useNavigate();

    const handleOnSubmit = async (values) => {
        console.log("Value: ", values);
        const body = {
            user: {
                username: values.name,
                account: email,
                password: values.password,
            },
            roles: [
                2
            ]
        };
        try {
            const response = await userApi.createUser(body);
            console.log("Response create user: ", response);
            if (response.status === 201) {
                navigate('/');
            } else {
                setError({
                    isError: true,
                    errorMessage: 'The operation failed, please try again!',
                });
            }
        } catch (error) {
            console.log("Error create user: ", error);
        }

    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required.'),
        password: Yup.string().required('This field is required.'),
        confirm: Yup.string()
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value
            }),
    });

    const showError = () => (
        error.isError ? <p className='error-message'>{error.errorMessage}</p> : ""
    );

    return (
        <div className='box-register-component'>
            <div className='register-component'>
                <h1>Register</h1>
                <FormGroup>
                    <Label >Email</Label>
                    <Input
                        type='text'
                        readOnly
                        value={email}
                    />
                </FormGroup>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        formikProps => {
                            // const { values, errors, touched } = formikProps;
                            // console.log({ values, errors, touched });

                            return (
                                <Form>
                                    <FastField
                                        name="name"
                                        component={InputField}
                                        type="text"
                                        label="Name"
                                        placeholder="Enter your name"
                                    />

                                    <FastField
                                        name="password"
                                        component={InputField}
                                        type="password"
                                        label="Password"
                                        placeholder="Enter password"
                                    />

                                    <FastField
                                        name="confirm"
                                        component={InputField}
                                        type="password"
                                        label="Confirm"
                                        placeholder="Confirm password"
                                    />

                                    {
                                        showError()
                                    }

                                    <FormGroup className='register-component-button'>
                                        <Button type="submit">
                                            Register
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

RegisterComponent.propTypes = {
    email: PropTypes.string,
};

RegisterComponent.defaultProps = {
    email: '',
}

export default RegisterComponent;