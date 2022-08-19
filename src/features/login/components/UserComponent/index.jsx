import 'bootstrap/dist/css/bootstrap.min.css';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';
import * as Yup from 'yup';
import tokenApi from '../../../../api/tokenApi';
import userApi from '../../../../api/userApi';
import localStorageCustom from '../../../../app/localStorageCustom';
import { LOCAL_STORAGE_CONST } from '../../../../constants/Constant';
import InputField from '../../../../custom-fields/InputField';
import './UserComponent.scss';

function UserComponent(props) {

    let navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [code, setCode] = useState(null);

    useEffect(() => {
        const setLocalCode = async () => {
            const value = code || searchParams.get(LOCAL_STORAGE_CONST.CODE);
            if (value) {
                localStorageCustom.setCode(value);
                await checkAccessToken(value);
                await getUserInfo();
                navigate('/home-page');
            }
            setCode(value);
        }

        setLocalCode();

    }, );
    // if access token is existed, set access token for api
    const checkAccessToken = async (code) => {
        try {
            const response = await tokenApi.getToken(code);
            if (response.status === 200) {
                localStorageCustom.setToken(response.data.access_token);
                localStorageCustom.setAccessToken(response.data);
                console.log(response.data.access_token);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    const getUserInfo = async () => {
        try {
            const response = await userApi.getUserInf();
            if (response.status === 200) {
                localStorageCustom.setUser(response.data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }

    }
   


    const handleOnSubmit = async (values) => {
        //const action = saveEmail
        const params = {
            account: values.email,
        }
        try {
            const response = await userApi.checkEmail(params);
            if (response.status === 200) {
                navigate(`/login/${values.email}`);
                return;
            } else {
                navigate(`/register/${values.email}`);
                return;
            }
        } catch (error) {
            console.log("Error: ", error);
            navigate(`/register/${values.email}`);
        }
    }

    const initialValues = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Ex: abc@email.com').required('This field is required.'),
    });

    return (
        <div className='box-user-component'>
            <div className='user-component'>
                <h1>Login Page</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleOnSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        formikProps => {
                            const { values, errors, touched } = formikProps;
                            console.log({ values, errors, touched });

                            return (
                                <Form>
                                    <FastField
                                        name="email"
                                        component={InputField}
                                        label="Email"
                                        placeholder="Enter your email"
                                    />

                                    <FormGroup className='user-component-button'>
                                        <Button type="submit" onClick={handleOnSubmit} className='check-email-button'>
                                            Check email
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

UserComponent.propTypes = {
};

export default UserComponent;