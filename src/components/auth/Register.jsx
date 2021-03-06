import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import IndexNavbar from "../Navbars/IndexNavbar";

function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [shopName, setShopName] = useState();
    const [shopOwner, setShopOwner] = useState();
    const [shopAddress, setShopAddress] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = {email, password, passwordCheck, shopName, shopOwner, shopAddress, contactNumber};
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }

    };

    return (
        <div className="login">
            <IndexNavbar fixed/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <section className="header relative pt-0 items-center flex h-screen max-h-860-px">
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)}/>}<br/>
                <div className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"/>
                <div className="container mx-auto px-4 h-full">

                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            {/*<div className=" flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">*/}

                            <div
                                className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">


                                <div className="rounded-t mb-0 px-6 py-6">


                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-center mb-3">
                                            <h6 className=" text-xl font-bold">Registration for Shop</h6>
                                        </div>
                                        {error &&
                                        <ErrorNotice message={error} clearError={() => setError(undefined)}/>}

                                        <div className="mt-10">
                                            <form onSubmit={submit}>


                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Email
                                                    </label>
                                                    <input type="email" id="email" placeholder="Email"
                                                           className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           onChange={e => setEmail(e.target.value)}/>
                                                </div>


                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Password:
                                                    </label>
                                                    <input type="password" id="password" placeholder="Password"
                                                           className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           onChange={e => setPassword(e.target.value)}/>
                                                </div>

                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Confirm Password:
                                                    </label>
                                                    <input type="password" id="Confirm password"
                                                           placeholder="Confirm Password"
                                                           className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           onChange={e => setPasswordCheck(e.target.value)}/>
                                                </div>

                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Shop Name:
                                                    </label>
                                                    <input type="text" id="shop-name" placeholder="Shop Name"
                                                           className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           onChange={e => setShopName(e.target.value)}/>
                                                </div>

                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Shop Owner:
                                                    </label>
                                                    <input type="text" id="shop-owner" placeholder="Shop Owner"
                                                           className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           onChange={e => setShopOwner(e.target.value)}/>
                                                </div>

                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Shop address:
                                                    </label>
                                                    <input type="text" id="shop-address" placeholder="Shop Address"
                                                           className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           onChange={e => setShopAddress(e.target.value)}/>
                                                </div>

                                                <div className="relative w-full mb-3">
                                                    <label
                                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                        htmlFor="grid-password"
                                                    >
                                                        Contact number:
                                                    </label>
                                                    <input type="text" id="contact-number" placeholder="Contact Number"
                                                           className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                           onChange={e => setContactNumber(e.target.value)}/>
                                                </div>


                                                <div className="text-center mt-6">
                                                    <button type="submit"
                                                            value="Login"
                                                            onClick={submit}
                                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    >Register
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}

export default Register;
