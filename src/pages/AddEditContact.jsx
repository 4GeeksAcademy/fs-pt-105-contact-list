import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams, Link } from "react-router-dom";

const AddEditContact = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const { contactId } = useParams();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        agenda_slug: "Adrian_105", 
        address: "",
        phone: ""
    });

    const [isSaving, setIsSaving] = useState(false); // Spinner

    useEffect(() => {
        if (contactId && store.contacts.length > 0) {
            const contactToEdit = store.contacts.find(contact => contact.id === parseInt(contactId));
            if (contactToEdit) {
                setFormData({
                    full_name: contactToEdit.name || "",
                    email: contactToEdit.email || "",
                    agenda_slug: contactToEdit.agenda_slug || "Adrian_105",
                    address: contactToEdit.address || "",
                    phone: contactToEdit.phone || ""
                });
            }
        }
    }, [contactId, store.contacts]); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        let success = false;
        if (contactId) {
            success = await actions.updateContact(parseInt(contactId), formData);
        } else {
            success = await actions.addContact(formData);
        }

        setIsSaving(false);
        if (success) {
            navigate("/"); // Redirige a la lista de contactos
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{contactId ? "Editar Contacto" : "Añadir Nuevo Contacto"}</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary me-2"
                    disabled={isSaving} // Deshabilita el botón mientras se guarda
                >
                    {isSaving ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    {contactId ? "Actualizar Contacto" : "Guardar Contacto"}
                </button>
                <Link to="/" className="btn btn-secondary">Cancelar</Link>
            </form>
        </div>
    );
};

export default AddEditContact;