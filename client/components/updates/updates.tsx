import React from "react";
import {Grid, Typography} from "@material-ui/core";
import WhiteCard from "../../components/white_card/WhiteCard";
import BasicLayout from "../../layouts/basic-layout/basic-layout";
import SimpleButton from '../../components/simple_button/simple_button';

export default function Updates() {
    const data = [
        { title: "New interface", descr: " We have developed a new interface in three months"},
        { title: "New interface", descr: " We have developed a new interface in three months"},
        { title: "New interface", descr: " We have developed a new interface in three months"},
    ];

    return (
        <BasicLayout text={"Our updates"}>
            <Grid container
                justifyContent={"center"}
                spacing={3}
                alignItems={"center"}
                className={"w-100" }
            >
                {
                    data.map(v => (
                        <Grid item xs={4} key={Math.random()}>
                            <WhiteCard>
                                <Grid container
                                    spacing={2}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    direction={"column"}
                                >
                                    <Grid item>
                                        <Typography variant={"h6"} component={"h5"}>
                                            {v.title}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant={"body1"} component={"h5"} className={"text-center"}>
                                            {v.descr}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <SimpleButton text={"Read more"} />
                                    </Grid>
                                </Grid>
                            </WhiteCard>
                        </Grid>

                    ))
                }                
            </Grid>
        </BasicLayout>
    );
}