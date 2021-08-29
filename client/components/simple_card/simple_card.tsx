import React from "react";
import Typography from '@material-ui/core/Typography';

interface Props{
    title: string,
    descr: string,
    cssClass?: string
}

export default function SimpleCard(props: Props){
   return (
      <div className={"simple-card " + (props.cssClass || "")}>
           <div className={"simple-card__container"}>
               <div className={"simple-card__img"}></div>
               <div className={"simple-card__txt"}>
                   <Typography variant="h4" gutterBottom>
                       {props.title}
                   </Typography>

                   <Typography variant="subtitle1" gutterBottom>
                       {props.descr}
                   </Typography>
               </div>
           </div>
      </div>
   );
}