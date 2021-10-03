import React, {useEffect, useState} from "react";
import {ButtonBase, Grid, Typography, Button} from "@material-ui/core";
import Link from "next/link";
import {useSelector} from "react-redux";
import {IStore} from "../../interfaces";


type links = {link: string, name: string}[]

export default function Nav(){
    const [activeLinks, updateActiveLinks] = useState<links>([]);
    const auth = useSelector<{auth: IStore}>(state => state.auth.isAuth);

    const simpleLinks: links = [
        {link: '/', name: 'Home' },
        {link: '/posts', name: 'Posts'}
    ];
    const notAuthLinks: links = [
        {link: "/auth?isLogin=true", name: "Login"},
        {link: "/auth?isLogin=false", name: "Sign up"},
    ];
    const authLinks: links = [];

    useEffect(() => {
        if(auth){
            updateActiveLinks([...authLinks]);
        } else {
            updateActiveLinks([...notAuthLinks]);
        }
    }, [auth]);

    return (
        <div className={"nav"}>
            <Grid
                container
                justifyContent={"flex-end"}
                alignItems={"center"}
                spacing={3}
            >
             
                <Grid item>
                    <Button>
                        <Link href={"/posts"}>
                            <Typography variant={"body1"} className={"color-black text-center not-uppercase"}>
                                Posts
                            </Typography>
                        </Link>
                    </Button>
                </Grid>

                {
                    [...simpleLinks, ...activeLinks].map(v => (
                        <Grid item key={Math.random()}>
                            <Button>
                                <Link href={v.link}>
                                    <Typography variant={"body1"} className={"color-black text-center not-uppercase"}>
                                        {v.name}
                                    </Typography>
                                </Link>
                            </Button>
                        </Grid>
                    ))
                }

           
            </Grid>
        </div>
    );
}