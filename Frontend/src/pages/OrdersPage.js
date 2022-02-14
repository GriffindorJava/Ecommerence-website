import React from 'react'
import Box from '@mui/material/Box';
import Order from '../components/Order'
import Orders from '../components/Orders'
import OrdersTable from '../components/OrdersTable';
import Menubar from "../components/Menubar";

const OrdersPage = () => {
    return (
        <div>
        <Menubar/>
        <Box sx={{
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
                sx={{ minWidth: '70% '}}
            >
                <h1>My Orders</h1>
                <OrdersTable/>
            </Box>
        </Box>
        </div>
    )
}

export default OrdersPage
