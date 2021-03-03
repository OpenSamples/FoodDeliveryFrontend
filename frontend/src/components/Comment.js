import React from 'react'
import { Avatar, Grid, Paper } from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    commentSection: {
        display: 'flex', 
        justifyContent: 'space-between'
    }
}))

const Comment = (props) => {
    const classes = useStyles()

    return (
        <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={props.name} src={props.image} />
                    
                </Grid>
                <Grid item xs zeroMinWidth>
                    <span className={classes.commentSection}>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{props.name}</h4>
                        {props.rating ? 
                            <Rating name="ratings" precision={0.1} value={props.rating} readOnly />
                            : ''
                        }
                    </span>
                    <p style={{ textAlign: "left" }}>
                        {props.comment + " "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {/* posted 1 minute ago */}
                    </p>
                </Grid>
            </Grid>
        </Paper>
    )
}


export default Comment