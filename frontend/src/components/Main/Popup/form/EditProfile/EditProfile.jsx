import '../../../../../index.css';
import { useState, useContext, useRef, useEffect } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext.js';
import FormValidator from '../../../../../utils/FormValidator.js';

export default function EditProfile() {

    const userContext  = useContext(CurrentUserContext);
    const {currentUser, handleUpdateUser} = userContext;

    const [name, setName] = useState(currentUser.name || '');
    const [description, setDescription] = useState(currentUser.about || '');

    const formRef = useRef(null);
    
      useEffect(() => {
        if (formRef.current) {
          const validator = new FormValidator('.form');
          validator.enableValidation();
        }
      }, []);

    const handleNameChange = (evt) =>{
        setName(evt.target.value);
    }

    const handleDescriptionChange = (evt) =>{
        setDescription(evt.target.value);
    }

    const handleSubmit= (evt) =>{
        evt.preventDefault();
        handleUpdateUser({
            name,
            about: description
        });
    }


    return (
        <>
            <form 
            ref={formRef}
            className="modal__form form" 
            noValidate
            onSubmit={handleSubmit}
            >
                <input 
                type="text" 
                id="nombre"  
                name="nombre" 
                placeholder="Nombre" 
                className="modal__form_name modal__input" 
                minLength="2" 
                maxLength="40"
                onChange={handleNameChange}
                value={name}
                required 
                />
                <span className="nombre-error modal__error"></span>
                <input 
                type="text" 
                id="descripcion" 
                name="descripcion" 
                placeholder="Acerca de mí" 
                className="modal__form_description modal__input" 
                minLength="2" 
                maxLength="200"
                onChange={handleDescriptionChange}
                value={description}
                required 
                />
                <span className="descripcion-error modal__error"></span>
                <button type="submit" className="modal__content_button form__submit">Guardar</button>
            </form>
        </>
    )
}