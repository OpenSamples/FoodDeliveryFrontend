import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography } from '@material-ui/core';
import CardAboutUs from '../components/CardAboutUs'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh'
    },
    about_us_top: {
        backgroundColor: "#5c5fed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        color: "white",
        marginBottom: theme.spacing(4)
    },
    about_us_cards: {
        padding: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }
}));

const About = () => {
    const classes = useStyles();
    return (
        <>
            <Header />
            <div className={classes.root}>
                <div className={classes.about_us_top}>
                    <Typography variant="h3">About Food Delivery Api</Typography>
                    <Typography variant="h6">Short presentation about our Web Application and Team personel introduction.</Typography>
                </div>
                <div className={classes.about_us_cards}>
                    <CardAboutUs init="NJ" fullName="Nikola Jovovic" location="Podgorica,Montenegro" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                    <CardAboutUs init="IB" fullName="Ivana Bjelobaba" location="Podgorica,Montenegro" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                    <CardAboutUs init="DK" fullName="Dino Karahmetovic" location="Podgorica,Montenegro" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About