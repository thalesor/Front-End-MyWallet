import style from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = style.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    h1 {
        font-weight: bold;
        font-size: 26px;
        color: #FFFFFF;
    }
    
    img {
        cursor: pointer;
        width: 23px;
        height: 24px;
    }
`;

const Footer = style.div`
    display: flex;
    width: 100%;
    gap: 15px;
    margin-top: 15px;
`;

const Button = style(Link)`
    width: 50%;
    height: 114px;
    background: #A328D6;
    border: 0;
    outline: 0;
    border-radius: 5px;
    padding: 16.81px 0 9px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    &:hover
    {
        filter: brightness(2);
    }

    img
    {
        width: 22px;
        height: 22px;
    }

    span {
        font-weight: bold;
        font-size: 17px;
        color: #FFFFFF;
        width: 64px;
        text-align: left;
    }
`

const ContentBox = style.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 22px;
    width: 100%;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 23px 12px 10px 12px;
`;

const List = style.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    padding-inline: 12px;
    padding-bottom: 20px;
    overflow-y: scroll;
`;

const EntryRow = style.div`
    display: flex;
    gap: 16px;
    word-wrap: break-word;
`;

const DateLegend = style.span`
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`;

const DescriptionLegend = style.span`
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: 140px;
`;

const ValueLegend = style.span`
    font-size: 16px;
    line-height: 19px;
    margin-left: auto;
    color: ${(props) => props.type === 'income' ? "#03ac00" : "#C70000"};
`;

const NoRegistryLegend = style.span`
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    width: 180px;
    display: block
`;

const BalanceBox = style.div`
    height: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-inline: 11px;
`;

const BalanceLegend = style.strong`
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
`;

const BalanceValueLegend = style.span`
    font-size: 17px;
    line-height: 20px;
    color: #03AC00;
    color: ${(props) => props.type === 'positive' ? "#03ac00" : "#C70000"};
`;

export {
    Navbar,
    Footer,
    ContentBox,
    Button,
    EntryRow,
    DateLegend,
    DescriptionLegend,
    ValueLegend,
    BalanceBox,
    BalanceLegend,
    BalanceValueLegend,
    List,
    NoRegistryLegend
}