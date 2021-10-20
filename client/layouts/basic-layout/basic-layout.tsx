import React from "react";
import Typography from '@material-ui/core/Typography';


interface IBasicLayoutProps{
    children?: any,
    hasTitle?: boolean,
    text?: string,
    className?: string
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
        const cssClasses = {section: true, 'w-100': true, 'center': true};
        const cssText = Object.keys(Object.fromEntries(Object.entries(cssClasses).filter(([k, v]) => v))).join(" ");

        if(this.props.className){
           const obj = this.props.className.split(/\s+/).map(v => [v, true]);
           Object.assign(cssClasses, Object.fromEntries(obj));
        }

        return (
            <section className={cssText} style={styles}>
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
