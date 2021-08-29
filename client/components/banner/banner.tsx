import React from "react";
import BasicLayout from "../../layouts/basic-layout/basic-layout";
import Image from 'next/image';
import rewards from '../../public/rewards.png'
import {Button, Typography} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import SimpleButton from "../../components/simple_button/simple_button";

export default function Banner(){
    return (
      <div className={"banner"}>
          <BasicLayout hasTitle={false}>
              <Grid container justifyContent={"center"} spacing={8} alignItems={"center"}>
                  <Grid container xs={7} direction={"column"} spacing={2}>
                      <Grid item>
                          <Typography variant="h1" component="h2" gutterBottom>
                              New friends
                          </Typography>
                      </Grid>

                      <Grid item>
                          <Typography variant="body1" gutterBottom>
                              Find new friends on our website. Discover new opportunities
                          </Typography>
                      </Grid>

                      <Grid item>
                          <SimpleButton text={"Learn more"}/>
                      </Grid>
                  </Grid>

                  <Grid item xs={4}>
                      <div className={"banner__img"}>
                          <Image src={rewards} alt={"..."}/>
                      </div>
                  </Grid>
              </Grid>
          </BasicLayout>
      </div>
    );
}