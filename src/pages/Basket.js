import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasketItems from '../components/BasketItems'
import { Link } from "react-router-dom";

const Basket = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {/* ITEMS */}
            <Box
                container columns={{ xs: 12, sm: 12, md: 12, xl: 12, xxl: 12 }} 
                spacing={4}
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                sx={{ minWidth: '70% '}}
            >
                <h1>Items</h1>
                <BasketItems/>
            </Box>

            {/* SUMMUP */}
            <Box
                container columns={{ xs: 12, sm: 12, md: 12, xl: 12, xxl: 12 }} 
                spacing={4}
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                sx={{ minWidth: '20% ', minHeight: "auto"}}
            >
                <Card>
                    <CardContent>
                        <Typography sx={{ color: 'black', display: 'block', fontSize: 20 }}>
                            SUMA: ___ PLN
                        </Typography>
                        <Button component={Link} to={'/order'}>
                            ORDER
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default Basket
