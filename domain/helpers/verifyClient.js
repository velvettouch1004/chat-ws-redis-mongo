const headerSecurity = require('../../infrastructure/config/applicationConfig').protocolHeader;
const authService = require('../../infrastructure/clients/http');

const verifyClient = async (info, next) => {

    if(!info.req.headers[headerSecurity]) {
        return next(false);
    }

    try {
        const token = info.req.headers[headerSecurity];

        //TODO Organize auth flow according to FIREBASE API in the http client file
        console.debug(`Token: ${token}`);

        /*if(await authService.getAuthUser(token)) {
            next(true)
        }*/
        next(true);
    } catch (error) {
        console.error(`Not authorized for connecting to ws server. Tracked error: ${error}`);
        return next(false);
    }
};

module.exports = verifyClient;
