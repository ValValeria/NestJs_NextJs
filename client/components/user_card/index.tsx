import React from 'react';
import {IStore, IUser} from "../../interfaces";
import SimpleCard from "../simple_card/simple_card";
import {Grid, Typography, Button} from "@mui/material";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Image from 'next/image';

export default function UserCard(props: {user: IUser}){
    const router = useRouter();
    const auth: IStore = useSelector<{auth: IStore}>(state => state.auth) as IStore;

    const handleClick = async () => {
        let url = `/user/${props.user.id}`;

        if (auth && typeof(auth) === 'object' && !auth?.isAuth){
            url = `/auth/login`;
        }

        await router.push(url);
    };

    return (
        <SimpleCard>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Image
                        src={'/images/avatar.jpg'}
                        alt={"..."}
                        width={300}
                        height={300}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant={"h6"}>
                        {props.user.username}
                    </Typography>
                    <Button variant={"outlined"} color={"primary"} onClick={handleClick}  className={"mt"}>
                        Visit the profile
                    </Button>
                </Grid>
            </Grid>
        </SimpleCard>
    );
}
