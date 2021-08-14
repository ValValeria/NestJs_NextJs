import React from "react";
import Typography from '@material-ui/core/Typography';


interface IBasicLayoutProps{
    title:{
        typography: "h1" | "h2" | "h3" | "h4",
        text: string
    },
    children?: any,
    hasTitle?: boolean,
    isSection?: boolean,
    text: string
}

export default class BasicLayout extends React.PureComponent<IBasicLayoutProps>{
    static defaultProps = {
       title: {
           typography: "h3",
           text: ""
       },
        text: ""
    }

    constructor(props: IBasicLayoutProps) {
        super(props);
    }

    render(){
        const styles = {minHeight: this.props.isSection ? "100px" : "80vh"};


        return (
            <section className={"section w-100 center"} style={styles}>
                <div className={"section__wrap center flex-column " + (!this.props.isSection) && 'section__wrap-half'}>
                    {
                        Boolean(this.props.hasTitle || this.props.text) && (
                            <div className={"section__title text-center"}>
                                <Typography variant={this.props.title?.typography}
                                            component={this.props.title?.typography}
                                            gutterBottom>
                                    {this.props.title?.text.toUpperCase() || this.props.text.toUpperCase()}
                                </Typography>
                            </div>
                        )
                    }
                    <div className={"section__items w-100 center"}>
                        {this.props.children}
                    </div>
                </div>
            </section>
        );
    }
}
