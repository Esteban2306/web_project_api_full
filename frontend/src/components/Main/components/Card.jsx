import { useState, useContext } from 'react';
import '../../../index.css'
import ImagePopup from '../Popup/form/ImagePopup/ImagePopup.jsx'
import Popup from '../Popup/Popup.jsx';
import CurrentUserContext from '../../../contexts/CurrentUserContext.js';

export default function Card({card, handleOpenPopup, onLikeCard, onCardDelete}) {
    const { name, link, isLiked} = card;
    const [popup, setPopup] = useState(null)
    const {currentUser} = useContext(CurrentUserContext);

    const newImagePopup = { children:<ImagePopup card={card}/>}

    const isLikedClass = `galery__item-like-button ${isLiked ? 'galery__item-like-button_active' : 'galery__item-like-button'}`;

     function handleOpenPopup(popup) {
        setPopup(popup);
      }

   function handleClosePopup() {
        setPopup(null);
     }

    function handleCardLike() {
        onLikeCard(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return(
        <> 
            <li className="galery" >
                <div className="galery__item">
                    <img 
                    src={link} 
                    onClick={() => handleOpenPopup(newImagePopup)} 
                    alt="landscape image" 
                    className="galery__item-image"/>
                    <button className="galery__item-delete-button" type="button" onClick={handleCardDelete}></button>
                    <div className="galery__item-content">
                        <p className="galery__item-name">{name}</p>
                        <button className={isLikedClass} type="button" onClick={handleCardLike}></button>
                    </div>
                </div>
            </li>
            {popup && (
                    <Popup onClose={handleClosePopup} title={popup.title}>
                        {popup.children}
                    </Popup>
                    
                )} 
        </>
    )
}