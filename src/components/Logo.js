import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Logo() {

    return (
        <Container>
            <img src={logo} alt="logo"/>
            <div>
                <p><span>S</span>mart</p>
                <p><span>P</span>arking</p> 
            </div>
        </Container>
    );
}

const Container = styled.header`
    display: flex;
    padding:10px 0 10px 0;
    justify-content: center;
    align-items:  center;
    background-color: #fa5d59;
    gap: 15px;
    img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
    }
    div{
        display: flex;
        @media (max-width: 600px) {
            flex-direction: column;
        }
    }
    p{
        font-size: 50px;
        color: white;
        @media (max-width: 600px) {
            font-size: 25px;
            letter-spacing: 1px;
        }
    }
    span{
        font-size: 70px;
        margin-left: 5px;
        @media (max-width: 600px) {
            font-size: 30px;
            margin-left: 0;
        }
    }
    
`;