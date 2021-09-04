import React from "react";
import {Grid, Typography} from "@material-ui/core";
import SimpleCard from "../../components/simple_card/simple_card";
import WhiteCard from "../../components/white_card/WhiteCard";
import BasicLayout from "../../layouts/basic-layout/basic-layout";

export default function Achievements(){
    return (
        <BasicLayout text={"Our achievement"}>
            <Grid item
                container
                spacing={3}
                justifyContent={"center"}
            >
                <Grid item xs={4}>
                    <SimpleCard title={"714K"} descr={"Weekly visits"} />
                </Grid>

                <Grid item xs={4}>
                    <SimpleCard title={"470K"} descr={"The number of our users"} />
                </Grid>

                <Grid item xs={4}>
                    <SimpleCard title={"956"} descr={"The number of downloads"} />
                </Grid>
            </Grid>
        </BasicLayout>
    );
}
