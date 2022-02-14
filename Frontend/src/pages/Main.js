import React, { useState } from "react";
import Products from "../components/Products";
import Grid from '@mui/material/Grid';
import Filter from "../components/Filter";
import Menubar from "../components/Menubar";

const Main = () => {
    const [rerender, setRerender] = useState(true);

    const handleRerender = () => {
        setRerender(!rerender)
        console.log(rerender)
    };

    return (
        <div>

        <Menubar rerender={handleRerender}/>
        <Grid
            container
            justifyContent="space-evenly"
            
            columns={{ xs: 6, sm: 12 }}
        >
            <Grid item xs={6} sm={3}>
                <Filter handleFilter={handleRerender}/>
            </Grid>
            <Grid item xs={6} sm={9}>
                <Products rerender={rerender}/>
            </Grid>
        </Grid>
        </div>
    )
}

export default Main
