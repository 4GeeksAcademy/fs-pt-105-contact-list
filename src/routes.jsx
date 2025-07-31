import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import { Layout } from "./pages/Layout";
import AddEditContact from "./pages/AddEditContact";
import Home from "./pages/Home";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>¡Página no encontrada! (Error 404)</h1>}>
            <Route index element={<Home />} />
            <Route path="/add-contact" element={<AddEditContact />} />
            <Route path="/edit-contact/:contactId" element={<AddEditContact />} />
        </Route>
    )
);