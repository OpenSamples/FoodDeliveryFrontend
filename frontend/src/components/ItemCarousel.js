import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    button: {
        width: '100%',
        height: '18.6vw',
        maxHeight: '330px',
        overflow: 'hidden'
    },
    photo: {
        width: '100%',
        // height: '18.6vw',
        // maxHeight: '330px',
        // backgroundSize: 'auto !important'
    },
    singlePage: {
        width: '100%',
        maxHeight: '100%'
    },
    paper: {
        width: '100%',
        height: '18.6vw',
        display: 'flex',
        alignItems: 'center'
    },
    home: {
        maxHeight: '330px'
    }
}))

const Item = (props) => {
    const classes = useStyles()

    const classNames = props.singlePage ? classes.singlePage : classes.photo
    const paper = props.singlePage ? [classes.paper] : [classes.home, classes.paper]
    return (
        <Paper className={paper.join(' ')}>
            <Link to={props.to} style={{width: '100%'}}>
                <Button className={classes.button}>
                    <img src={props.src} alt={props.name} className={classNames} />
                </Button>
            </Link>
        </Paper>
    )
}

export default Item