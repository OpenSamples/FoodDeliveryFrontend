import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography } from '@material-ui/core';
import CardAboutUs from '../components/CardAboutUs'
import dinno from '../assets/dinno.jpg'
import nikola from '../assets/nikola.jpg'

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
        // flexDirection: "row",
        flexWrap: 'wrap',
        // gap: 3,
        justifyContent: "space-around",
        // height: '445px'
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
                    <CardAboutUs 
                        init="NJ"
                        avatar={nikola}
                        github="https://github.com/NikolaJovovic98"
                        instagram="https://www.instagram.com/nikola__jovovic/"
                        linkedin="https://www.linkedin.com/in/nikola-jovovi%C4%87-0012a81b0/" 
                        fullName="Nikola Jovovic" 
                        location="Podgorica, Montenegro" 
                        desc="A student of Faculty of Science and Mathematics the
                            course of Computer Science and Information Technologies. 
                            Experience in backend web development with technologies like Nodejs, 
                            Express, and database technologies like MongoDB and MySQL. 
                            Continually studying and d
                            eveloping new skills to implement in numerous projects." />
                    <CardAboutUs init="IB" fullName="Ivana Bjelobaba" location="Podgorica,Montenegro" desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                    <CardAboutUs
                        avatar={dinno} 
                        github="https://github.com/dinno-invis1ble" 
                        instagram="https://www.instagram.com/_d1noo_/" 
                        linkedin="https://www.linkedin.com/in/dinno-invis1ble/" 
                        init="DK" fullName="Dino Karahmetovic" 
                        location="Bijelo Polje, Montenegro" 
                        desc="I am Middle Web Developer (MERN, MEVN) with 1-2 years 
                            of experience in developing custom web 
                            applications using technologies like NodeJS, ReactJS and Vue.js. 
                            I am constantly improving my coding 
                            skills and I enjoy learning new technologies. 
                            I always follow best practices and industry standards in writing code." 
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About