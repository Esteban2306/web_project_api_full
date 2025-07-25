import '../../../index.css'

export default function Popup(props) {
    const {title,children,onClose} = props
    return (
        <>
            <section className="modal" id="modal-edit-all" onClick={onClose}>
                <div  className={`modal__content ${!title ? 'modal__content-untiteld' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <button className="close popup__close" type="button" onClick={onClose}></button>
                    {title && <h3 className="modal__content_header">{title}</h3>}
                    {children}
                </div>
            </section>
        </>
    )
}