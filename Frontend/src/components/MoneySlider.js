import React, { useState } from "react";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import MuiInput from '@mui/material/Input';


const MoneySlider = () => {
    const [value, setValue] = React.useState([0, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
      };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <MuiInput value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur} 
                sx={{width: 60}}
                />
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                sx={{width: 150}}
            />
            <MuiInput value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur} 
                sx={{width: 60}}/>
        </Box>
    )
}

export default MoneySlider
