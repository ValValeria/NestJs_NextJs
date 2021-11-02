import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import 'bootstrap/dist/css/bootstrap.css';
import {loginSuccess} from '../store';
import Head from 'next/head';
import React from 'react';
import {IResponse, IUser} from "../interfaces";
import {connect} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import {Subject, Subscription} from "rxjs";


export const OPEN_SNACKBAR$ = new Subject<string>();

interface MyAppProps{
    loadUserData: (data: IUser) => any;
}

interface MyAppState{
    message: string,
    open: boolean,
    sub: Subscription[]
}

type props = AppProps & MyAppProps;

export const mapDispatchToProps: (dispatch: any) => MyAppProps = (dispatch) => ({
    loadUserData: (data: IUser) => dispatch(loginSuccess(data))
});

class MyApp extends React.PureComponent<props, MyAppState>{
    constructor(props: props) {
        super(props);

        this.state = {
            message: "",
            open: false,
            sub: []
        };
        this.handleClose = this.handleClose.bind(this);
    }

    async componentDidMount(): Promise<void> {
        try{
           this.subscribeToSubjects();
           await this.setUpUserData();
        }catch(e){
           console.error(e.message)
        }
    }

    handleClose(): void{
        this.setState({
            open: false
        });
    }

    subscribeToSubjects(): void{
        const subscription = OPEN_SNACKBAR$.subscribe(v => {
            this.setState({
                message: v,
                open: true
            })
        });

        this.setState((state, props) => ({
            sub: [...state.sub, subscription]
        }));
    }

    async setUpUserData(): Promise<void>{
        const json = localStorage.getItem('auth');

        if(json && json.length){
            const user = JSON.parse(json);
            const response = await fetch('/api/login', {
                method: 'POST',
                body: json,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(response.ok){
                const data: IResponse<any> = await response.json();

                if(data.status === "ok"){
                    this.props.loadUserData(user);
                }
            }
        }
    }

    render(){
        const {Component, pageProps} = this.props;

        return (
            <React.Fragment>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                </Head>
                <div className={"app w-100"}>
                    <Header/>
                    <div className={"app__content"}>
                        <Snackbar
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message={this.state.message}
                            action={"Close"}
                        />
                        <Component {...pageProps} />
                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        );
    }

    componentWillUnmount() {
        this.state.sub.forEach(v => {
            v.unsubscribe();
        })
    }
}

export default connect(null, mapDispatchToProps)(MyApp);
