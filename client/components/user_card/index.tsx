import React from 'react';
import {IStore, IUser} from "../../interfaces";
import SimpleCard from "../simple_card/simple_card";
import {Grid, Typography, Button} from "@mui/material";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

export default function UserCard(props: {user: IUser}){
    const router = useRouter();
    const auth: IStore = useSelector<{auth: IStore}>(state => state.auth) as IStore;

    const handleClick = async () => {
        let url = `/user/${props.user.id}`;

        if (!auth?.isAuth){
            url = `/auth/login`;
        }

        await router.push(url);
    };

    return (
        <SimpleCard>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant={"h6"}>
                        {props.user.username}
                    </Typography>
                    <Button variant={"outlined"} color={"primary"} onClick={handleClick}>
                        Visit the profile
                    </Button>
                </Grid>
            </Grid>
        </SimpleCard>
    );
}
