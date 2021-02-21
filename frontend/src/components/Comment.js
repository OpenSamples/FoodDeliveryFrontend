import React from 'react'
import { Avatar, Grid, Paper } from "@material-ui/core";

const Comment = (props) => {
    return (
        <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={props.name} src={props.image} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{props.name}</h4>
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