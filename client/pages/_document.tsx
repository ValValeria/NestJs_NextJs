import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
import {Provider} from "react-redux";
import {store} from '../store';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head/>
                <Provider store={store}>
                    <body>
                    <Main />
                    <NextScript />
                    </body>
                </Provider>
            </Html>
        )
    }
}

export default MyDocument
