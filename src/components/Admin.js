import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchUserInfo from "./SearchUserInfo";
import AddCredit from "./AddCredits";
import RegisterNewTag from "./RegisterNewTag";

export default function Admin(){
    function showToast(message,type){
        type==="error"?toast.error(message):toast(message);
    }

    return(
        <Container>
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
            <SearchUserInfo showToast={showToast}/>
            <RegisterNewTag showToast={showToast}/>
            <AddCredit showToast={showToast}/>
        </Container>
    );
}

const Container = styled.div`
    cursor: default;
    width: 100%;
    height: 100vh;
    padding-top: 150px;
    background-color: #767679;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    gap:20px;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        padding-top: 120px;
    }
`;