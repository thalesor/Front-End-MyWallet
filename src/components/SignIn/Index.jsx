import React, { useState, useContext, useLayoutEffect } from 'react';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import { validateSignUser } from '../../services/joi-service';
import { getUser } from '../../services/axios-service';
import { Logo, Form, Input, FormButton, LinkTag} from '../../Share/Components';

const SignIn = () =>
{
    const { userData, setUserData, message } = useContext(UserContext);
    let navigate = useNavigate();

    useLayoutEffect(() => 
    {
        if(localStorage.getItem("userData"))
        {
            navigate('/home');
        }
    }, [])
    
    const [isFormActive, setIsFormActive] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    async function onSignIn(e)
    {
        e.preventDefault();
        setIsFormActive(false);
        const validation = validateSignUser(formData);
        if(validation.hasErrors === false)
        {  
            try
            {
                const result = await getUser(formData);
                const dataObj = {
                    userId: result.data.userId,
                    token: result.data.token,
                    name: result.data.name
                };
                localStorage.setItem("userData", JSON.stringify(dataObj));
                setUserData(dataObj);
                navigate('/home');
            }
            catch(err)
            {
                setIsFormActive(true);
                message(err.response.data, 'error', 'Erro ao logar!');      
            }
        }
        else
        {
            setIsFormActive(true);
            message(validation.errors, 'error', 'Erro ao logar!');
        }
    }

    const onInputChange = (e) => 
    {
        setFormData({...formData, 
        [e.target.name]: e.target.value});
    }

        return <>
        <Logo>My Wallet</Logo>
        <Form onSubmit={onSignIn}>
            <Input type="email" autoComplete='false' disabled={isFormActive ? false : true} name='email' onChange={onInputChange} value={formData.email} placeholder="E-mail" required></Input>
            <Input type="password" autoComplete='false' disabled={isFormActive ? false : true} name='password' onChange={onInputChange} value={formData.password} placeholder="Senha" required></Input>
            <FormButton type="submit" disabled={isFormActive ? false : true}>
            {isFormActive 
            ? 'Entrar' 
            :
                <Loader type="Oval" color="#FFFFFF" height={35} width={35} />
            }
            </FormButton>
            <LinkTag to={`/cadastro`}>
            Não tem uma conta? Cadastre-se!
            </LinkTag>
        </Form>
        </>
}


    export default SignIn;