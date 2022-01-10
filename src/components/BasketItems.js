import React, { useState } from "react";
import BasketItem from './BasketItem'


const BasketItems = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Amarena 1',
            rating: 0,
            number: 5,
            price: 100,
            unitsInStock: 5
        },
        {
            id: 2,
            name: 'Amarena 2',
            rating: 3,
            number: 3,
            price: 200,
            unitsInStock: 8
        },
        {
            id: 3,
            name: 'Amarena 3',
            rating: 4,
            number: 6,
            price: 300,
            unitsInStock: 10
        }
    ]);

    const handleDelete = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div>
            {items.map((item) => (
                <div key={item.id.toString()}>
                    <BasketItem id={item.id} name={item.name} rating={item.rating} number={item.number} price={item.price} unitsInStock={item.unitsInStock} onDelete={handleDelete}/>
                </div>
            ))}
        </div>
    )
}

export default BasketItems
