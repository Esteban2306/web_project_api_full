import '../../../../../index.css';
import { useState, useContext, useRef, useEffect} from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext.js';
import FormValidator from '../../../../../utils/FormValidator.js';

export default function NewCard() {

    const {handleAddPlaceSubmit, } = useContext(CurrentUserContext);

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleLinkChange = (e) => setLink(e.target.value);

    const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      const validator = new FormValidator('.form');
      validator.enableValidation();
    }
  }, []);

    const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlaceSubmit({ name: title, link: link });
  };

    return (
        <>
            <form 
            ref={formRef}
            className="modal__add-form form" 
            noValidate
            onSubmit={handleSubmit}
            >
                <input 
                type="text" 
                id="nombreAdd" 
                name='title' 
                placeholder="Titulo" 
                className="modal__add-form-name modal__input " 
                minLength="2" 
                maxLength="30"
                onChange={handleTitleChange}
                value={title} 
                required/>
                <span className="nombreAdd-error modal__error"></span>
                <input 
                type="url" 
                id="imageAdd" 
                name="link" 
                placeholder="Enlace a la imagen" 
                className="modal__add-form-description modal__input" 
                onChange={handleLinkChange}
                value={link}
                required />
                <span className="imageAdd-error modal__error"></span>
                <button type="submit" className="modal__add-content-button form__submit">Crear</button>
            </form>
        </>
    )
}