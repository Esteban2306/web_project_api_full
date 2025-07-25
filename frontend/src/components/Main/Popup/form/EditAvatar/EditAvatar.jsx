import '../../../../../index.css';
import { useContext, useRef, useEffect } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext.js';
import FormValidator from '../../../../../utils/FormValidator.js';

export default function EditAvatar(){
    const avatarRef = useRef();
    const {handleUpdateAvatar} = useContext(CurrentUserContext);

    const formRef = useRef(null);
    
      useEffect(() => {
        if (formRef.current) {
          const validator = new FormValidator('.form');
          validator.enableValidation();
        }
      }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }
    return(
        <>
            <form
            ref={formRef}
            className="modal__image-form form" 
            onSubmit={handleSubmit}
            noValidate>
            <input 
            type="url" 
            id="avatar"  
            name="avatar" 
            placeholder="Inagresa URL" 
            className="modal__image_url modal__input"
            ref={avatarRef}
            required/>
            <span className="avatar-error modal__error"></span>
            <button type="submit" className="modal__image_button form__submit">Guardar</button>
            </form>
        </>
    )
}