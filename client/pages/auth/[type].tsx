import React, {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BasicLayout from '../../layouts/basic-layout/basic-layout';
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../store";
import Alert from '@material-ui/lab/Alert';
import SimpleButton from "../../components/simple_button/simple_button";
import WhiteCard from "../../components/white_card/WhiteCard";
import {Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import Divider from '@mui/material/Divider';


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

export default function Auth(){
    const classes = useStyles();
    const [errors, updateErrors] = useState<string[]>([]);
    const [isLogin, updateIsLogin] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const submit = useCallback(async($event: any) => {
        $event.preventDefault();

        const form = document.getElementById("form") as HTMLFormElement;
        const emailInput = form.querySelector('#email') as HTMLInputElement;
        const passwordInput = form.querySelector('#password') as HTMLInputElement;
        const usernameInput = form.querySelector('#username') as HTMLInputElement;
        const data = {username: usernameInput?.value, password: passwordInput?.value};
        let url = '/api/auth/signup';

        if(isLogin){
            url = '/api/auth/login';
        } else {
            Object.assign(data, {email: emailInput?.value});
        }

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            const data = await response.json();

            if(data?.data.user){
                const user = data.data.user;

                dispatch(loginSuccess(user));
                await router.push(`/users/${user.id}`);
            } else {
                updateErrors([...data.errors]);
            }
        }
    }, []);

    useEffect(() => {
        const auth_type = router.query.type == "login";

        updateIsLogin(auth_type);
    }, [router.query]);

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
                        <Typography component="h3" variant="h3" className={"center mb"}>
                            {
                                isLogin ? "Login" : "Sign up"
                            }
                        </Typography>

                        <form className={classes.form} noValidate id={"form"}>
                            {
                                !isLogin && (
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
                                )
                            }
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

