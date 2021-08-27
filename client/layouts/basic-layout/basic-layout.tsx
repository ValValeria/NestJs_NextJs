import React from "react";
import Typography from '@material-ui/core/Typography';


interface IBasicLayoutProps{
    children?: any,
    hasTitle?: boolean,
    text?: string
}

export default class BasicLayout extends React.PureComponent<IBasicLayoutProps>{
    static defaultProps = {
        text: "",
        hasTitle: true
    }

    constructor(props: IBasicLayoutProps) {
        super(props);
    }

    render(){
        const styles = {minHeight: "80vh"};

        return (
            <section className={"section w-100 center"} style={styles}>
                <div className={"section__wrap center flex-column wrap"}>
                    {
                        this.props.hasTitle && (
                            <div className={"section__title text-center"}>
                                <Typography variant={"h3"}
                                            component={"h3"}
                                            gutterBottom>
                                    {this.props.text?.toUpperCase()}
                                </Typography>
                            </div>)
                    }
                    <div className={"section__items w-100 center"}>
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}
