const configuration = {
    apiUrl: process.env.REACT_APP_API_URL,
    apiToken: process.env.REACT_APP_API_TOKEN,
    apiAccountId: process.env.REACT_APP_API_ACCOUNT_ID,
    auth0Domain: process.env.REACT_APP_API_DOMAIN,
    auth0ClientId: process.env.REACT_APP_API_CLIENT_ID,
    auth0RedirectUrl: process.env.REACT_APP_API_CALLBACK_URL,
    protectedApiUrl: process.env.REACT_APP_PROTECTED_API_URL,
    auth0Audience: process.env.REACT_APP_API_AUDIENCE,
};

export default configuration;