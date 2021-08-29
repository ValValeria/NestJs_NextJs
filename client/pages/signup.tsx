import React, {useCallback, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BasicLayout from '../layouts/basic-layout/basic-layout';
import {useDispatch} from "react-redux";
import {loginSuccess} from "../store";
import Alert from '@material-ui/lab/Alert';


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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signup(){
    const classes = useStyles();
    const [errors, updateErrors] = useState<string[]>([]);
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

    return (
        <BasicLayout hasTitle={false}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h3" variant="h3">
                    Sign up
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
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => submit(e)}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </BasicLayout>
    );
}
