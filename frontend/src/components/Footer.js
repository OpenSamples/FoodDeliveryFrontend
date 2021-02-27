import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Facebook, Instagram, Twitter } from '@material-ui/icons';
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    footer: {
        width: '100%',
        backgroundColor: '#3f51b5',
        color: '#fff',
        minHeight: '180px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))

const icons = [
    {
        icon: <Facebook />
    },
    {
        icon: <Instagram />
    },
    {
        icon: <Twitter />
    }
]

const Footer = () => {
    const classes = useStyles()

    return (
        <div className={classes.footer}>
            <div>
                {icons.map((icon, i) => (
                    <IconButton key={icon + ' ' + i} color="inherit">
                        {icon.icon}
                    </IconButton>
                ))}
            </div>
            <p>© 2021 Copyright by Food Delivery</p>
        </div>
    )
}

export default Footer