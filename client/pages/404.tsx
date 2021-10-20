import React from 'react';
import BasicLayout from "../layouts/basic-layout/basic-layout";
import {Typography} from "@material-ui/core";

export default function Custom404Page(){
    return (
        <BasicLayout hasTitle={true} text={"404 Error"}>
            <Typography variant={"h6"}>
                The page, which you are looking for, is not founded.
            </Typography>
        </BasicLayout>
    );
}
 
