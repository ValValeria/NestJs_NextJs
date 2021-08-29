import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux";
import {store} from '../store/index';
import Head from 'next/head';


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
          <Head>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          </Head>
          <div className={"app w-100"}>
              <Header/>
              <div className={"app__content"}>
                  <Component {...pageProps} />
              </div>
              <Footer/>
          </div>
      </Provider>
  );
}
export default MyApp
