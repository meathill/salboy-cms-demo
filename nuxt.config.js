const {init, Query} = require('leancloud-storage');
const {LEAN_APP_ID, LEAN_SECRET_KEY} = require('./src/config/leancloud');
init({
  appId: LEAN_APP_ID,
  appKey: LEAN_SECRET_KEY,
  serverURLs: 'https://api.salboy.meathill.com',
});
const {POSTS_TABLE} = require('./src/data/constant');
const webpack = require('webpack');
const {DefinePlugin} = webpack;
const pkg = require('package.json');

module.exports = {
  head: {
    titleTemplate: '%s - Salboy',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
    ],
    link: [
      {rel: 'stylesheet', href: 'https://cdn.bootcss.com/twitter-bootstrap/4.4.1/css/bootstrap.min.css'},
      {rel: 'stylesheet', href: 'https://unpkg.com/swiper@5.2.0/css/swiper.min.css'},
    ],
  },

  build: {
    extend(config) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    },
    extractCSS: true,
    plugins: [
      new DefinePlugin({
        version: pkg.version,
      }),
    ],
    babel: {
      presets({isServer}) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {version: 3},
            },
          ],
        ];
      },
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'src/App.vue'),
        children: [
          {
            name: 'page.view',
            path: ':path',
            component: resolve(__dirname, 'src/modules/page/page.vue'),
          },
        ],
      });
    },
  },

  generate: {
    dir: 'static',
    fallback: false,
    async routes() {
      const query = new Query(POSTS_TABLE);
      query.exists('publishedAt');
      const result = await query.find();
      return result.map(item => `/${item.get('subDomain')}`);
    },
  },
}
