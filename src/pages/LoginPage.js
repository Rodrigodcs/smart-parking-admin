import axios from "axios";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminContext from "../contexts/AdminContext";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage(){
    const {setAdminContextInfo} = useContext(AdminContext);
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
      });

    function handleForm(e){
    setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }
    function login(e){
        e.preventDefault();
        setIsDisabled(true);
        const body={...form};
        axios.post(`${process.env.REACT_APP_API_URL}/admin/signIn`, body).then((res)=>{
            localStorage.setItem('smartParkingAdminInfo', JSON.stringify(res.data));
            setAdminContextInfo(res.data);
            navigate("/admin");
        }).catch((err) => {
            if(err.response) toast.error(err.response.data);
            else toast.error(err.message)
            setIsDisabled(false);
        }); 
    }
    return (
        <ScreenContainer>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <img src={logo} alt="logo"/>
            <h1>Smart Parking</h1>
            <FormLogin onSubmit={login}>
                <input name="email" type="email" placeholder="email" required onChange={handleForm} value={form.email} disabled={isDisabled}/>
                <input name="password" type="password" placeholder="senha" required onChange={handleForm} value={form.password} disabled={isDisabled}/>
                <button type="submit" disabled={isDisabled}>
                {isDisabled? 
                    <ThreeDots
                    height="40" 
                    width="40" 
                    radius="9"
                    color="#FFFFFF" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    /> 
                    : 
                    "Entrar"
                }
                </button>
            </FormLogin>
        </ScreenContainer>
    );
}

const ScreenContainer = styled.div`
    background-color: #FFFFFF;;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    margin: 0px;
    padding: 0px 35px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    p{
        text-align:center;
        font-size: 13.976px;
        line-height: 17px;
    }
    img{
        margin-top: -100px;
        width:300px;
        margin-left: 50px;
    }
    h1{
        margin-top: -20px;
        color:#fa5d59;
        font-size: 50px;
        cursor: default;
    }
    a{
        color:grey;
        text-decoration: none;
    }
`;
const FormLogin = styled.form`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    row-gap:6px;
    margin: 30px  0px;
    
    input{
        max-width: 303px;
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        display:flex;
        align-items:center;
        font-size: 19.976px;
        line-height: 25px;
        padding-left:10px;
        &::placeholder{
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
        }
        &:disabled{
            background: #F2F2F2;
        }
    }
    button{
        max-width: 303px;
        width: 100%;
        height: 45px;
        background: #fa5d59;
        border-radius: 4.63636px;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        border:none;
        display:flex;
        justify-content:center;
        align-items:center;
        cursor: pointer;
        &:disabled{
            opacity: 0.7;
        }
    }
`;