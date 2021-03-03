import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import axios from 'axios'

const useStyles = makeStyles(() => ({
    ratingStar: {
        display: 'block',
        marginTop: '10px'
    }
}))

const ReviewProduct = (props) => {
    const classes = useStyles()

    const handleCloseDialog = () => {
        props.setState({
            ...props.state,
            dialogOpen: false
        })
    }

    const onRatingChange = (event) => {
        props.setState({
            ...props.state,
            ratingStar: event.target.value
        })
    }

    const sendReview = async () => {
        // Apply review
        try {
            if(props.state.id) {
                let sendReview = await axios({
                    method: 'post',
                    url: '/api/products/add-review/' + props.state.id,
                    data: {
                        rating: props.state.ratingStar,
                        comment: props.state.messageReview
                    }
                })

                if(sendReview.data.message === 'Review added successfully!') {
                    let {averageReview, allComments} = await props.getAllCommentsReviews(props.state.id)
                    
                    props.setState({
                        ...props.state,
                        popup: true,
                        comments: '',
                        comments: allComments.data.map(item => ({rating: item.rating, ...item.comment})),
                        averageReview: typeof averageReview.data === 'number' ? averageReview.data : -1,    
                        dialogOpen: false,
                        popupInfo: {
                            vertical: 'top',
                            horizontal: 'center',
                            color: 'success',
                            message: 'Successfully added review!'
                        }
                    })
                } else {
                    props.setState({
                        ...props.state,
                        popup: true,
                        productIdForReview: '',
                        dialogOpen: false,
                        popupInfo: {
                            vertical: 'top',
                            horizontal: 'center',
                            color: 'error',
                            message: 'Something went wrong...'
                        }
                    })
                }

            }
        } catch(e) {
            props.setState({
                ...props.state,
                // popup: true,
                productIdForReview: '',
                dialogOpen: false,
                // popupInfo: {
                //     vertical: 'top',
                //     horizontal: 'center',
                //     color: 'error',
                //     message: 'Something went wrong...'
                // }
            })
        }
        
        // props.setState({
        //     ...props.state,
        //     dialogOpen: true
        // })
    }

    return (
        <Dialog open={props.state.dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Leave feedback</DialogTitle>
            <DialogContent>
            <DialogContentText>
                {/* Thank you for your purchase! If you are happy with your order, 
                please take a minute to review it. */}
                Thank you for your interest! 
                You can easily give us feedback.
            </DialogContentText>
            

            <span className={classes.ratingStar}>Rate: </span>
            <Rating name="ratings" onChange={onRatingChange} precision={0.1} value={props.state.ratingStar} />
            <TextField
                margin="dense"
                variant="outlined"
                onChange={event => props.setState({...props.state, messageReview: event.target.value})}
                label="Message"
                value={props.state.messageReview}
                type="text"
                fullWidth
                multiline
                rows="3"
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                    Cancel
                </Button>
                <Button onClick={sendReview} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default ReviewProduct