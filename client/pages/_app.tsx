import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div className={"w-100"}>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </div>
  );
}
export default MyApp
