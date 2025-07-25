import '../../index.css'
import { useContext} from 'react';
import { Link } from 'react-router-dom';
import  CurrentUserContext  from '../../contexts/CurrentUserContext.js';

function SingIn (){
    const {handleLogin, data, setData} = useContext(CurrentUserContext);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            handleLogin();
        };

    
    return(
        <>
        <div className='sign-in__content'>
            <h2 className="sign-in__title">Inicia sesión</h2>
            <form className="sign-in__form" onSubmit={handleSubmit}>
                <input 
                type="email" 
                className="sign-in__input sign-in__input_email sign-input" 
                placeholder="Correo"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                />
                <input 
                type="password" 
                className="sign-in__input sign-in__input_password sign-input" 
                placeholder="Contraseña"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                />
                <button 
                type="submit" 
                className="sign-in__button"
                >Iniciar sesión</button>
            </form>
            <p className="sign-in__text">¿Aún no tienes cuenta? <Link to="/sign-up" className="sign-in__link">Registrate aquí</Link></p>
        </div>
        </>
    )
}

export default SingIn