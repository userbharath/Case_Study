import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import {
    Container
} from 'reactstrap';
import './login.css'
export default function Login({currentUser, loginUser}) {
    const [credentials, setCredentials] = useState({
        phoneNum:'',
        password: "",
    });
    async function handleLogin(e){
        e.preventDefault();
        var raw = JSON.stringify(credentials);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Credentials', 'POST, GET, OPTIONS');
        myHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
        myHeaders.append('Accept','application/json');
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            referrerPolicy: 'unsafe-url',
            mode: 'cors',
        };
        const response = await fetch('http://localhost:8090/Guest/authenticate', requestOptions).then(response => { return response.json() });
        console.log(response)
        if(response.status=='true'){
            loginUser(response);
        }
    }
    if(currentUser.isAuthenticated){
        return <Redirect from="/auth" to="/" />
    }
    return (
        <div>
            <form className="form-signin" >
                <div class="mb-4"alt="">
                    
                </div>
                <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
                <label for="inputEmail" class="sr-only">Username:</label>
                <input type="number" id="inputEmail" className="form-control mb-4 " value={credentials.phoneNum} onChange={(e)=>{setCredentials({...credentials,phoneNum:e.target.value})}} placeholder="Username" required autofocus="" />
                <label for="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control mb-4" value={credentials.password} onChange={(e)=>{setCredentials({...credentials,password:e.target.value})}} placeholder="Password" required />
                <button className="btn btn-lg btn-primary btn-block" onClick={(e)=>handleLogin(e)}>Login</button>
            </form>
            {/* <Container>
                <div className="head">
                    This is Auth
                </div>
            </Container> */}
        </div>
    )
}

