import '../../../../../index.css';

export default function ImagePopup({card}) {

    return (
        <>
            <img src={card.link} alt="imagen ampliada" className="popupimg__content-image"/>
            <p className="popupimg__content-title">{card.name}</p>
        </>
    )
}