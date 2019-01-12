module.exports = {
  NODE_ENV: 'development',
  dev: {
    API: 'https://comenergy-api-staging.herokuapp.com',
    SEGMENT_KEY: 'zAFMGeybdkriupfPqCYanAHc9HUNhAug',
    STRIPE_KEY: 'pk_test_XZitL2jhXqRuAGQuzzYnIcwW',
    PLAID_KEY: '6a39ce056577235f452bcf275b5191'
  },
  prod: {
    API: '',
    SEGMENT_KEY: '5zpSiwIkrWVXtGA2t2Xvuv42XQYYErAB',
    STRIPE_KEY: '',
    PLAID_KEY: ''
  }
};
