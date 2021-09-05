import React from "react";
import BasicLayout from "../../layouts/basic-layout/basic-layout";
import WhiteCard from "../white_card/WhiteCard";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import SimpleButton from "../../components/simple_button/simple_button";

export default function Contacts(){
    return (
        <div className={"contacts"} id={"contacts"}>
            <BasicLayout text={"Contact us"}>
                <WhiteCard>
                    <form className={"contacts__form w-100 center"}>
                        <Grid
                            container
                            direction={"column"}
                            spacing={4}
                            alignItems={"center" }
                        >
                            <Grid item className={"w-100"}>
                                <div className={"contacts__field w-100"}>
                                    <TextField id="outlined-basic" label="Email" variant="outlined" className={ "w-100"}/>
                                </div>
                            </Grid>

                            <Grid item className={"w-100"}>
                                <div className={"contacts__field w-100"}>
                                    <TextField id="outlined-basic" label="Short message" variant="outlined" className={"w-100"} />
                                </div>
                            </Grid>

                            <Grid item>
                                <SimpleButton text={ "Submit"}/>
                            </Grid>
                        </Grid>
                    </form>
                </WhiteCard>
            </BasicLayout>
        </div>
    );
}