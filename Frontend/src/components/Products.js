import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material"
import Product from "./Product"
import Pagination from "@mui/material/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductionQuantityLimits } from "@mui/icons-material";

const MAIN_URL = "http://localhost:8080/test/products"
const SEARCH_URL = ""
const FILTER_URL = "http://localhost:8080/test/filteredProducts"
const per_page = [12, 24, 36, 48];
const order_by = [{
    value: 'price_asc',
    enum: ['unit_price', 'asc'],
},
{
    value: 'price_desc',
    enum: ['unit_price', 'desc'],
},
{
    value: 'rating_asc',
    enum: ['average_rating', 'asc'],
},
{
    value: 'rating_desc',
    enum: ['average_rating', 'desc'],
},
{
    value: 'name_asc',
    enum: ['name', 'asc'],
},
{
    value: 'name_desc',
    enum: ['name', 'desc'],
},];

const Products = (props) => {
    const [products, setProducts] = useState({
        products: [],
        quantity: 0
    });
    const [page, setPage] = useState(1);
    const [pageMax, setPageMax] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const navigate = useNavigate();

    const getProducts = () => {
        let url = new URL(window.location.href); // or construct from window.location
        let params = new URLSearchParams(url.search.slice(1));
        //console.log("xd",typeof(params.toString()))

        if (params && params.length > 0) {
            console.log("wiecej niz 0")
        }

        const postBodyDef = {
            categories: null,
            minPrice: null,
            maxPrice: null,
            page: "0",
            size: "12",
            fieldToSortBy: "average_rating",
            sortDirection: "desc",
            searchValue: null,
        };

        if (params.get('min_price')) {
            postBodyDef.minPrice = params.get('min_price');
        }
        if (params.get('max_price')) {
            postBodyDef.maxPrice = params.get('max_price');
        }
        if (order_by.find((item) => item.value == params.get('order_by'))) {
            let orderEnum = (order_by.find((item) => item.value == params.get('order_by')));
            console.log(orderEnum)
            postBodyDef.fieldToSortBy = orderEnum.enum[0];
            postBodyDef.sortDirection = orderEnum.enum[1];
        }
        if (params.get('id')) {
            let categories = params.getAll('id');
            postBodyDef.categories = categories;
        }
        if (params.get('q')) {
            postBodyDef.searchValue = params.get('q');
        }
        if (per_page.find((item) => item == params.get('per_page'))) {
            postBodyDef.size = params.get('per_page');
            setPerPage(params.get('per_page'));
        }
        if (params.get('page') && (params.get('page') - 1) >= 0) {
            console.log("ssss")
            postBodyDef.page = postBodyDef.size * (params.get('page') - 1);
        }

        console.log(postBodyDef)
        axios.post(FILTER_URL, postBodyDef).then(res => { //MAIN_URL FILTER_URL
            const items = res.data;
            console.log(items);
            setPageMax(parseInt(Math.ceil(items.quantity / postBodyDef.size)));
            console.log(parseInt(Math.ceil(items.quantity / postBodyDef.size)))
            if (items.products.length == 0 && items.quantity > 0) {
                console.log("error")
                let url = new URL(window.location.href); // or construct from window.location
                let params = new URLSearchParams(url.search.slice(1));
                console.log("aaa")
                params.delete('page');
                setPage(1);
                navigate(`${window.location.pathname}?${params}`);
                window.location.reload(false);
            } else {
                console.log(items);
                setProducts(items);
            }
        })
    };

    {/* */ }

    const handleChangePage = (event, newPage) => {
        let url = new URL(window.location.href); // or construct from window.location
        let params = new URLSearchParams(url.search.slice(1));
        let prev = window.location.pathname;

        params.set('page', newPage);
        navigate(`${window.location.pathname}?${params}`)
        setPage(newPage);
        if (prev === '/') {
            window.location.reload(false);
        }
    };

    useEffect(() => {
        let url = new URL(window.location.href); // or construct from window.location
        let params = new URLSearchParams(url.search.slice(1));
        if (params.get('page')) {
            if (/^[0-9]{1,2}$/.test(params.get('page')) && (params.get('page') - 1) >= 0) {
                setPage(parseInt(params.get('page')));
            }
        }

        getProducts();
        switch (window.location.pathname) {
            case '/':
                console.log("MAIN");
                break
            case '/search':
                console.log("SEARCH");
                break
        }
    }, [props.rerender]);//props.rerender

    return (
        <Grid
            container
            spacing={4}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
        >
            {(products.products && products.products.length > 0) && <Pagination count={pageMax} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} sx={{ m: 3 }} />}
            <Grid
                container columns={{ xs: 12, sm: 6, md: 4, xl: 4, xxl: 3 }}
                spacing={4}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                {products.products.map((product) => (
                    <Grid item key={product.name}>
                        <Product id={product.id} name={product.name} rating={product.average_rating} price={product.unitPrice} image={product.imagePath} />
                    </Grid>
                ))}
            </Grid>
            {(products.products && products.products.length > 0) && <Pagination align="right" count={pageMax} variant="outlined" shape="rounded" page={page} onChange={handleChangePage} sx={{ m: 3 }} />}
        </Grid>
    )
}

export default Products