import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const Home = () => {
    const { store, actions } = useGlobalReducer();

    useEffect(() => {
        actions.loadContacts();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Mis Contactos</h1>

            {store.contacts.length === 0 ? (
                <p className="text-center">No hay contactos aún. ¡Añade uno!</p>
            ) : (
                <div className="list-group">
                    {store.contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;