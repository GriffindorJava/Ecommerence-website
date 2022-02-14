import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import "../css/Product.css";

const Opinion = (props) => {
    const [name, setName] = useState(props.name);
    const [rating, setRating] = useState(props.rating);
    const [description, setDescription] = useState(props.description);
    const [date, setDate] = useState(props.date);

    return (
        <Card style={{margin: 10}} sx={{ flexGrow: 1 }}>
            <CardContent>
                <div>
                    <div className='rating'>
                        <Rating name="half-rating-read" value={rating} precision={0.1} readOnly sx={{ fontSize: 27 }}/>
                        <Typography style={{marginLeft: 10}} sx={{ fontSize: 20 }}>
                            {rating}
                        </Typography>
                        <Typography style={{marginLeft: 10}} sx={{ fontSize: 20 }}>
                            {name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography sx={{ fontSize: 20 }}>
                            {date.split("T")[0]}
                        </Typography>
                    </div>
                    <Typography sx={{ fontSize: 15 }}>
                        {description}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default Opinion
