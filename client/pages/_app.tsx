import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from "react-redux";
import {store} from '../store/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
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
