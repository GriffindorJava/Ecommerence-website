import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import ProductDetailedBox from './ProductDetailedBox';
import OpinionAdd from "./OpinionAdd";
import Opinions from './Opinions';
import axios from "axios";

const ProductDetailed = () => {
    let { pid } = useParams();
    console.log({pid});
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        imagePath: '',
        price: '',
        unitsInStock: '',
        categoryId: '',
        rating: '',
        ratingsNumber: '',
        opinions: []
    });

    const getProductInfo = () =>{
        axios.get('http://localhost:8080/test/product/'+pid).then(res =>{
            const item = res.data;
            setProduct(item);
            console.log(item);
        })
    };

    useEffect(() => {
        getProductInfo();
    }, []);


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
                <ProductDetailedBox/>
                <h1>Description</h1>
                <h2>{product.description}</h2>
                <h1>Opinions</h1>
                {product.isAddingOpinionPossible && <OpinionAdd/>} 
                <Opinions opinions={product.opinions}/>
            </Box>
        </div>
    )
}

export default ProductDetailed
