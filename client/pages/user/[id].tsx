import React, {useEffect, useState} from "react";
import BasicLayout from "../../layouts/basic-layout/basic-layout";
import {useRouter} from "next/router";
import {IStore, IUser, IUserResponse} from "../../interfaces";
import {useSelector} from "react-redux";
import {hasPermission, Permissions, UserModel} from "../../functions";
import WhiteCard from "../../components/white_card/WhiteCard";
import {Button, Grid} from "@mui/material";
import Typography from '@mui/material/Typography';
import Image from 'next/image'


export default function User(){
    const [user, updateUser] = useState<IUser>(new UserModel());
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
                           <Image src={"/public/images/user.jpg"}
                                  alt={"..."}
                                  width={300}
                                  height={500}/>

                            {
                                hasPermission(authData.user, user as IUser, Permissions.DELETE_ACCOUNT) && (
                                    <div className={"user__actions"}>
                                        <Button variant="contained">Delete an account</Button>
                                        <Button variant="outlined">View messages</Button>
                                    </div>
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
