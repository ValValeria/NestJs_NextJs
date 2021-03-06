import { Typography } from '@material-ui/core';
import React from 'react';
import BasicLayout from '../layouts/basic-layout/basic-layout';

export default function Custom500Page(){
    return (
        <BasicLayout hasTitle={true} text={"404"}>
            <Typography variant={"h6"}>
                Some errors have occurred
            </Typography>
        </BasicLayout>
        );
}
