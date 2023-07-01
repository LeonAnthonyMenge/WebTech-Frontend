import OktaSignIn from "@okta/okta-signin-widget";
import { OktaAuth } from '@okta/okta-auth-js';

const oktaSignIn = new OktaSignIn({
    baseUrl: "https://trial-3481945-admin.okta.com/",
    clientId: "0oa68p66vnd7m36j5697",
    redirectUri: process.env.VUE_APP_Frontend_BASE_URL + '/login/callback',
    authParams: {
        pkce: true,
        issuer: "https://trial-3481945.okta.com/oauth2/default",
        display: "page",
        scopes: ["openid", "profile", "email"]
    },
    features: { registration: true }
});

const oktaAuth = new OktaAuth({
    issuer: "https://trial-3481945.okta.com/oauth2/default",
    clientId: "0oa68p66vnd7m36j5697",
    redirectUri: process.env.VUE_APP_Frontend_BASE_URL,
    scopes: ["openid", "profile", "email"]
});

export { oktaAuth, oktaSignIn };
