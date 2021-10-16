import React from 'react';
import BasicLayout from '../layouts/basic-layout/basic-layout';

export default function Post() {
    return (
        <BasicLayout
            hasTitle={true}
            text={"How to create a new app"}
            className={"post"}>

        </BasicLayout>
    );
}
