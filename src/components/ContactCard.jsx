import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const ContactCard = ({ contact }) => {
    const { actions } = useGlobalReducer();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // Mantener para el spinner de borrado

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        const success = await actions.deleteContact(contact.id, contact.agenda_slug);
        setIsDeleting(false);
        if (success) {
            setShowModal(false);
        }
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div className="text-center text-md-start mb-3 mb-md-0 flex-grow-1">
                    <h5 className="card-title text-primary">{contact.name}</h5>
                    <p className="card-text text-muted mb-1">
                        <i className="fas fa-envelope me-2"></i>{contact.email}
                    </p>
                    <p className="card-text text-muted mb-1">
                        <i className="fas fa-phone me-2"></i>{contact.phone}
                    </p>
                    <p className="card-text text-muted">
                        <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
                    </p>
                </div>
                <div className="d-flex flex-column flex-md-row">
                    <button
                        className="btn btn-outline-primary me-md-2 mb-2 mb-md-0"
                        onClick={() => navigate(`/edit-contact/${contact.id}`)}
                        title="Editar Contacto"
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                        title="Eliminar Contacto"
                    >
                        {isDeleting ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            <i className="fas fa-trash-alt"></i>
                        )}
                    </button>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
            >
                ¿Estás seguro de que quieres eliminar a {contact.name}? Esta acción no se puede deshacer.
            </Modal>
        </div>
    );
};

export default ContactCard;