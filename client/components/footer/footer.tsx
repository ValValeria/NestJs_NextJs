import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


export default function Footer(){
    return (
        <footer className={"w-100"}>
            <AppBar position="static">
                <Toolbar>
                    <div className={"w-100 center"}>
                         Made with <b>love</b>
                    </div>
                </Toolbar>
            </AppBar>
        </footer>
    );
}