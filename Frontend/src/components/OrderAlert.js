import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from "@mui/material/Divider";
import AddressCardOrder from "./AddressCardOrder";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";

const ship = ["UPS", "DHL", "DPD", "FedEx", "Poczta Polska"];
const paym = ["Przelewy 24", "Blik", "VISA", "MasterCard"];

const OrderAlert = (props) => {
    const [items, setItems] = useState(useSelector((state) => state.cart.products));

    return (
        <div>
            <Dialog
                open={props.state}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h5">
                        Order summary
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        Items
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ flexGrow: 1 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">ID</TableCell>
                                    <TableCell align="right">Unit price</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">SUM(PLN)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.items.products.map((item) => (
                                    <TableRow
                                        key={item.id.toString()}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">{item.id}</TableCell>
                                        <TableCell align="right">{item.unitPrice}</TableCell>
                                        <TableCell align="right">{items.find((item2) => item.id === item2.id).quantity}</TableCell>
                                        <TableCell align="right">{item.unitPrice * items.find((item2) => item.id === item2.id).quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography align="right" marginRight={2}>
                        SUM(PLN): {props.items.totalPrice}
                    </Typography>
                    <Typography variant="h6">
                        Address
                    </Typography>
                    <AddressCardOrder
                        street={props.address.street}
                        streetNumber={props.address.street_number}
                        postalCode={props.address.postal_code}
                        city={props.address.city}
                        country={props.address.country} />
                    <Typography>
                        Payment method: {paym[parseInt(props.pay) - 1]}
                    </Typography>
                    <Typography>
                        Shipment method: {ship[parseInt(props.ship) - 1]}
                    </Typography>
                    <Divider sx={{ m: 1 }} />
                    {props.orderNumber === "" ?
                        <DialogContentText align="center" id="alert-dialog-description">
                            Is everything correct?
                        </DialogContentText> :
                        <Typography align="center">
                            Order Tracking Number: {props.orderNumber}
                        </Typography>
                    }
                </DialogContent>
                <DialogActions>
                    {props.orderNumber === "" ?
                        <div>
                            <Button onClick={props.handleClose}>Cancel</Button>
                            <Button onClick={props.handleSubmit} autoFocus>Confirm</Button>
                        </div> :
                        <div>
                            <Button component={Link} to={'/orders'}>Go to Orders</Button>
                            <Button component={Link} to={'/'}>Continue shopping</Button>
                        </div>
                    }

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default OrderAlert