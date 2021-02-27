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
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'
import ReviewProduct from '../components/ReviewProduct';
import { host } from '../config/config'
import AlertMessage from '../components/AlertMessage'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
    productInfo: {
        display: 'flex',
        gap: '20px'
    },
    container: {
        minHeight: '100vh',
        width: '70%',
        margin: '5rem auto',
        display: 'flex',
        flexDirection: 'column'
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
    },
    addReview: {
        marginBottom: '20px',
        float: 'right'
    }
}))

const SingleProduct = (props) => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        id: props.match.params.id,
        product: {},
        ratingStar: 5,
        messageReview: '',
        dialogOpen: false,
        comments: [],
        averageReview: -1,
        loadingMessage: 'Loading...',
        qty: 1,
        btn_disabled: false,
        popup: false,
        popupInfo: {

        }
    })

    const getAllCommentsReviews = async (id) => {
        try {
            // Get reviews
            let averageReview = await axios({
                method: 'get',
                url: '/api/products/average-rating/' + id
            })


            // Get comments
            let allComments = await axios({
                method: 'get',
                url: '/api/products/comments/' + id
            })

            return {
                averageReview,
                allComments
            }
        } catch(e) {
            setState({
                ...state,
                popup: true,
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'Something went wrong while fetching reviews and comments...'
                }
            })
            return {
                averageReview: -1,
                allComments: []
            }
        }
    }

    React.useEffect(async () => {
        try {
            let response = await axios({
                method: 'get',
                url: '/api/products/' + state.id
            })
    
            if(response.data[0] && response.data[0]._id) {
                let productData = response.data[0]

                let {averageReview, allComments} = await getAllCommentsReviews(state.id)

                setState({
                    ...state,
                    product: productData,
                    loadingMessage: '',
                    comments: allComments.data.map(item => ({rating: item.rating, ...item.comment})),
                    averageReview: typeof averageReview.data === 'number' ? averageReview.data : -1
                })


            } else if(!response.data.length) {
                // No product
                setState({
                    ...state,
                    loadingMessage: 'Product not found'
                })
            } else {
                setState({
                    ...state,
                    popup: true,
                    loadingMessage: '',
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'error',
                        message: 'Something went wrong while fetching product...'
                    }
                })
            }
        } catch(e) {

            setState({
                ...state,
                popup: true,
                loadingMessage: '',
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'Something went wrong...'
                }
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
                    btn_disabled: true,
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
            setState({
                ...state,
                popup: true,
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'Failed to add product to cart!'
                }
            })
        }
    }

    if(state.product && Object.keys(state.product).length > 0 ) {
        body = () => (
            <>
                <ReviewProduct getAllCommentsReviews={getAllCommentsReviews} state={state} setState={setState} />
                <div className={classes.productInfo}>
                    <Carousel className={classes.imgContainer} autoPlay={false}>
                        <Items key="1" singlePage name={state.product.name} src={host + state.product.imageUrl} />
                    </Carousel>
                    <div className={classes.productDetails}>
                        <div className={classes.rating}>
                            <h2>{state.product.name} <span className={classes.productPrice}>{state.product.price ? ' - $' + state.product.price : ''}</span></h2>
                            {state.averageReview === -1 ? '' :
                                <Rating className={classes.ratingStar} name="ratings" precision={0.1} value={state.averageReview} readOnly />
                            }
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
                
                    {state.comments.length ? <h3>Comments:</h3> : ''}
                    {state.comments.map((comment, i) => (
                        <Comment key={i} rating={comment.rating} image={comment.imageUrl} name={comment.name} comment={comment.comment} />
                    ))}
                </div>
            </>
        )
    } 

    const showReviewDialog = () => {
        setState({
            ...state,
            dialogOpen: true
        })
    }

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.container}>
                <span style={{margin: '0 auto'}}>
                    {state.loadingMessage}
                </span>
                <div>
                    {useSelector(state => state.user)._id ? 
                        <Button onClick={showReviewDialog} startIcon={<AddIcon />} className={classes.addReview} color="primary" variant="outlined">Add review</Button>
                    : ''}
                </div>

                <div>
                    {body()}
                </div>
            </div>
            <Footer />
        </>
    )
}


export default SingleProduct