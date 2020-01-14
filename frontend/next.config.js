const withBundleAnalyzer = require('@next/bundle-analyzer')({ // 프론트 서버랑 프론트 분석 해준다
    enabled: process.env.ANALYZE === 'true',
});
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
    distDir: '.next',
    webpack(config) {
        const prod = process.env.NODE_ENV === 'production'; // 배포 환경
        const plugins = [
            ...config.plugins,
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ];
        if (prod) {
            plugins.push(new CompressionPlugin()); // main.js.gz
        }
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval', // hidden-source-map: 소스코드 숨기면서 에러시 소스맵 제공 eval: 빠르게 웹팩 적용
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        loader: 'webpack-ant-icon-loader',
                        enforce: 'pre',
                        include: [
                            require.resolve('@ant-design/icons/lib/dist'),
                        ],
                    },
                ],
            },
            plugins,
        };
    },
});

//NODE_ENV 가 배포 환경인지 개발 환경인지 구분 시켜 주는 것 