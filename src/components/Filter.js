import React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import MoneySlider from './MoneySlider';


const categories = ['Wino', 'Whisky', 'Wódka', 'Likier'];

const sizes = ['0.5 L', '0.7 L', '1 L', '1.5 L'];

const Filter = () => {


    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <FormGroup>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Typography>Categories</Typography>
                    {categories.map((category) => (
                        <FormControlLabel key={category} control={<Checkbox />} label={category} />
                    ))}
                    <Typography>Sizes</Typography>
                    {sizes.map((size) => (
                        <FormControlLabel key={size} control={<Checkbox />} label={size} />
                    ))}
                    <Typography>Price</Typography>
                    <MoneySlider/>
                    <Typography>Order By</Typography>
                    <Button>Filter</Button>
                </Grid>
            </FormGroup>
        </Box>
    )
}

export default Filter
