import Products from "../components/Products";
import Grid from '@mui/material/Grid';
import Filter from "../components/Filter";

const Main = () => {
    return (
        <Grid
            container
            justifyContent="space-evenly"
            
            columns={{ xs: 6, sm: 12 }}
        >
            <Grid item xs={6} sm={3}>
                <Filter/>
            </Grid>
            <Grid item xs={6} sm={9}>
                <Products />
            </Grid>
        </Grid>
    )
}

export default Main
