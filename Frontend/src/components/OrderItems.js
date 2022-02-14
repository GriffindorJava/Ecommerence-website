import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from "axios";

const OrderItems = () => {
    const [items, setItems] = useState([]);

    const getItems = () => {
        const postBody = {
            "page": "0",
            "size": "10",
            "fieldToSortBy": "name",
            "sortDirection": "ASC"
        };
        axios.post('http://localhost:8080/test/products', postBody).then(res => {
            const items = res.data;
            //console.log(items);
            setProducts(items);
        })
    };

    useEffect(() => {
        //getItems();
    }, []);

    return (
        <div>
            {items.map((item) => (
                <div key={item.id.toString()}>
                    <Card style={{ margin: 10 }} sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    style={{
                                        width: "auto",
                                        margin: "5px"
                                    }}
                                    image={item.imagePath}
                                    alt=""
                                />
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="space-evenly"
                                    alignItems="flex-start"
                                >
                                    <Typography sx={{ fontSize: 30 }} component={Link} to={'/product/' + item.id}>
                                        {item.name}
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item >
                                            <Box sx={{ display: 'flex' }}>
                                                <Rating name="half-rating-read" value={3} precision={0.1} readOnly sx={{ fontSize: 27 }} />
                                                <Typography sx={{ fontSize: 20 }}>
                                                    {item.rating} ({10})
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item >
                                            <Typography sx={{ color: 'black', display: 'block', fontSize: 20 }}>
                                                {item.price} ({item.quantity * item.price}) PLN
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography sx={{ fontSize: 26 }}>
                                                    {item.quantity}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            ))}
            <Typography sx={{ color: 'black', display: 'block', fontSize: 20 }}>
                Full price
            </Typography>
        </div>
    )
}

export default OrderItems
