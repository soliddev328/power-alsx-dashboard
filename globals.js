module.exports = {
  NODE_ENV: "production",
  dev: {
    API: "https://comenergy-api-staging.herokuapp.com",
    //API: "http://localhost:5001",
    SEGMENT_KEY: "zAFMGeybdkriupfPqCYanAHc9HUNhAug",
    FULLSTORY_KEY: "NULL",
    STRIPE_KEY: "pk_test_XZitL2jhXqRuAGQuzzYnIcwW",
    PLAID_KEY: "6a39ce056577235f452bcf275b5191",
    FB_APP_ID: "354393852058288",
    FIREBASE: {
      APIKEY: "AIzaSyATeEWLPU0S8ia_GDFoYFqwUOYsQPFK4IY",
      PROJECTID: "ce-customer-portal-auth",
      DATABASE: "https://ce-customer-portal-auth.firebaseio.com",
      BUCKET: "ce-customer-portal-auth.appspot.com",
      SENDERID: "273326053550"
    }
  },
  prod: {
    API: "https://api.commonenergy.us",
    SEGMENT_KEY: "5zpSiwIkrWVXtGA2t2Xvuv42XQYYErAB",
    FULLSTORY_KEY: "7ZZDY",
    STRIPE_KEY: "pk_live_MxPO1LbCVcS8l7SnDOiGfBmQ",
    PLAID_KEY: "6a39ce056577235f452bcf275b5191",
    FB_APP_ID: "1861844694112540",
    FIREBASE: {
      APIKEY: "AIzaSyATeEWLPU0S8ia_GDFoYFqwUOYsQPFK4IY",
      PROJECTID: "ce-customer-portal-auth",
      DATABASE: "https://ce-customer-portal-auth.firebaseio.com",
      BUCKET: "ce-customer-portal-auth.appspot.com",
      SENDERID: "273326053550"
    }
  }
};
