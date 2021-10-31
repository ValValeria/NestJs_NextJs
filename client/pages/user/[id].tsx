import React, {useEffect, useState} from "react";
import BasicLayout from "../../layouts/basic-layout/basic-layout";
import {useRouter} from "next/router";
import {IStore, IUser, IUserResponse} from "../../interfaces";
import {useSelector} from "react-redux";
import {hasPermission, Permissions} from "../../functions";
import SimpleCard from "../../components/simple_card/simple_card";
import WhiteCard from "../../components/white_card/WhiteCard";
import {Button, Grid} from "@mui/material";
import Image from 'next/Image';
import Typography from '@mui/material/Typography';


export default function User(){
    const [user, updateUser] = useState<IUser>();
    const authData: IStore = useSelector<{auth: IStore}>(state => state.auth) as IStore;
    const router = useRouter();

    useEffect(() => {
        (async() => {
            const response = await fetch(`/api/user/${router.query.id}`);

            if(response.ok){
               const json: IUserResponse = await response.json();
               const user: IUser = json.data.user[0];

               if(hasPermission(authData.user, user, Permissions.VIEW_ACCOUNT)){
                   updateUser(json.data.user[0]);
               } else {
                   await router.push('/auth/login');
               }
            }
        })();
    }, [router.query.id]);

    return (
        <div className={"user w-100"}>
            <BasicLayout hasTitle={true} text={"Profile"}>
                <Grid container>
                    <Grid item>
                        <WhiteCard>
                           <Image src={"/public/images/user.jpg"} alt={"..."} className={"mb"}/>
                            {
                                hasPermission(authData.user, user, Permissions.DELETE_ACCOUNT) && (
                                    <Button variant="contained">Delete an account</Button>
                                )
                            }
                        </WhiteCard>
                    </Grid>

                    <Grid item>
                        <WhiteCard>
                            <Typography variant="h1" component="div" gutterBottom>
                               Username: {user.username}
                            </Typography>

                            <Typography>
                               Email: {user?.email}
                            </Typography>
                        </WhiteCard>
                    </Grid>
                </Grid>
            </BasicLayout>
        </div>
    );
}
