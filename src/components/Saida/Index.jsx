import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import Loader from "react-loader-spinner";
import { validateRegistry } from '../../services/joi-service';
import { insertRegistry } from '../../services/axios-service';

import { Legend, Container, Form, Input, FormButton, VerticalSeparator} from '../../Share/Components';

const Saida = () =>
{
    const { message, hideMessage, userData, formatMoney } = useContext(UserContext);
    let navigate = useNavigate();
    
    const [isFormActive, setIsFormActive] = useState(true);
    const [formData, setFormData] = useState({
        value: '',
        description: ''
    });

    useEffect(() => 
    {
        if(!userData)
        {
            navigate('/');
        }
    }, []);

    async function onSaveRegistry(e)
    {
        e.preventDefault();
        setIsFormActive(false);
        const validation = validateRegistry(formData);  
        //se a validação front-end passar
        if(validation.hasErrors === false)
        {
            try
            {
                await insertRegistry({...formData, userId : userData.userId, create_date: Date.now(), type:'outcome'}, userData.token);
                message(`Sua saída foi registrada 😑`, 'success', 'Tudo certo?', hideMessage());
                navigate('/home');
            }
            catch(err)
            {   //erro ao inserir registro+
                setIsFormActive(true);
                message(err.response.data, 'error', 'Falha!', hideMessage());
            }
        }
        else
        {
            setIsFormActive(true);
            message(validation.errors, 'error', 'Falha!', hideMessage());
        }
    }

    const onInputChange = (e) => 
    {
        if(e.target.name === 'value')
        e.target.value = formatMoney(e.target.value);
        setFormData({...formData, 
        [e.target.name]: e.target.value});
    }
    return <>
    <Container>
        <Legend>Nova saída</Legend>
        <VerticalSeparator amount={40} />
        <Form onSubmit={onSaveRegistry}>
        <Input type="text" autoComplete='false' disabled={isFormActive ? false : true} name='value' onChange={onInputChange}  value={formData.value} placeholder="Valor" required></Input>
        <Input type="text" autoComplete='false' disabled={isFormActive ? false : true} name='description' onChange={onInputChange} value={formData.description} placeholder="Descrição" required></Input>
        <FormButton type="submit" disabled={isFormActive ? false : true}>
        {isFormActive 
        ? 'Entrar' 
        :
        <Loader type="Oval" color="#FFFFFF" height={35} width={35} />
        }
        </FormButton>
      </Form>
    </Container>
      </>
}

export default Saida;