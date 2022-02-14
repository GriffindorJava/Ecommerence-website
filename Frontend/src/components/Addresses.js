import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddressCard from "../components/AddressCard";
import axios from "axios";


const ADDR_URL = "http://localhost:8080/test/addresses"
const ADDR_DEL_URL = "http://localhost:8080/test/delete-address/"

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAdd, setNewAdd] = useState(false);

    const handleDelete = (id) => {
        console.log("new", addresses.filter((address) => address.id !== id).new)
        if(id===-1){
            setAddresses(addresses.filter((address) => address.id !== id));
            setNewAdd(false);
        }else{
            axios.delete(ADDR_DEL_URL+id, { headers: { Authorization: AuthStr } }).then(res => {
                console.log(res.data)
            })
            setAddresses(addresses.filter((address) => address.id !== id));
        }
        console.log(id);
        console.log(addresses);
    };

    const handleAdd = () => {
        const newElement = {
            id: -1,
            street: '',
            street_number: '',
            postal_code: '',
            city: '',
            country: '',
            new: true
            };
        setAddresses([...addresses, newElement]);
        setNewAdd(true);
        console.log('Add');
        console.log(addresses);
    };

    const AuthStr = 'Bearer '.concat(localStorage.getItem("jwtToken"));

    const getAddr = () => {
        axios.get(ADDR_URL, { headers: { Authorization: AuthStr }}).then(res => {
            const addr = res.data;
            setAddresses(addr);
            console.log(addr)
        })
    }

    useEffect(() => {
        getAddr();
    }, []);

    return (
        <div>
            {addresses.map((a) => (
                <div key={a.id.toString()}>
                    <AddressCard info={a} onDelete={handleDelete}/>
                </div>
            ))}
            {(addresses && addresses.length < 5 && newAdd === false) && <Button onClick={handleAdd}>ADD</Button>}
        </div>
    )
}

export default Addresses
