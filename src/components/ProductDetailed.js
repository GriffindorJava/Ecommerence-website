import React from 'react'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import ProductDetailedBox from './ProductDetailedBox';
import Opinions from './Opinions';

const ProductDetailed = () => {
    let { productId } = useParams();
    console.log({productId});

    const pD = {
        id: productId,
        name: 'Amarena Detailed',
        description: 'aLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum',
        imagePath: '/assets/amarena.jpg',
        unitPrice: 420,
        unitsInStock: 5,
        categoryId: 5,
        rating: 4.2,
        ratingsNumber: 10,
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <Box
                container columns={{ xs: 12, sm: 12, md: 12, xl: 12, xxl: 12 }} 
                spacing={4}
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                sx={{ maxWidth: '70% '}}
            >
                <ProductDetailedBox 
                id={pD.id}
                name={pD.name} 
                imagePath={pD.imagePath} 
                unitPrice={pD.unitPrice} 
                unitsInStock={pD.unitsInStock} 
                rating={pD.rating} 
                ratingsNumber={pD.ratingsNumber} 
                />
                <h1>Description</h1>
                <h2>{pD.description}</h2>
                <h1>Opionions</h1>
                <Opinions/>
            </Box>
        </div>
    )
}

export default ProductDetailed
