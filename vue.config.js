// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '^/baas': {
                target: 'https://baasdemo.test.nominow.eu',
                changeOrigin: true,
                headers: {
                    apitoken: 'f35da560-8a5e-4db9-976d-973117b682f6'
                }
            }
        }
    }
}
