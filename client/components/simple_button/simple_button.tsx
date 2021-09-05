import React from "react";
import Typography from '@material-ui/core/Typography';

interface Props{
    text: string
}

export default function SimpleButton({text}: Props){
    return (
        <button className={"simple_button"}>
            <Typography  variant="subtitle1">
                {text}
            </Typography>
        </button>
    );
}