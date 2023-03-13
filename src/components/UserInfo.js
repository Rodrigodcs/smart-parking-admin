import {useEffect,useContext} from "react"
import axios from "axios"
import AdminContext from "../contexts/AdminContext";

export default function UserInfo({cardSucess,cardError}) {
    const {adminContextInfo} = useContext(AdminContext);
    
    useEffect(() => {
        const search = setInterval(() => getInfo(),2500)
        const err = setTimeout(()=>cardError(),10000)
        return ()=> {
            clearInterval(search)
            clearTimeout(err)
        }
    }, []);

    function getInfo(){
        const config = {
            headers:{
                Authorization:`Bearer ${adminContextInfo.token}`
        }}
        axios.get(`${process.env.REACT_APP_API_URL}/admin/userInfo`,config).then((response)=>{
            console.log(response)
            if(response.data!==""){
                cardSucess(response.data)
            }
        }).catch((e)=>{
            console.log(e.response.data)
        })
    }
  
    return (
        <p>Agardando leitura do cartão</p>
    )
  }