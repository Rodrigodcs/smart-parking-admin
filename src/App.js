import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from './styles/GlobalStyle';
import AdminContext from "./contexts/AdminContext"
import AdminPage from "./pages/AdminPage";

function App() {
    const [adminContextInfo, setAdminContextInfo] = useState(
        JSON.parse(localStorage.getItem('smartParkingAdminInfo'))!==null?
            JSON.parse(localStorage.getItem('smartParkingAdminInfo')):
            ""
    );
    
  return (
    <AdminContext.Provider value={{adminContextInfo, setAdminContextInfo}}>
        <GlobalStyle />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={adminContextInfo.token ? <Navigate to="/admin" /> : <LoginPage />} />
                <Route path="/admin" element={!adminContextInfo.token  ? <Navigate to="/" /> : <AdminPage />} />
            </Routes>
        </BrowserRouter>
    </AdminContext.Provider>
  );
}

export default App;