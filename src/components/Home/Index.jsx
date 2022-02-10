import React, { useState, useLayoutEffect, useContext } from 'react';
import plusicon from '../../assets/plus-circle-outline.png';
import minusicon from '../../assets/minus-circle-outline.png';
import dooricon from '../../assets/door.png';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import { Footer, Navbar, ContentBox, Button, EntryRow, DateLegend, List, NoRegistryLegend,
DescriptionLegend, ValueLegend, BalanceBox, BalanceLegend, BalanceValueLegend}
from './Styles';
import { Legend, Container } from '../../Share/Components';
import { dinero, add, subtract, toSnapshot } from 'dinero.js';
import { getRegistries } from '../../services/axios-service';
import dayjs from 'dayjs';

const Home = () =>
{
    const { userData, message, hideMessage, logout, formatMoney } = useContext(UserContext);
    const [registriesList, setRegistriesList] = useState(null);
    const [total, setTotal] = useState(null);
    const { BRL } = window['@dinero.js/currencies'];
    let navigate = useNavigate();
    
    useLayoutEffect(() => {
        if(!localStorage.getItem("userData"))
        {
            navigate('/');
        }
    }, []);

    useLayoutEffect(() => {
        async function fetchData() 
        {
            try 
            {
                const registries = await getRegistries(userData.token);
                const registriesObj = {
                    list: [...registries.data].reverse(),
                    total: dinero({ amount: 0, currency: BRL })
                };
                registriesObj.list.forEach(reg=> {
                    const moneyCents = parseInt(reg.value.replace(/[\D]+/g,''));
                    const d1 = registriesObj.total;
                    const d2 = dinero({ amount: moneyCents, currency: BRL });
                    if(reg.type === "income")
                        registriesObj.total = add(d1, d2);
                    else
                    registriesObj.total = subtract(d1, d2);
                });
                registriesObj.total = ''+toSnapshot(registriesObj.total).amount;
                setRegistriesList([...registriesObj.list]);
                setTotal(registriesObj.total);
            }
            catch(err)
            {
                message(err.response.data, 'error', 'Falha!', hideMessage());
            }
        }
        fetchData();
    }, []);

    return <>
    <Container>
        <Navbar>
            <Legend>Olá, {userData?.name}</Legend>
            <img src={dooricon} onClick={() => logout(userData?.token)}></img>
        </Navbar>
        { registriesList?
        (
        <ContentBox>
        <List>
       { 
            registriesList.map((reg) => 
            {
                return (
                   <EntryRow>
                       <DateLegend>{ dayjs(reg.create_date).format("DD/MM") }</DateLegend>
                       <DescriptionLegend>{reg.description}</DescriptionLegend>
                       <ValueLegend type={reg.type}>{reg.value}</ValueLegend>
                    </EntryRow>
                );
            })
        }
        </List>
        <BalanceBox>
            <BalanceLegend>TOTAL</BalanceLegend>
            <BalanceValueLegend type={total > 0 && 'positive'}>R$ {total < 0 && '-'} {formatMoney(total)}</BalanceValueLegend>
        </BalanceBox>
        </ContentBox>
        )
        : 
        <ContentBox>
            <NoRegistryLegend>Não há registros de entrada ou saída</NoRegistryLegend>
        </ContentBox>
        }
        <Footer>
            <Button to={'/entrada'}>
                <img src={plusicon}/>
                <span>Nova entrada</span>
            </Button>
            <Button to={'/saida'}>
                <img src={minusicon}/>
                <span>Nova saída</span>
            </Button>
        </Footer>
    </Container>
      </>
}

export default Home;