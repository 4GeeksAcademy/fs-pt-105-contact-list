export const initialStore = () => {
    return {
        contacts: [], // Array donde guardo todos los contactos
    };
};

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'SET_CONTACTS':
            // Cuando obtenemos los contactos de la API
            return { ...store, contacts: action.payload };

        case 'ADD_CONTACT_SUCCESS':
            // Cuando un contacto se añade con éxito
            return { ...store, contacts: [...store.contacts, action.payload] };

        case 'UPDATE_CONTACT_SUCCESS':
            // Cuando un contacto se actualiza busca el viejo y lo reemplaza
            return {
                ...store,
                contacts: store.contacts.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };

        case 'DELETE_CONTACT_SUCCESS':
            // Cuando un contacto se elimina
            return {
                ...store,
                contacts: store.contacts.filter(contact => contact.id !== action.payload),
            };

        default:
            return store;
    }
}

export const actions = (dispatch) => ({

    // Cargar todos los contactos desde la API
    loadContacts: async () => {
        const agendaSlug = "Adrian_105";
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`);
            const data = await response.json();
            dispatch({ type: 'SET_CONTACTS', payload: data.contacts || [] }); // Aseguramos que sea un array
        } catch (error) {
            console.error("Error al cargar contactos:", error);
        }
    },

    // Añadir un nuevo contacto
    addContact: async (contactData) => {
        const agendaSlug = contactData.agenda_slug || "Adrian_105";
        
        const bodyToSend = {
            name: contactData.full_name, 
            email: contactData.email,
            agenda_slug: agendaSlug,
            address: contactData.address,
            phone: contactData.phone
        };

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyToSend)
            });
            const newContact = await response.json();
            dispatch({ type: 'ADD_CONTACT_SUCCESS', payload: newContact });
            return true;
        } catch (error) {
            console.error("Error al añadir contacto:", error);
            return false;
        }
    },

    // Actualizar un contacto existente
    updateContact: async (contactId, updatedData) => {
        const agendaSlug = updatedData.agenda_slug || "Adrian_105";

        const bodyToSend = {
            name: updatedData.full_name, 
            email: updatedData.email,
            agenda_slug: agendaSlug,
            address: updatedData.address,
            phone: updatedData.phone
        };

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyToSend)
            });
            const updatedContact = await response.json();
            dispatch({ type: 'UPDATE_CONTACT_SUCCESS', payload: updatedContact });
            return true;
        } catch (error) {
            console.error("Error al actualizar contacto:", error);
            return false;
        }
    },

    // Eliminar un contacto
    deleteContact: async (contactId, agendaSlug = "Adrian_105") => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactId}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                 throw new Error(`Error al eliminar el contacto: ${response.statusText}`);
            }
            dispatch({ type: 'DELETE_CONTACT_SUCCESS', payload: contactId });
            return true;
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
            return false;
        }
    },
});