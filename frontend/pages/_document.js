import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Document, { Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    static getInitialProps(context) {
        const sheet = new ServerStyleSheet();
        const page = context.renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        return { ...page, helmet: Helmet.renderStatic(), styleTags}; // helmet: Helmet.renderStatic() 이게 있으면 ssr이 가능해 진다.
    }

    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet; // htmlAttributes의 속성들을 제공, bodyAttributes의 속성들을 제공, 나머지 제공
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs}>
                <head>
                    {this.props.styleTags}
                    {Object.values(helmet).map(el => el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main /> {/*app.js 가 된다*/}
                    {process.env.NODE_ENV === 'production'
                    && <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />}
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.propTypes = {
    helmet: PropTypes.object.isRequired,
    styleTags: PropTypes.object.isRequired,
};

export default MyDocument;