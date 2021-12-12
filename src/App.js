import React, {useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/userContext';

import ScanFaceMask from "./components/pages/Check/ScanFaceMask";
import QR from "./components/pages/Check/qr";

import Announcement from "./components/pages/Announcement/announcement";
import CustomerList from "./components/pages/viewData/CustomerList";
import StaffList from "./components/pages/viewData/StaffList";
import CovidCases from "./components/pages/viewData/covidcases";
import DailyReport from "./components/pages/viewData/DailyReport";

import ViewData from "./components/pages/viewData/ViewData";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import Landing from "views/Landing.js";
import Index from "views/Index.js";


function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
            if (tokenResponse.data) {
                const userRes = await axios.get("http://localhost:5000/users/", {
                    headers: {"x-auth-token": token},
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        }

        checkLoggedIn();
    }, []);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
                {/*<Header />*/}
                <br/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/dashboard" component={Dashboard}/>

                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>

                    <Route path="/viewdata" component={ViewData}/>

                    <Route path="/facemask" component={ScanFaceMask}/>
                    <Route path="/qr" component={QR}/>

                    <Route path="/announcement" component={Announcement}/>

                    <Route path="/customerlist" component={CustomerList}/>
                    <Route path="/stafflist" component={StaffList}/>
                    <Route path="/covidcases" component={CovidCases}/>
                    <Route path="/dailyreport" component={DailyReport}/>


                    <Route path="/landing" exact component={Landing}/>

                    <Route path="/index" exact component={Index}/>

                    <Redirect from="*" to="/"/>

                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
