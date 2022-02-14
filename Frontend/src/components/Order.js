import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const Order = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [orderInfo, setOrderInfo] = useState(props.info);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <Card style={{ margin: 10 }} sx={{ flexGrow: 1 }}>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography>
                            {orderInfo.orderTrackingNumber}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            {orderInfo.status}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            {orderInfo.payment_method_id}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            {orderInfo.shipping_method_id}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            {orderInfo.date}
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Typography>
                            {orderInfo.sum}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </Grid>
                </Grid>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography>
                                id
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography>
                                item name
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography>
                                count
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography>
                                price(sum) PLN
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Order
