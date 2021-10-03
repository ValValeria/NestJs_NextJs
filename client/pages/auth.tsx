import React, {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BasicLayout from '../layouts/basic-layout/basic-layout';
import {useDispatch} from "react-redux";
import {loginSuccess} from "../store/index";
import Alert from '@material-ui/lab/Alert';
import SimpleButton from "../components/simple_button/simple_button";
import WhiteCard from "../components/white_card/WhiteCard";
import {Grid} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        maxWidth: "600px"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AuthType(){
    const classes = useStyles();
    const [errors, updateErrors] = useState<string[]>([]);
    const [isLogin, updateIsLogin] = useState(false);
    const dispatch = useDispatch();

    const submit = useCallback(async($event: any) => {
        $event.preventDefault();

        const form = document.getElementById("form") as HTMLFormElement;
        const formData = new FormData(form);

        const response = await fetch("/signup", {
            method: "POST",
            body: formData
        });

        if(response.ok){
            const data = await response.json();

            if(data?.data.user){
                const user = data.data.user;

                dispatch(loginSuccess(user));
            } else {
                updateErrors([...data.errors]);
            }
        }
    }, []);

    useEffect(() => {
        if (process.browser && window) {
            const url = new URL(window.location.href);
            const auth_type = url.searchParams.get('isLogin');

            updateIsLogin(auth_type === 'true');
        }
    }, []);

    return (
        <div className={"auth w-100"}>
            <BasicLayout hasTitle={false}>
                <WhiteCard>
                    <Grid
                        container
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Typography component="h3" variant="h3" className={"center"}>
                            {
                                isLogin ? "Login" : "Sign up"
                            }
                        </Typography>
                        <form className={classes.form} noValidate id={"form"}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete=""
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {
                                (errors as string[]).length > 0 && (
                                    <>
                                        {
                                            errors.map(v => {
                                                return (
                                                    <Alert severity={"info"} key={Math.random()}>
                                                        {v}
                                                    </Alert>
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </form>

                        <div
                            color="primary"
                            onClick={(e) => submit(e)}
                            className={classes.submit}
                        >
                            <SimpleButton text={"Submit"}/>
                        </div>
                    </Grid>
                </WhiteCard>
            </BasicLayout>
        </div>
    );
}
