import React, { Component } from "react";
import axios from "axios";
import CardTable from "../../Cards/CardTable";
import IndexNavbar from "../../Navbars/IndexNavbar";
import Sidebar from "../../Sidebar/Sidebar";

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/customers/getall")
            .then((res) => {
                this.setState({
                    customers: res.data,
                });
            })
            .catch((err) => {
                console.log("Error from ShowCustomerList");
            });
    }

    render() {
        const customers = this.state.customers;
        //console.log("PrintCustomer: " + customers);

        return (
            <>
                <IndexNavbar fixed/>
                <Sidebar/>
                <div className="relative md:ml-64 bg-blueGray-100 mt-20">

                    <div className="ShowCustomerList">
                        <div className="container">
                            <div className="row">


                                <div className="col-md-11">

                                    <br/>
                                    <hr/>
                                </div>
                            </div>
                            <CardTable
                                title="Staff List"
                                customers={customers}
                                userStatus="staff"
                            />

                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default StaffList;
