import React, { useState, useEffect, useContext } from 'react';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import { validateUser } from '../../services/joi-service';
import { insertUser } from '../../services/axios-service';

import { Logo, Form, Input, FormButton, LinkTag} from '../../Share/Components';

const SignUp = () =>
{
    const [isFormActive, setIsFormActive] = useState(true);
    const { userData, message, hideMessage } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        repassword: ''
    })
    let navigate = useNavigate();

    useEffect(() => 
    {
        if(userData)
        {
            navigate('/home');
        }
    }, [])

    async function onSignUp(e)
    {
        e.preventDefault();
        setIsFormActive(false);
        const validation = validateUser(formData);
        if(validation.hasErrors === false)
        {
           
           try{
                const result = await insertUser(formData);
                message(`Você foi cadastrado 🥰`, 'success', 'Sucesso!', hideMessage());
                navigate('/');
           }
           catch(err)
           {
            message(err.response.data, 'error', 'Erro ao cadastrar!');
            setIsFormActive(true);
           }
        }
        else
        {
            message(validation.errors, 'error', 'Erro ao cadastrar!');
            setIsFormActive(true);
        }
    }

    const onInputChange = (e) => 
    {
        setFormData({...formData, 
        [e.target.name]: e.target.value});
    }

    return <>
    <Logo>My Wallet</Logo>
      <Form onSubmit={onSignUp}>
        <Input type="text" autoComplete='false' disabled={isFormActive ? false : true} name='name' onChange={onInputChange} value={formData.name} placeholder="Nome" required></Input>
        <Input type="email" autoComplete='false' disabled={isFormActive ? false : true} name='email' onChange={onInputChange} value={formData.email} placeholder="E-mail" required></Input>
        <Input type="password" autoComplete='false' onChange={onInputChange} value={formData.password} placeholder="Senha" disabled={isFormActive ? false : true} name='password'></Input>
        <Input type="password" autoComplete='false' placeholder="Confirme a senha" onChange={onInputChange} value={formData.repassword} disabled={isFormActive ? false : true} name='repassword'></Input>
        <FormButton type="submit" disabled={isFormActive ? false : true}>
        {isFormActive 
        ? 'Cadastrar' 
        :
            <Loader type="Oval" color="#FFFFFF" height={35} width={35} />
        }
        </FormButton>
        {isFormActive &&
        <LinkTag to={`/`}>
           Já tem uma conta? Entre agora!
         </LinkTag>
        }
      </Form>
    </>
}

export default SignUp;