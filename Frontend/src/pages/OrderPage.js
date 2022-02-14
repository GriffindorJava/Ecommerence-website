import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import AddressCardOrder from "../components/AddressCardOrder";
import { emptyCart } from '../services/cart/cartActions'
import BasketItems2 from "../components/BasketItems2";
import Menubar from "../components/Menubar";
import OrderAlert from "../components/OrderAlert";
import axios from "axios";


const ADDR_URL = "http://localhost:8080/test/addresses"
const ORDER_URL = "http://localhost:8080/test/purchase"

const OrderPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [items, setItems] = useState(useSelector((state) => state.cart.products));
    const [payMeth, setPayMeth] = useState(1);
    const [shipMeth, setShipMeth] = useState(1);
    const [addrSel, setAddrSel] = useState(1);
    const [addrCustom, setAddrCustom] = useState({
        city: "",
        postal_code: "",
        street: "",
        country: "",
        street_number: "",
    });
    const [addrToSend, setAddrToSend] = useState({
        city: "",
        postal_code: "",
        street: "",
        country: "",
        street_number: "",
    });
    const [stateE, setStateE] = useState({
        city: false,
        postal_code: false,
        street: false,
        country: false,
        street_number: false,
    })
    const [alertState, setAlertState] = useState(false);
    const [itemsAPI, setItemsAPI] = useState({
        products: [],
        totalPrice: 0
    });
    const [orderNumber, setOrderNumber] = useState("");

    const handleItems = (data) => {
        setItemsAPI(data);
    };

    const handleOpenAlert = () => {
        setAlertState(true);
    };
    const handleCloseAlert = () => {
        setAlertState(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addrAPI, setAddrAPI] = useState([]);
    const AuthStr = 'Bearer '.concat(localStorage.getItem("jwtToken"));

    const getAddr = () => {
        axios.get(ADDR_URL, { headers: { Authorization: AuthStr } }).then(res => {
            const addr = res.data;
            setAddrAPI(addr);
            //console.log(addr)
        })
        //console.log(addrAPI)
    }

    useEffect(() => {
        getAddr();
    }, []);

    const handleNext = () => {
        if(activeStep === 1 && addrSel == 1){
            if(checkAddr() === false){
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setAddrToSend(addrCustom);
            }
        }else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (regex, e) => {
        setAddrCustom({ ...addrCustom, [e.target.id]: e.target.value })
        if (regex.test(e.target.value)) {
            setStateE({ ...stateE, [e.target.id]: false })
        } else {
            setStateE({ ...stateE, [e.target.id]: true })
        }
    }
    const checkAddr = () => {
        let alertMessage = false;
        if (addrSel == 1) {
            if (stateE.street || addrCustom.street === '') {
                alertMessage = true;
            } if (stateE.street_number || addrCustom.street_number === '') {
                alertMessage = true;
            } if (stateE.postal_code || addrCustom.postal_code === '') {
                alertMessage = true;
            } if (stateE.city || addrCustom.city === '') {
                alertMessage = true;
            } if (stateE.country || addrCustom.country === '') {
                alertMessage = true;
            }
        }
        return alertMessage;
    };

    const handleShipChange = (e) => {
        setShipMeth(e.target.value)
    };

    const handlePayChange = (e) => {
        setPayMeth(e.target.value)
    };

    const handleAddrChange = (e) => {
        setAddrSel(e.target.value);
        if (e.target.value == 1) {
            setAddrToSend(addrCustom);
        } else {
            setAddrToSend(addrAPI[e.target.value - 2])
        }
    };

    const sendOrder = () => {
        if (checkAddr()) {
            alert("Incorrect address")
        } else {
            let items_mod = [];
            items.forEach(item => {
                items_mod.push({ product_id: item.id, quantity: item.quantity });
            });
            let data = {
                city: addrToSend.city,
                postal_code: addrToSend.postal_code,
                street: addrToSend.street,
                country: addrToSend.country,
                street_number: addrToSend.street_number,
                payment_method_id: payMeth,
                shipping_method_id: shipMeth,
                orderedProducts: items_mod
            }
            //console.log(data)
            axios.post(ORDER_URL, data, { headers: { Authorization: AuthStr } }).then(res => {
                console.log(res.data);
                if (res.data.orderTrackingNumber) {
                    setOrderNumber(res.data.orderTrackingNumber);
                    console.log("good", res.data.orderTrackingNumber)
                    dispatch(emptyCart());
                    //navigate('/orders');
                }
            }).catch(err => {
                console.log(err.response.data);
                alert(err.response.data)
            })
        }
    }

    const handleSubmitOrder = () => {
        console.log("ORDERRRR");
        console.log(items);
        console.log(addrToSend);
        console.log(shipMeth, typeof (shipMeth));
        console.log(payMeth, typeof (payMeth));
        sendOrder();
    };

    return (
        <div>
            <Menubar />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <Stepper nonLinear activeStep={activeStep} orientation="vertical" sx={{ p: 5, border: 1, borderRadius: 2, width: '70%' }}>
                    <Step>
                        <StepLabel>
                            Items
                        </StepLabel>
                        <StepContent>
                            <BasketItems2 itemsCallback={handleItems} />
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            Address
                        </StepLabel>
                        <StepContent>
                            <FormControl>
                                <RadioGroup aria-label="address" name="row-radio-buttons-group" value={addrSel} onChange={handleAddrChange}>
                                    <FormControlLabel value="1" control={<Radio />} label={
                                        <Grid
                                            component="form"
                                            container columns={{ xs: 8 }}
                                            spacing={1}
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{ width: '70%' }}
                                            autoComplete="off"
                                        >
                                            <Grid item xs={4}>
                                                <TextField
                                                    required
                                                    id="street"
                                                    label="Street"
                                                    value={addrCustom.street}
                                                    error={stateE.street}
                                                    onChange={(e) => handleChange(/^[A-Za-z ]{2,32}/, e)}
                                                    inputProps={{
                                                        pattern: '[A-Za-z]{2,}'
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    required
                                                    id="street_number"
                                                    label="Street number"
                                                    value={addrCustom.street_number}
                                                    error={stateE.street_number}
                                                    onChange={(e) => handleChange(/^[0-9]{1,5}/, e)}
                                                    inputProps={{
                                                        pattern: '[0-9]{1,}'
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    required
                                                    id="postal_code"
                                                    label="Postal code"
                                                    value={addrCustom.postal_code}
                                                    error={stateE.postal_code}
                                                    onChange={(e) => handleChange(/^[0-9]{5}/, e)}
                                                    inputProps={{
                                                        pattern: '[0-9]{5}'
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    required
                                                    id="city"
                                                    label="City"
                                                    value={addrCustom.city}
                                                    error={stateE.city}
                                                    onChange={(e) => handleChange(/^[A-Za-z ]{2,32}$/, e)}
                                                    inputProps={{
                                                        pattern: '[A-Za-z]{2,}'
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    required
                                                    id="country"
                                                    label="Country"
                                                    value={addrCustom.country}
                                                    error={stateE.country}
                                                    onChange={(e) => handleChange(/^[A-Za-z ]{2,32}$/, e)}
                                                    inputProps={{
                                                        pattern: '[A-Za-z]{2,}'
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={4} />
                                        </Grid>} />
                                    {addrAPI.map((a, index) => (
                                        <FormControlLabel key={a.id.toString()} value={(index + 2)} control={<Radio />} label={
                                            <AddressCardOrder
                                                id={a.id}
                                                street={a.street}
                                                streetNumber={a.street_number}
                                                postalCode={a.postal_code}
                                                city={a.city}
                                                country={a.country} />} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Next
                                    </Button>
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            Shipment method
                        </StepLabel>
                        <StepContent>
                            <FormControl>
                                <RadioGroup aria-label="shipment" name="row-radio-buttons-group" value={shipMeth} onChange={handleShipChange}>
                                    <FormControlLabel value="1" control={<Radio />} label="UPS" />
                                    <FormControlLabel value="2" control={<Radio />} label="DHL" />
                                    <FormControlLabel value="3" control={<Radio />} label="DPD" />
                                    <FormControlLabel value="4" control={<Radio />} label="FedEx" />
                                    <FormControlLabel value="5" control={<Radio />} label="Poczta Polska" />
                                </RadioGroup>
                            </FormControl>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Next
                                    </Button>
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            Payment method
                        </StepLabel>
                        <StepContent>
                            <FormControl>
                                <RadioGroup aria-label="payment" name="row-radio-buttons-group" value={payMeth} onChange={handlePayChange}>
                                    <FormControlLabel value="1" control={<Radio />} label="Przelewy 24" />
                                    <FormControlLabel value="2" control={<Radio />} label="Blik" />
                                    <FormControlLabel value="3" control={<Radio />} label="VISA" />
                                    <FormControlLabel value="4" control={<Radio />} label="MasterCard" />
                                </RadioGroup>
                            </FormControl>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenAlert}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        ORDER
                                    </Button>
                                    <OrderAlert
                                        state={alertState}
                                        items={itemsAPI}
                                        address={addrToSend}
                                        pay={payMeth}
                                        ship={shipMeth}
                                        handleSubmit={handleSubmitOrder}
                                        orderNumber={orderNumber} 
                                        handleClose={handleCloseAlert}/>
                                    <Button
                                        onClick={handleBack} //handleBack  handleOpenAlert
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
            </Box>
        </div>
    )
}

export default OrderPage
