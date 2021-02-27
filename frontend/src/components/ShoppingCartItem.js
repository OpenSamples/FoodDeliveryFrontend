import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { host } from '../config/config'
import { Delete, Remove, Add } from '@material-ui/icons'
import axios from 'axios'
import AlertMessage from './AlertMessage'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        margin: '20px 0',
        paddingLeft: '20px'
    },
    container: {
        display: 'flex',
        width: '95%'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    imageQty: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '20px',
        alignItems: 'center',
        width: '50%'
    },
    title: {
        fontWeight: '500'
    },
    price: {
        color: '#388e3c'
    },
    thumbnail: {
        maxHeight: '100px',
        marginLeft: '20px'
    }
}))

const ShoppingCartItem = props => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        popup: false,
        popupInfo: {

        }
    })

    const increaseQty = (val) => async () => {
        try {

            let dataIsUpdated = await axios({
                method: 'post',
                url: '/api/shopping-cart-items/qty/increase',
                data: {
                    productId: props.productId,
                    value: val
                }
            })
    
            if(dataIsUpdated.data._id) {
                if(!(props.state.items[props.idx].qty === 1 && val < 0)) {
                    props.setState({
                        ...props.state,
                        items: props.state.items.map((item, idx) => {
                            if(idx === props.idx) {
                                item.qty += val 
                            }
                            return item
                        })
                    })
                }
            }

        } catch(e) {

        }

    }

    const deleteFromCart = async () => {
        try {
            let removedProduct = await axios({
                method: 'post',
                url: '/api/shopping-cart-items/cart/remove-product',
                data: {
                    productId: props.productId
                }
            })

            if(removedProduct.data.msg === 'Product removed from Shopping Cart') {
                props.setState({
                    ...props.state,
                    items: props.state.items.filter(item => props.productId !== item.productId)
                })
                
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'success',
                        message: 'Product removed from shopping cart!'
                    }
                })
            }
        } catch(e) {
            setState({
                ...state,
                popup: true,
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'Failed to remove product from shopping cart!'
                }
            })
        }
    }

    return (
        <>
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.details}>
                        <span className={classes.title}>{props.name}</span>
                        <p>{props.details}</p>
                        <span className={classes.price}>${props.price} * {props.qty}</span>
                    </div>
                    <div className={classes.imageQty}>
                        <span>
                            <IconButton onClick={increaseQty(-1)}>
                                <Remove />
                            </IconButton>
                            <span>{'   ' + props.qty + '   '}</span>
                            <IconButton onClick={increaseQty(1)}>
                                <Add />
                            </IconButton>
                        </span>
                        <img src={host + props.thumbnail} alt={props.name} className={classes.thumbnail} />
                    </div>
                </div>
                <IconButton onClick={deleteFromCart} color="secondary">
                    <Delete />
                </IconButton>
            </div>
        </>
    )
}

export default ShoppingCartItem