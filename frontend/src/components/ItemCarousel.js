import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    button: {
        width: '100%',
        height: '300px'
    },
    photo: {
        width: '100%',
        height: '300px',
        backgroundSize: 'cover !important'
    },
    singlePage: {
        width: '100%',
        maxHeight: '100%'
    },
    paper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    }
}))

const Item = (props) => {
    const classes = useStyles()

    const classNames = props.singlePage ? classes.singlePage : classes.photo

    return (
        <Paper className={classes.paper}>
            <Button className={classes.button}>
                <img src={props.src} alt={props.name} className={classNames} />
            </Button>
        </Paper>
    )
}

export default Item