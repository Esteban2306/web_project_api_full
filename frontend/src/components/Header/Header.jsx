import '../../index.css';
import logoHeader from '../../assets/image/header.svg';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function Header() {
    const { currentUser, handleLogout, isLoggedIn } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isHome = location.pathname === '/';
    const isSignIn = location.pathname === '/sign-in';
    const isSignUp = location.pathname === '/sign-up';

    const goToSignup = () => navigate('/sign-up');
    const goToSignIn = () => navigate('/sign-in');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {isMobileMenuOpen && isHome && isLoggedIn && (
                <div className="mobile-menu-slide">
                    <p className="header__name">{currentUser.email}</p>
                    <button className="header__button-logout header__button" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            )}

            <header className="header">
                <h1 className="header__title header__title_word">
                    <img src={logoHeader} alt="logo" />
                </h1>

                <div className="header__user">
                    {isHome && isLoggedIn && (
                        <>
                            <p className="header__name">{currentUser.email}</p>
                            <button className="header__button-logout header__button" onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </>
                    )}
                    {isSignIn && (
                        <button className="header__button-signup header__button" onClick={goToSignup}>
                            Registrarse
                        </button>
                    )}
                    {isSignUp && (
                        <button className="header__button-signin header__button" onClick={goToSignIn}>
                            Iniciar sesión
                        </button>
                    )}
                </div>
                {isHome && isLoggedIn && (
                    <div className="burger" onClick={toggleMobileMenu}>
                        ☰
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;