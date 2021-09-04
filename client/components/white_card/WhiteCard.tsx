import React from "react";

interface Props{
    children: any,
}

export default function WhiteCard(props: Props){
    return (
        <div className={"white-card center w-100"}>
            <div className={"white-card__content center w-100"}>
                {props.children}
            </div>
        </div>
    )
}