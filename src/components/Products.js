import React, { useState } from "react";
import { Grid } from "@mui/material"
import Product from "./Product"
import Pagination from "@mui/material/Pagination";

const Products = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Amarena 1',
            rating: 0,
            price: 100,
        },
        {
            id: 2,
            name: 'Amarena 2',
            rating: 4,
            price: 200,
        },
        {
            id: 3,
            name: 'Amarena 3',
            rating: 4.2,
            price: 300,
        },
        {
            id: 4,
            name: 'Amarena 4',
            rating: 3.3,
            price: 400,
        },
        {
            id: 5,
            name: 'Amarena 5',
            rating: 2.8,
            price: 500,
        },
        {
            id: 6,
            name: 'Amarena 6',
            rating: 5,
            price: 600,
        },
        {
            id: 7,
            name: 'Amarena 7',
            rating: 5,
            price: 700,
        },
        {
            id: 8,
            name: 'Amarena 8',
            rating: 4.9,
            price: 800,
        },
        {
            id: 9,
            name: 'Amarena 9',
            rating: 2,
            price: 900,
        },
        {
            id: 10,
            name: 'Amarena 10',
            rating: 4,
            price: 1000,
        },
    ]);

    return (
        <Grid
            container
            spacing={4}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
        >
            <Pagination count={20} variant="outlined" shape="rounded" sx={{m:3}}/>
            <Grid
                container columns={{ xs: 12, sm: 6, md: 4, xl: 4, xxl: 3 }}
                spacing={4}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                {products.map((product) => (
                    <Grid item key={product.id.toString()}>
                        <Product id={product.id} name={product.name} rating={product.rating} price={product.price} />
                    </Grid>
                ))}
            </Grid>
            <Pagination count={20} variant="outlined" shape="rounded" sx={{m:3}}/>
        </Grid>
    )
}

export default Products