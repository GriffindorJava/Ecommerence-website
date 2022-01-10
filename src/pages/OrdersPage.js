import React from 'react'
import Box from '@mui/material/Box';
import Order from '../components/Order'
import Orders from '../components/Orders'

const OrdersPage = () => {
    return (
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
                <Orders/>
            </Box>
        </Box>
    )
}

export default OrdersPage
