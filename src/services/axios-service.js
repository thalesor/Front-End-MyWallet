import axios from 'axios';

// USERS
async function getUser(data) 
{
    const requisitionObj = await axios.post("https://back-wallet.herokuapp.com/user/signin", data);
    return requisitionObj;
}

async function insertUser(data) 
{
    const requisitionObj = await axios.post("https://back-wallet.herokuapp.com/user/signup", data);
    return requisitionObj;
}

// REGISTRIES
async function getRegistries(token) 
{
    const requisitionObj = await axios.get("https://back-wallet.herokuapp.com/registry", {
        headers: {
            Authorization: `Bearer ${token}`
          }
    });
    return requisitionObj;
}

async function insertRegistry(data, token) 
{
    data.Authorization = token;
    const requisitionObj = await axios.post("https://back-wallet.herokuapp.com/registry", data
    );
    return requisitionObj;
}

async function deleteSession(token)
{
    const requisitionObj = await axios.delete("https://back-wallet.herokuapp.com/session", {
        headers: {
            token: `${token}`
          }
    });
    return requisitionObj; 
}

export {
    insertUser,
    getUser,
    insertRegistry,
    getRegistries,
    deleteSession
}