import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardActions, CardContent, CardMedia} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { host } from '../config/config'

const useStyles = makeStyles((props) => ({
    root: {
        maxWidth: 300,
        width: 280,
        margin: '20px',
        overflow: 'visible',
        alignSelf: 'center'
    },
    media: {
        height: 120,
    },
    actions: {
        justifyContent: 'space-between'
    },
    qty: {
        color: 'rgba(0, 0, 0, 0.64)',
        marginRight: '10px'
    }
}))

const CardOrder = (props) => {
    const classes = useStyles()
    
    const deleteFromCart = async () => {
        let deletedProduct = await axios({
            method: 'post',
            url: '/api/shopping-cart-items/cart/remove-product',
            data: {
                productId: props.productId
            }
        })


        if(deletedProduct.data.msg === 'Product removed from Shopping Cart') {
            props.setState({
                ...props.state,
                items: props.state.items.filter(item => props.productId !== item.productId)
            })
        }
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={host + props.thumbnail}
                    title={props.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.details}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button onClick={deleteFromCart} startIcon={<Delete />} size="small" color="secondary">
                    Delete
                </Button>
                <span className={classes.qty}>Quantity: {props.qty}</span>
            </CardActions>
        </Card>
    )
}

export default CardOrder