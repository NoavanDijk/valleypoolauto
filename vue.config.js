// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '^/baas': {
                target: 'https://baasdemo.test.nominow.eu',
                changeOrigin: true,
                onProxyReq: function onProxyReq(proxyReq, req, res) {
                    // add custom header to request
                proxyReq.setHeader('ApiToken', 'f35da560-8a5e-4db9-976d-973117b682f6');
                // or log the req
                }
            }
        }
    }
}
