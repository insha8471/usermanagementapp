import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import UserDetails from "../pages/UserDetails";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
    </BrowserRouter>
)

export default AppRoutes;