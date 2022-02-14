import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const sizes = ['0.5 L', '0.7 L', '1 L', '1.5 L'];

const per_page = [12, 24, 36, 48];

const order_by = [
    {
        value: 'price_asc',
        label: 'Price(Asc)',
    },
    {
        value: 'price_desc',
        label: 'Price(Desc)',
    },
    {
        value: 'rating_asc',
        label: 'Raitng(Asc)',
    },
    {
        value: 'rating_desc',
        label: 'Raitng(Desc)',
    },
    {
        value: 'name_asc',
        label: 'Name(A-Z)',
    },
    {
        value: 'name_desc',
        label: 'Name(Z-A)',
    },
];

const Filter = (props) => {
    const [categoriesID, setCategoriesID] = useState([]);
    const [categories, setCategories] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [orderBy, setOrderBy] = useState('rating_desc');
    const [perPage, setPerPage] = useState(12);
    const navigate = useNavigate();

    const handleChangeOrder = (event) => {
        setOrderBy(event.target.value);
    };

    const handleChangePerPage = (event) => {
        setPerPage(event.target.value);
    };

    const handleMin = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMax = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleFilter = () => {
        let url = new URL(window.location.href); // or construct from window.location
        let params = new URLSearchParams(url.search.slice(1));

        if (minPrice !== '') {
            params.set('min_price', minPrice)
        }
        if (maxPrice !== '') {
            params.set('max_price', maxPrice)
        }
        if (order_by.find((item) => item.value == orderBy)) {
            params.set('order_by', orderBy)
        }else{
            params.delete('order_by');
        }
        if (per_page.find((item) => item == perPage)) {
            params.set('per_page', perPage)
        }else{
            params.delete('per_page');
        }
        if (categoriesID) {
            params.delete('id');
            categoriesID.forEach(item => {
                //console.log(item)
                params.append('id', item)
            })
        }
        params.delete('page');
        props.handleFilter();
        //console.log(params)
        navigate(`${window.location.pathname}?${params}`)
        //window.location.reload(false);
    };

    const handleCatCheckbox = (e) => {
        const isChecked = e.target.checked;
        console.log("def",e.target.defaultChecked)
        const existingID = categoriesID.find((item) => e.target.value === item);

        if (isChecked && existingID !== e.target.value) {
            setCategoriesID([...categoriesID, e.target.value]);
        } else if (!isChecked) {
            setCategoriesID(categoriesID.filter((item) => item !== e.target.value));
        }
        //console.log(categoriesID)
    };

    const handleCatCheckboxRefresh = (id) => {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search.slice(1));

        if (params.getAll('id').some((item1) => item1 == id)) {
            return true
        } else {
            return false
        }
    };

    const getCategories = () => {
        axios.get('http://localhost:8080/test/categories').then(res => {
            const categories = res.data;
            setCategories(categories);
        })
    };

    useEffect(() => {
        getCategories();
        handleCatCheckboxRefresh();
    }, []);

    useEffect(() => {
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search.slice(1));
        {/*for (let p of params) {
            console.log(p);
        }
         TODO
            sprawdzenie czy podane w query wartosci sa poprawne, jesli nie to dac domyslne
        */}
        if (params.get('min_price')) {
            setMinPrice(params.get('min_price'));
        }
        if (params.get('max_price')) {
            setMaxPrice(params.get('max_price'));
        }
        if (order_by.find((item) => item.value == params.get('per_page'))) {
            setOrderBy(params.get('order_by'));
        }
        if (per_page.find((item) => item == params.get('per_page'))) {
            setPerPage(params.get('per_page'));
        }
        if (params.getAll('id')) {
            setCategoriesID(params.getAll('id'));
            //console.log("params all",params.getAll('id'))
            //console.log("cat all", categoriesID)
        }
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <FormGroup>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Typography>Categories</Typography>
                    {categories.map((item) => (
                        <FormControlLabel key={item.id} control={<Checkbox value={item.id} onChange={handleCatCheckbox} defaultChecked={handleCatCheckboxRefresh(item.id)}/>} label={item.name} />
                    ))}
                    {/*
                    <Typography>Sizes</Typography>
                    {sizes.map((size) => (
                        <FormControlLabel key={size} control={<Checkbox />} label={size} />
                    ))}
                    */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TextField
                            label="Min price"
                            value={minPrice}
                            onChange={handleMin}
                            InputProps={{
                                inputProps: {
                                    max: 9990, min: 0
                                }
                            }}
                            type="number"
                            sx={{ m: 1, width: '100px' }}
                        />
                        <TextField
                            label="Max price"
                            value={maxPrice}
                            onChange={handleMax}
                            InputProps={{
                                inputProps: {
                                    max: 10000, min: 10
                                }
                            }}
                            type="number"
                            sx={{ m: 1, width: '100px' }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Items"
                            value={perPage}
                            onChange={handleChangePerPage}
                            sx={{ m: 1 }}
                        >
                            {per_page.map((option) => (
                                <MenuItem key={option.toString()} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Order by"
                            value={orderBy}
                            onChange={handleChangeOrder}
                            sx={{ m: 1 }}
                        >
                            {order_by.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Button onClick={handleFilter}>Filter</Button>
                </Grid>
            </FormGroup>
        </Box>
    )
}

export default Filter
