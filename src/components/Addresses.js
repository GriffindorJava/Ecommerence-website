import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddressCard from "../components/AddressCard";

const Addresses = () => {
    const [addresses, setAddresses] = useState([
        {
            id: 41,
            street: 'Czarnowiejska',
            streetNumber: 5,
            postalCode: 35511,
            city: 'Kraków',
            country: 'Polska',
        },
        {
            id: 42,
            street: 'Wolska',
            streetNumber: 2,
            postalCode: 35511,
            city: 'Kraków',
            country: 'Polska',
        },
        {
            id: 43,
            street: 'Stanisława Lema',
            streetNumber: 5,
            postalCode: 35511,
            city: 'Kraków',
            country: 'Polska',
        }
    ]);

    const handleDelete = (id) => {
        console.log(id);
        setAddresses(addresses.filter((address) => address.id !== id));
        console.log(addresses);
    };


    const handleAdd = () => {
        const newElement = {
            id: '',
            street: '',
            streetNumber: '',
            postalCode: '',
            city: '',
            country: ''
            };
        setAddresses([...addresses, newElement]);
        console.log('Add');
        console.log(addresses);
    };

    return (
        <div>
            {addresses.map((a) => (
                <div key={a.id.toString()}>
                    <AddressCard id={a.id} street={a.street} streetNumber={a.streetNumber} postalCode={a.postalCode} city={a.city} country={a.country} onDelete={handleDelete} />
                </div>
            ))}
            <Button onClick={handleAdd}>ADD</Button>
        </div>
    )
}

export default Addresses
