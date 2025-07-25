import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import InfoTooltip from './modal/InfoTooltip';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';


function SingUp() {
    const {
        handleRegister, 
        setData, 
        data, 
        isSuccess, 
        showTooltip, 
        setShowTooltip
    } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCloseTooltip = () => {
        setShowTooltip(false);
        if (isSuccess) {
            navigate('/sign-in');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    };

    

    return (
        <>
            <div className='sign-up__content'>
                <h1 className='sign-up__title'>Registrate</h1>
                <form className='sign-up__form' onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        className='sign-up__input sign-up__input_email sign-input' 
                        value={data.email} 
                        onChange={handleChange} 
                        placeholder="Correo"
                        name="email"
                        required
                    />
                    <input 
                        type="password" 
                        className='sign-up__input sign-up__input_password sign-input' 
                        value={data.password} 
                        onChange={handleChange} 
                        placeholder="Contraseña"
                        name="password"
                        required
                    />
                    <button type="submit" className='sign-up__button'>Registrate</button>
                </form>
                <p className='sign-up__text'>¿Ya eres miembro? <Link to="/sign-in" className='sign-up__link'>Inicia sesión aquí</Link></p>
            </div>
            <InfoTooltip 
                isOpen={showTooltip} 
                onClose={handleCloseTooltip} 
                isSuccess={isSuccess}
            />
        </>
    );
}

export default SingUp;
