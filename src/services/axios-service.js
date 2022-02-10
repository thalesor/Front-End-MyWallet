import axios from 'axios';

// USERS
async function getUser(data) 
{
    const requisitionObj = await axios.post("http://localhost:5000/user/signin", data);
    return requisitionObj;
}

async function insertUser(data) 
{
    const requisitionObj = await axios.post("http://localhost:5000/user/signup", data);
    return requisitionObj;
}

// REGISTRIES
async function getRegistries(token) 
{
    const requisitionObj = await axios.get("http://localhost:5000/registry", {
        headers: {
            Authorization: `Bearer ${token}`
          }
    });
    return requisitionObj;
}

async function insertRegistry(data, token) 
{
    data.Authorization = token;
    const requisitionObj = await axios.post("http://localhost:5000/registry", data
    );
    return requisitionObj;
}

async function deleteSession(token)
{
    const requisitionObj = await axios.delete("http://localhost:5000/session", {
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