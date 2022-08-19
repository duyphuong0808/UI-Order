import React from 'react';
import { useParams } from "react-router-dom";
import RegisterComponent from '../../../components/RegisterComponent';


function RegisterPage(props) {

    let { email } = useParams();

    return (
        <RegisterComponent email={email} />
    );
}

RegisterPage.propTypes = {};

export default RegisterPage;