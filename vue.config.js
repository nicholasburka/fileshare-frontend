module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
	configureWebpack: {
	  resolve: {
	    alias: {
	      'vue$': 'vue/dist/vue.esm.js'
	    }
	  },
	  devServer: {
	    headers: { "Access-Control-Allow-Origin": "*" }
	  }
	}

}