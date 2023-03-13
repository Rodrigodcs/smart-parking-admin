import styled from "styled-components";
import {useState,useContext} from "react"
import axios from "axios"
import AdminContext from "../contexts/AdminContext";

export default function RegisterNewTag({showToast}) {
    const [userEmail,setUserEmail]= useState("")
    const {adminContextInfo} = useContext(AdminContext);

    function sendInfo(){
        const body = {
            email:userEmail,
        }
        const config = {
            headers:{
                Authorization:`Bearer ${adminContextInfo.token}`
        }}
        axios.post(`${process.env.REACT_APP_API_URL}/admin/tagRegistration`,body,config).then((response)=>{
            console.log(response)
            showToast("Sucesso")
        }).catch((e)=>{
            console.log(e.response.data)
            showToast("Erro","error")
        })
    }

    return (
        <Container>
            <div className="title">REGISTRAR NOVA TAG</div>
            <input type="text" placeholder="Email do usuário" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}></input>
            <button onClick={()=>sendInfo()}>Registrar</button>
        </Container>
    )
}

const Container = styled.div`
    width:300px;
    height: fit-content;
    padding-bottom: 10px;
    border-radius: 10px;
    background-color:#fa5d59;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:10px;
    .title{
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width:100%;
        text-align: center;
        color:white;
        border-bottom: solid 1px black;
        background-color: #464F33;
    }
    button{
        width: 100px;
        height: 30px;
        background-color: #464F33;
        cursor: pointer;
        color:white;
    }
    .error{
        color:red;
        font-size: 15px;
    }
    .sucess{
        color:green;
        font-size: 15px;
    }
    input{
        height: 25px;
        padding-left: 5px;
        background-color: #f7f4cf;
        outline: none;
        border-radius: 5px;
    }

`;