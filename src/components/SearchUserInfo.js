import styled from "styled-components";
import {useState,useContext} from "react"
import axios from "axios"

import { ThreeDots } from "react-loader-spinner";
import ClientsInfo from "./UserInfo.js"
import AdminContext from "../contexts/AdminContext";

export default function SearchUserInfo({showToast}) {
  const [clientInfo,setClientInfo]= useState(null)
  const [loading,setLoading] = useState(false)
  const {adminContextInfo} = useContext(AdminContext);

    function sendRequest(){
        setClientInfo(null);
        const config = {
            headers:{
                Authorization:`Bearer ${adminContextInfo.token}`
        }}
        axios.get(`${process.env.REACT_APP_API_URL}/admin/tagReader`,config).then((response)=>{
            console.log(response.data)
            setLoading(true)
        }).catch((e)=>{
            showToast("Erro","error")
            console.log(e.response.data)
        })
    }

    function cardError(){
        showToast("Erro na leitura da tag","error")
        setLoading(false)
    }
    
    function cardSucess(clientInfo){
        console.log(clientInfo)
        setLoading(false)
        setClientInfo(clientInfo)
    }
    
  return (
      <Container>
        <div className="title">INFORMAÇÕES DO CLIENTE</div>
        {!loading?
                <button onClick={()=>sendRequest()}>{!clientInfo?"Buscar Informações":"Nova Pesquisa"}</button>:
            !clientInfo?
                <>
                    <p>Passe a tag do cliente</p>
                    <ThreeDots color="#fff" height={40} width={40} />
                    <ClientsInfo cardSucess={cardSucess} cardError={cardError}/>
                </>:
                ""
                
        }
        {clientInfo?
            <>
                <div className="client-info">
                    <p><span>Nome: </span>{clientInfo.name}</p>
                    <p><span>Email: </span>{clientInfo.email}</p>
                    <p><span>Modelo: </span>{clientInfo.car}</p>
                    <p><span>Placa do veículo: </span>{clientInfo.licensePlate}</p>
                    {clientInfo.credits>0?
                        <p><span>Creditos: </span>R$ {Math.abs(clientInfo.credits)},00</p>:
                        <p className="debt"><span>Creditos: </span>R$ {Math.abs(clientInfo.credits)},00</p>
                    }
                    
                    <p><span>Tag: </span>{clientInfo.tagId}</p>
                </div>
            </>:
            ""
        }
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
        width: 150px;
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
    .error{
        color:red;
    }
    .debt{
        color:red;
    }
    span{
        font-size: 18px;
        color:grey;
    }
    .client-info{
        color:black;
        background-color: #f7f4cf;
        padding:10px;
        border-radius: 5px;
    }
`;