import "../css/Product.css";
import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";

const Product = (props) => {
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [rating, setRating] = useState(props.rating);
    const [price, setPrice] = useState(props.price);
    const [image, setImage] = useState(props.image);

    return (
        <Card sx={{ minWidth: 300, minHeight: 300, maxWidth: 300, maxHeight: 300 ,display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
            <CardActionArea component={Link} to={'/product/'+id}>
                <CardMedia
                    component="img"
                    height="160"
                    style={{
                        width: "auto",
                        margin: "auto"
                      }}
                    image={image}
                    alt=""
                />
                <CardContent>
                    <Typography noWrap gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <div className='rating'>
                        <Rating name="half-rating-read" value={rating} precision={0.1} readOnly />
                        <Typography variant="body2" color="text.secondary">
                            {rating}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        {price} PLN
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Product
