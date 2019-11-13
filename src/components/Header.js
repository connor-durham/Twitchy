import React, { useEffect } from "react"
import {Link} from "react-router-dom"
import { Auth } from 'aws-amplify'
import { Dropdown } from "react-bootstrap"
import axios from "axios";


function Header() {


    let user = localStorage.getItem("CognitoIdentityServiceProvider.kih6th6mjfivrhisimmkplm6.LastAuthUser")

    const getUser = () => {
        axios.get('/user', {
            params: {
              username: user
            }
          }).then((res) => {
            console.log('the res', res);
        });
    };

    useEffect(() => {
       getUser();
    });

    const signMeOut = () => {
        Auth.signOut()
            .then(()=> localStorage.clear())
            .catch(err => console.log(err))
    }

    return(
        <nav className="navbar pb-4 pt-4 justify-content-center">
            <li className="nav-item nav-link">
                <Link to="/">Top Games</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/top-streams">Top Live Streams</Link>
            </li>
           
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                   {localStorage.getItem("CognitoIdentityServiceProvider.kih6th6mjfivrhisimmkplm6.LastAuthUser")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/homepage">Favorites</Dropdown.Item>
                    <Dropdown.Item onClick={signMeOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>    
        </nav>
    )
}

export default Header