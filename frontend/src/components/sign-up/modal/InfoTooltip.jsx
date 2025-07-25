import React from 'react';
import '../../../index.css';
import userSignup from "../../../assets/image/readySignUp.svg"
import userSignupUnready from "../../../assets/image/unReadySignUp.svg"

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    if (!isOpen) return null;

    return (
        <div className="info-tooltip">
            <div className="info-tooltip__container">
                <button 
                    type="button" 
                    className="info-tooltip__close-button" 
                    onClick={onClose}
                >
                    
                </button>
                <img 
                    src={isSuccess ?  userSignup: userSignupUnready} 
                    alt={isSuccess ? "ready" : "unready"}
                    className="info-tooltip__image"
                />
                <p className="info-tooltip__text">
                    {isSuccess ? "¡Correcto! Ya estás registrado." : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
                </p>
            </div>
        </div>
    );
}

export default InfoTooltip;
