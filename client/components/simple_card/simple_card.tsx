import React from "react";
import Typography from '@material-ui/core/Typography';

interface Props{
    title?: string,
    descr?: string,
    cssClass?: string,
    children?: any
}

export default function SimpleCard(props: Props){
   let Element = (
       <div className={"w-100"}>
           {props.children}
       </div>
   );

   if(props.title && props.descr){
       Element = (
         <>
             <div className={"simple-card__txt"}>
                 <div className={"simple-card__img"}></div>
                 
                 <Typography variant="h4" gutterBottom>
                     {props.title}
                 </Typography>

                 <Typography variant="subtitle1" gutterBottom>
                     {props.descr}
                 </Typography>
             </div>
         </>
       );
   }

   return (
      <div className={"simple-card " + (props.cssClass || "")}>
           <div className={"simple-card__container"}>
               {Element}
           </div>
      </div>
   );
}