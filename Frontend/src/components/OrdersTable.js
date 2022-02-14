import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const ORDERS_URL = "http://localhost:8080/test/myorders"
const ship = ["UPS", "DHL", "DPD", "FedEx", "Poczta Polska"];
const paym = ["Przelewy 24", "Blik", "VISA", "MasterCard"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  

function Row(props) {
    const { order } = props.order;
    const items = props.items;
    const totalTotalPrice = items.reduce((total, currentValue) => total = total + currentValue.totalPrice,0);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate('/product/'+id);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {order.orderTrackingNumber}
                </TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">{paym[parseInt(order.payment_method_id)-1]}</TableCell>
                <TableCell align="right">{ship[parseInt(order.shipping_method_id)-1]}</TableCell>
                <TableCell align="right">{order.date}</TableCell>
                <TableCell align="right">{totalTotalPrice}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Address: {order.street} {order.street_number}, {order.postal_code} {order.city}, {order.country}
                            </Typography>
                            <Divider orientation="horizontal" variant="middle" flexItem />
                            <Typography variant="h6" gutterBottom component="div">
                                Ordered items list
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">SUM(PLN)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>                               
                                    {items.map((item) => (
                                        <TableRow key={item.product_id.toString()}>
                                            <TableCell component="th" scope="row">{item.product_id}</TableCell>
                                            <TableCell onClick={(e) => handleNavigate(item.product_id)} >{item.name}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.totalPrice}</TableCell>
                                        </TableRow>
                                    ))} 
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

{/*
Row.propTypes = {
    order: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
}
*/}

const OrdersTable = () => {
    const [orders, setOrders] = useState({
        ordersWithProductsListed: [{
            order: {},
            myOrdersCustomProductInfos: []
        }]
    });

    const AuthStr = 'Bearer '.concat(localStorage.getItem("jwtToken"));

    const getOrders = () => {
        axios.get(ORDERS_URL, { headers: { Authorization: AuthStr } }).then(res => {
            const orders_res = res.data;
            console.log(orders_res)
            setOrders(orders_res);
            console.log(orders)
        })
        //console.log(addrAPI)
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell />
                        <StyledTableCell>Order Tracking Number</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Payment</StyledTableCell>
                        <StyledTableCell align="right">Shipment</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">SUM(PLN)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.ordersWithProductsListed.map((el, index) => (
                        <Row key={index.toString()} order={el} items={el.myOrdersCustomProductInfos}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrdersTable;
