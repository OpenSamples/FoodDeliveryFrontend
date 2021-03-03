import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Card, CardActionArea, CardActions, CardContent, CardMedia} from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios'
import AlertMessage from './AlertMessage'

const useStyles = makeStyles({
    root: {
      maxWidth: 300,
      width: 280
    },
    media: {
      height: 140,
    },
    actions: {
        justifyContent: 'space-between'
    }
});

const CardComponent = (props) => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        popup: false,
        popupInfo: {

        }
    })

    const addToCartFinish = async () => {
        try {
            let productCart = await axios({
                method: 'post',
                url: '/api/shopping-cart-items/' + props.productId,
                data: {
                    qty: 1
                }
            })
    
            if(productCart.data.msg && productCart.data.msg.startsWith('Product added to cart that belongs to user:')) {
                // Product is successfully added to cart
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'success',
                        message: 'Product added to cart!'
                    }
                })
            }
        } catch(e) {
            // setState({
            //     ...state,
            //     popup: true,
            //     popupInfo: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //         color: 'error',
            //         message: 'Failed to add product to cart!'
            //     }
            // })
        }
    }

    return (
        <>
            <AlertMessage state={state} setState={setState} />
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.image}
                        title={props.alt}
                    />
                    <CardContent style={{height: '120px', marginBottom: '10px', overflow: 'hidden'}}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions}>
                    <Link to={'/product/' + props.productId}>
                        <Button size="small" color="primary">
                            View
                        </Button>
                    </Link>
                    <Button onClick={addToCartFinish} startIcon={<ShoppingCartIcon />} size="small" color="primary">
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </>
        
    )
}

export default CardComponent