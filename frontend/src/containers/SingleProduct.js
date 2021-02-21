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

let product = [
    {
        id: '2',
        image: photo1,
        alt: 'Photo 2',
        name: 'Product 2',
        description: `'Our slow-steeped custom blend of Starbucks® Cold Brew coffee accented with vanilla and topped with a delicate float of house-made vanilla sweet cream that cascades throughout the cup. It's over-the-top and super-smooth.90 Cal.Menu limited. Restricted delivery area. Fees subject to change. Prices for Starbucks items purchased through UberEats may be higher than posted in stores or as marked. We cannot guarantee that any unpackaged products served in our stores are allergen-free because we use shared equipment to store, prepare, and serve them. Please visit the Starbucks website for nutritional and allergen information. Pike Place® is a registered trademark of the Pike Place Market PDA, used under license. CA prices of taxable food and beverage include sales tax. Product image may vary from delivered product.'`,
        category: 'Category 2',
        ratings: 3,
        price: 12
    },
    {
        id: '1',
        image: photo1,
        alt: 'Photo 1',
        name: 'Product 1',
        description: `'Our slow-steeped custom blend of Starbucks® Cold Brew coffee accented with vanilla and topped with a delicate float of house-made vanilla sweet cream that cascades throughout the cup. It's over-the-top and super-smooth.90 Cal.Menu limited. Restricted delivery area. Fees subject to change. Prices for Starbucks items purchased through UberEats may be higher than posted in stores or as marked. We cannot guarantee that any unpackaged products served in our stores are allergen-free because we use shared equipment to store, prepare, and serve them. Please visit the Starbucks website for nutritional and allergen information. Pike Place® is a registered trademark of the Pike Place Market PDA, used under license. CA prices of taxable food and beverage include sales tax. Product image may vary from delivered product.'`,
        category: 'Category 2',
        ratings: 3,
        price: 3000
    },
    {
        id: '3',
        image: photo1,
        alt: 'Photo 3',
        name: 'Product 3',
        description: `'Our slow-steeped custom blend of Starbucks® Cold Brew coffee accented with vanilla and topped with a delicate float of house-made vanilla sweet cream that cascades throughout the cup. It's over-the-top and super-smooth.90 Cal.Menu limited. Restricted delivery area. Fees subject to change. Prices for Starbucks items purchased through UberEats may be higher than posted in stores or as marked. We cannot guarantee that any unpackaged products served in our stores are allergen-free because we use shared equipment to store, prepare, and serve them. Please visit the Starbucks website for nutritional and allergen information. Pike Place® is a registered trademark of the Pike Place Market PDA, used under license. CA prices of taxable food and beverage include sales tax. Product image may vary from delivered product.'`,
        category: 'Category 2',
        ratings: 3,
        price: 3000
    }
]

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
        product: product.filter(item => item.id === props.match.params.id)[0],
        qty: 1
    })


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


    if(state.product) {
        body = () => (
            <>
                <div className={classes.productInfo}>
                    <Carousel className={classes.imgContainer} autoPlay={false}>
                        <Items key="1" singlePage name={state.product.name} src={state.product.image} />
                        <Items key="2" singlePage name={state.product.name} src={state.product.image} />
                    </Carousel>
                    <div className={classes.productDetails}>
                        <div className={classes.rating}>
                            <h2>{state.product.name} <span className={classes.productPrice}>{state.product.price ? ' - $' + state.product.price : ''}</span></h2>
                            <Rating className={classes.ratingStar} name="ratings" precision={0.1} value={state.product.ratings} readOnly />
                        </div>
                        <p>{state.product.description}</p>
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
                                <Button startIcon={<ShoppingCart />} variant="contained" color="primary">Add to cart</Button>
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