import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Order from './Order'
import axios from "axios";

const ORDERS_URL = "http://localhost:8080/test/myorders"

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const AuthStr = 'Bearer '.concat(localStorage.getItem("jwtToken"));

    const getOrders = () => {
        axios.get(ORDERS_URL, { headers: { Authorization: AuthStr } }).then(res => {
            const orders_res = res.data;
            setOrders(orders_res);
            console.log(orders_res)
        })
        //console.log(addrAPI)
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography>
                            id
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            status
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            payment method
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            shipment
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            date
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            suma PLN
                        </Typography>
                    </Grid>
                </Grid>

            {orders.map((item, index) => (
                <Order key={index.toString()} info={item} />
            ))}
        </div>
    )
}

export default Orders
