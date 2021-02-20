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
        height: '300px'
    }
}))

const Item = (props) => {
    const classes = useStyles()

    return (
        <Paper>
            <Button className={classes.button}>
                <img src={props.src} alt={props.name} className={classes.photo} />
            </Button>
        </Paper>
    )
}

export default Item