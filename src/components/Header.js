import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AdminContext from "../contexts/AdminContext";
import styled from "styled-components";
import Logo from "./Logo";

export default function Header() {
    const {setAdminContextInfo} = useContext(AdminContext);
    const navigate = useNavigate();
    function logout(){
        localStorage.removeItem('smartParkingAdminInfo');
        setAdminContextInfo("");
        navigate("/");
    }
    return (
        <HeaderSection>
            <Logo/>
            <button className="logout" onClick={()=>logout()}><p>Logout</p></button>
        </HeaderSection>
    );
}

const HeaderSection = styled.header`
    cursor: default;
    width: 100%;
    display: flex;
    height: 100px;
    justify-content: space-between;
    align-items:  center;
    background-color: #fa5d59;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 0 18px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .logout{
        background-color: #767679;
        width: 80px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;
        p{
            font-size: 20px;
            color: white;
        }
    }
`;