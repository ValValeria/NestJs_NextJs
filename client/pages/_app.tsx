import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className={"app w-100"}>
          <Header/>
          <div className={"app__content"}>
              <Component {...pageProps} />
          </div>
          <Footer/>
      </div>
  );
}
export default MyApp
