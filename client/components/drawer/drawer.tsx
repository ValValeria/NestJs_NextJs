import React, {useCallback, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from "@material-ui/core";
import { Subject } from 'rxjs';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InfoIcon from '@material-ui/icons/Info';
import {useRouter} from "next/router";
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../projects/nextjs/my-app/interfaces';

export const close$ = new Subject<boolean>();

const useStyles = makeStyles({
    root:{
        width: "80%",
        maxWidth: "500px",
        minWidth: "200px"
    }
});


export default function HeaderDrawer(){
    const classes = useStyles();
    const [state, updateState] = useState({isOpen: false});
    const router = useRouter();
    const authData = useSelector((state: {data: IStore}) => state.data.authData);

    const onClose = useCallback(() => {
        updateState({isOpen: false})
    }, []);

    close$.subscribe(v => {
        updateState({isOpen: v})
    })

    return (
        <Drawer
            open={state.isOpen}
            onClose={onClose}
            anchor={"left"}
        >
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Menu
                    </ListSubheader>
                }
                className={classes.root}
            >
                <ListItem button onClick={() => router.push('/')}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                {
                    !authData.isAuth && (
                        <React.Fragment>
                            <ListItem button  onClick={() => router.push('/login')}>
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>

                            <ListItem button  onClick={() => router.push('/signup')}>
                                <ListItemIcon>
                                    <PersonAddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Auth" />
                            </ListItem>
                        </React.Fragment>
                    )
                }

                {
                    authData.isAuth && (
                        <React.Fragment>
                            <ListItem button  onClick={() => router.push('/logout')}>
                                <ListItemIcon>
                                    <PersonAddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Log out" />
                            </ListItem>
                            <ListItem button  onClick={() => router.push('/users')}>
                                <ListItemIcon>
                                    <PersonAddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItem>
                        </React.Fragment>
                    )
                }

                <ListItem button>
                    <ListItemIcon>
                        <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
            </List>
        </Drawer>
    )
}