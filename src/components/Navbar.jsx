import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link to="/" className="navbar-brand mb-0 h1">
                    Gestor de Contactos
                </Link>
                <div className="ms-auto">
                    <Link to="/add-contact">
                        <button className="btn btn-success">Añadir Nuevo Contacto</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};