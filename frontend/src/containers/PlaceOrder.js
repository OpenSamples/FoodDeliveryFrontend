import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton, FormControl, InputLabel, Select } from '@material-ui/core';
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardOrder from '../components/CardPlaceOrderItem'
import axios from 'axios'
import photo1 from '../assets/categories/1.jpg'
import { useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '100px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '7%',
        borderLeft: '1px solid #ccc',
        padding: '50px',
        height: '50%',
        maxHeight: '550px',
        paddingTop: '0',
        width: '350px',
        overflowY: 'scroll',
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        '& h4': {
            color: 'rgba(0, 0, 0, 0.64)'
        }
    },
    formControl: {
        margin: '20px 0'
    },
    totalPrice: {
        color: 'rgba(0, 0, 0, 0.64)',
        '& span': {
            color: '#388e3c'
        }
    },
    input: {
        margin: '15px 0'
    },
    button: {
        margin: '30px 0'
    },
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

const PlaceOrder = (props) => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        category: '',
        // qty: 3,
        // itemsInCart: items.length,
        items: useSelector(state => state.itemsInCart),
        address: useSelector(state => state.user.addresses[0] || ''),
        phone: '',
        firstName: useSelector(state => state.user.firstName || ''),
        lastName: useSelector(state => state.user.lastName || ''),
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
                    message: 'Something went wrong while fetching shopping cart items...'
                }
            })
        }

    }, [])


    const handleChangeCategory = (event) => {
        setState({
          ...state,
          category: event.target.value,
        });
    };

    let itemsCards = () => (
        <></>
    )

    if(state.items.length) {
        itemsCards = () => (
            state.items.map((item, i) => (
                <CardOrder productId={item.productId} state={state} setState={setState} key={i} name={item.name} details={item.detail} qty={state.items[i].qty} price={item.price} thumbnail={item.imageUrl} />
            ))
        )
    } else {
        itemsCards = () => (
            <p className={classes.noItems}>No items in your shopping cart...</p>
        )
    }

    const changeInput = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const placeOrderFinish = async () => {
        try {
            let orderData = await axios({
                method: 'post',
                url: '/api/orders',
                data: {
                    address: state.address,
                    phone: state.phone,
                    fullName: state.firstName + ' ' + state.lastName
                }
            })

            if(orderData.data._id) {
                setState({
                    ...state,
                    items: []
                })

                // Redirect
                props.history.push('/success')
            }
        } catch(e) {
            setState({
                popup: true,
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'Something went wrong...'
                }
            })
        }


    }

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <div className={classes.container}>
                    <h4>Items in shopping cart (scroll to view more)</h4>
                    {itemsCards()}
                </div>
                <form className={classes.container}>
                    <h3 className={classes.totalPrice}>Total price: <span>$3000</span></h3>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="categories">Payment option</InputLabel>
                        <Select
                            native
                            value={state.category}
                            onChange={handleChangeCategory}
                            inputProps={{
                                name: 'category',
                                id: 'categories',
                            }}
                        >
                            {/* <option aria-label="None" value="" /> */}
                            <option value='Cash'>Cash</option>
                        </Select>
                    </FormControl>
                    <TextField required value={state.firstName} onChange={changeInput} name="firstName" className={classes.input} label="Your first name" type="text" />
                    <TextField required value={state.lastName} onChange={changeInput} name="lastName" className={classes.input} label="Your last name" type="text" />
                    <TextField required name="phone" value={state.phone} onChange={changeInput} className={classes.input} label="Your phone number" type="text" />
                    <TextField required value={state.address} onChange={changeInput} name="address" className={classes.input} label="Your address" type="text" />
                    <Button onClick={placeOrderFinish} className={classes.button} variant="contained" color="primary">Place order</Button>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default PlaceOrder