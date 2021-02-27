import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShoppingCartItem from '../components/ShoppingCartItem'
import photo1 from '../assets/categories/1.jpg'
import { useSelector } from 'react-redux'
import AlertMessage from '../components/AlertMessage'

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        width: '60%',
        margin: '5rem auto'
    },
    container: {
        width: '100%',
        // border: '1px solid #ccc',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        '& h2': {
            color: 'rgba(0, 0, 0, 0.54)'
        }
    },
    placeOrderBtn: {
        alignSelf: 'flex-end',
        marginTop: '2em'
    },
    noItems: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1.3rem',
        margin: '0 auto'
    }
}))

// const items = [
//     {
//         name: 'Product 1',
//         details: 'Details for product 1',
//         qty: 2,
//         price: 14,
//         thumbnail: photo1
//     },
//     {
//         name: 'Product 2',
//         details: 'Details for product 2',
//         qty: 5,
//         price: 10,
//         thumbnail: photo1
//     },
//     {
//         name: 'Product 3',
//         details: 'Details for product 3',
//         qty: 1,
//         price: 4,
//         thumbnail: photo1
//     }
// ]

const ShoppingCart = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        items: useSelector(state => state.itemsInCart),
        popup: false,
        popupInfo: {

        }
    })

    React.useEffect(async () => {
        try {
            let data = await axios({
                method: 'get',
                url: '/api/shopping-cart-items'
            })

            if(!data.data || data.data.error) {
                setState({
                    ...state,
                    items: []
                })
            } else {
                setState({
                    ...state,
                    items: [...data.data]
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
                    message: 'Something went wrong...'
                }
            })
        }

    }, [])



    let itemsCards = () => (
        <></>
    )

    let title = "Your Shopping Cart Items:"

    if(state.items.length) {
        itemsCards = () => (
            state.items.map((info, i) => {
                return (
                <ShoppingCartItem state={state} productId={info.productId} idx={i} setState={setState} key={i} name={info.name} details={info.detail} qty={state.items[i].qty} price={info.price} thumbnail={info.imageUrl} />
            )})
        )
    } else {
        itemsCards = () => (
            <p className={classes.noItems}>No items in your shopping cart...</p>
        )
        title = ""
    }

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <div className={classes.container}>
                    <h2>{title}</h2>
                    {itemsCards()}
                    <Link to="/place-order" className={classes.placeOrderBtn}>
                        <Button disabled={state.itemsInCart ? false : true} variant="outlined" color="primary">Place order</Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default ShoppingCart