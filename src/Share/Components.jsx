import style from 'styled-components';
import { Link } from 'react-router-dom';


const AppContainer = style.div`
    background-color: #8c11be;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 25px 25px 16px 25px;
    justify-content: center;
    align-items: center;
`;

const Container = style.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const Form = style.form`
    width: 326px;
    display: flex;
    flex-direction: column;
    gap: 13px;
`;

const Input = style.input`
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 15px;
    height: 58px;
    background-color: ${(props) => props.disabled ?
    "#F2F2F2" : "#FFFFFF"};
    color: ${(props) => props.disabled &&
    "#AFAFAF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    outline: 0;
    cursor: ${(props) => props.disabled && "not-allowed"};
    &::placeholder {
        color: #DBDBDB;
    }
`;

const FormButton = style.button`
    width: 100%;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    color: #FFFFFF;
    border: 0;
    outline: 0;
    opacity: ${(props) => props.disabled && "0.7"};
    cursor: ${(props) => props.disabled && "not-allowed"};
`;

const LinkTag = style(Link)`
    text-decoration: none;
    font-size: 15px;
    text-align: center;
    width: 100%;
    margin-top: 36px;
    display: flex;
    justify-content: center;
    color: #FFFFFF;
    font-weight: bold;
`

const Logo = style.h1`
    font-family: 'Saira Stencil One', cursive;
    font-style: normal;
    font-weight: 400;
    color: #FFFFFF;
    font-size: 32px;
    margin-bottom: 38px;
`;

const Legend = style.h1`
    font-weight: bold;
    font-size: 26px;
    color: #FFFFFF;
`;

const VerticalSeparator = style.div`
    width: 100%;
    height: ${(props) => props.amount}px;
`;


export {
    Container,
    AppContainer,
    Logo,
    Legend,
    Form,
    Input,
    FormButton,
    LinkTag,
    VerticalSeparator
}
