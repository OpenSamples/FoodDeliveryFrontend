import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { Delete, Remove, Add } from '@material-ui/icons'

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

    const increaseQty = (val) => () => {
        if(!(props.state.qty === 1 && val < 0)) {
            props.setState({
                ...props.state,
                qty: props.state.qty + val
            })
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.details}>
                    <span className={classes.title}>{props.name}</span>
                    <p>{props.details}</p>
                    <span className={classes.price}>${props.price} * {props.state.qty}</span>
                </div>
                <div className={classes.imageQty}>
                    <span>
                        <IconButton onClick={increaseQty(-1)}>
                            <Remove />
                        </IconButton>
                        <span>{'   ' + props.state.qty + '   '}</span>
                        <IconButton onClick={increaseQty(1)}>
                            <Add />
                        </IconButton>
                    </span>
                    <img src={props.thumbnail} alt={props.name} className={classes.thumbnail} />
                </div>
            </div>
            <IconButton color="secondary">
                <Delete />
            </IconButton>
        </div>
    )
}

export default ShoppingCartItem