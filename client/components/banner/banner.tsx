import React from "react";
import BasicLayout from "../../layouts/basic-layout/basic-layout";
import Image from 'next/image';
import rewards from '../../public/rewards.png'
import {Typography} from "@material-ui/core";

export default function Banner(){
    return (
      <div className={"banner"}>
          <BasicLayout hasTitle={false}>
              <div className={"banner__content d-flex align-items-center justify-content-center"}>
                  <div className={"banner__img"}>
                      <Image src={rewards} alt={"..."}/>
                  </div>
                  <div className={"banner__text"}>
                      <Typography variant="h1" component="h2" gutterBottom>
                          New friends
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                          Find new friends on our website. Discover new opportunities
                      </Typography>
                  </div>
              </div>
          </BasicLayout>
      </div>
    );
}