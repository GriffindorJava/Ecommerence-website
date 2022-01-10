import React, { useState } from "react";
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
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddressCard from "../components/AddressCard";

const OrderPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
        }}>
            <Stepper nonLinear activeStep={activeStep} orientation="vertical" sx={{ p: 5, border: 1, borderRadius: 2, width: '70%'}}>
                <Step>
                    <StepLabel>
                        Address
                    </StepLabel>
                    <StepContent>
                        <AddressCard/>
                        <AddressCard/>
                        <AddressCard/>
                        <AddressCard/>
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
                        Shipment method
                    </StepLabel>
                    <StepContent>
                        <FormControl component="shipment">
                            <RadioGroup column aria-label="shipment" name="row-radio-buttons-group">
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
                        <FormControl component="payment">
                            <RadioGroup column aria-label="payment" name="row-radio-buttons-group">
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
                                    //onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    ORDER
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
            </Stepper>
        </Box>
    )
}

export default OrderPage
