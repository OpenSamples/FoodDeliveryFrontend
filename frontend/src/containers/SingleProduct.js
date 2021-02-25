import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Remove, Add, ShoppingCart } from '@material-ui/icons/'
import { Icon, IconButton, Button } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import Rating from '@material-ui/lab/Rating';
import Items from '../components/ItemCarousel'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Comment from '../components/Comment'
import photo1 from '../assets/categories/1.jpg'
import axios from 'axios'
import { host } from '../config/config'

const useStyles = makeStyles(() => ({
    productInfo: {
        display: 'flex',
        gap: '20px'
    },
    container: {
        minHeight: '100vh',
        width: '70%',
        margin: '5rem auto'
    },
    imgContainer: {
        width: '40%',
        height: '500px',
        paddingBottom: '10px',
        '& .CarouselItem': {
            width: '100%',
            height: '100%'
        },
        '& .CarouselItem div': {
            height: '100%'
        },
        '& .MuiPaper-elevation1': {
            boxShadow: 'none'
        }
    },
    productDetails: {
        marginLeft: '16px',
        width: '60%',
        borderLeft: '1px solid #ccc',
        paddingLeft: '14px',
        color: 'rgba(0, 0, 0, 0.54)',
        '& p': {
            height: '65%',
            textOverflow: 'hidden'
        }
    },
    rating: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '15%'
    },
    ratingStar: {
        padding: '15px 0'
    },
    addToCart: {
        height: '20%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    commentSection: {
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    productPrice: {
        color: '#388e3c'
    }
}))

let comments = [
    {
        image: photo1,
        name: 'Ime',
        comment: 'Neki comment'
    },
    {
        image: photo1,
        name: 'Ime2',
        comment: 'Neki comment2'
    }
]

const SingleProduct = (props) => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        id: props.match.params.id,
        product: {},
        qty: 1,
        btn_disabled: false
    })

    React.useEffect(async () => {
        let response = await axios({
            method: 'get',
            url: '/api/products/' + state.id
        })

        if(response.data[0]._id) {
            let productData = response.data[0]

            setState({
                ...state,
                product: productData
            })
        }
    }, [])

    let body = () => (
        <></>
    )

    const increaseQty = (val) => () => {
        if(!(state.qty === 1 && val < 0)) {
            setState({
                ...state,
                qty: state.qty + val
            })
        }
    }

    const addToCartFinish = async () => {
        try {
            let response = await axios({
                method: 'post',
                url: '/api/shopping-cart-items/' + state.id,
                data: {
                    qty: state.qty
                }
            })

            if(response.data.msg.startsWith('Product added to cart that belongs to user:')) {
                // Product is successfully added to cart
                setState({
                    ...state,
                    btn_disabled: true
                })
            }
        } catch(e) {
            console.log(e)
        }
    }


    if(state.product && Object.keys(state.product).length > 0 ) {
        body = () => (
            <>
                <div className={classes.productInfo}>
                    <Carousel className={classes.imgContainer} autoPlay={false}>
                        <Items key="1" singlePage name={state.product.name} src={host + state.product.imageUrl} />
                        <Items key="2" singlePage name={state.product.name} src={host + state.product.imageUrl} />
                    </Carousel>
                    <div className={classes.productDetails}>
                        <div className={classes.rating}>
                            <h2>{state.product.name} <span className={classes.productPrice}>{state.product.price ? ' - $' + state.product.price : ''}</span></h2>
                            <Rating className={classes.ratingStar} name="ratings" precision={0.1} value={4} readOnly />
                        </div>
                        <p>{state.product.detail}</p>
                        <div className={classes.addToCart}>
                            <span>
                                <IconButton onClick={increaseQty(-1)}>
                                    <Remove />
                                </IconButton>
                                <span>{'   ' + state.qty + '   '}</span>
                                <IconButton onClick={increaseQty(1)}>
                                    <Add />
                                </IconButton>
                            </span>
                            <span>
                                <Button onClick={addToCartFinish} disabled={state.btn_disabled} startIcon={<ShoppingCart />} variant="contained" color="primary">Add to cart</Button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.commentSection}>
                    <h3>Comments:</h3>
                    {comments.map((comment) => (
                        <Comment image={comment.image} name={comment.name} comment={comment.comment} />
                    ))}
                </div>
            </>
        )
    } else {
        body = () => (
            <p>Product not found</p>
        )
    }

    return (
        <>
            <Header />
            <div className={classes.container}>
                {body()}
            </div>
            <Footer />
        </>
    )
}


export default SingleProduct