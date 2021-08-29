import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid, { GridSpacing } from '@material-ui/core/Grid';


export default function Footer(){
    return (
        <footer className={"w-100"}>
            <AppBar position="static" className={"footer__appbar"}>
                <Toolbar className={"center"}>
                    <Grid container justifyContent={"center"}>
                        <Grid item>
                            <div className={"w-100 color-black"}>
                                Made with <b>love</b>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </footer>
    );
}