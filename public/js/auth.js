import { url } from "./config.js"

export const authentifier=(login,pwd)=>{
    const dataToSend = {login:login,pwd:pwd}
    fetch(url+"/users/login",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok)
        {
            window.location="#application"
        }
        else{
            alert("echec d'authentification")
        }
    })
    .catch(err=>console.log(err));
}