// to make calls to own api
const axios = require('axios');

const getAuthUser = async (token) => {
    const url = '';
    const headerAuth = `Bearer ${token}`;

    const infoBack = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
    console.log(infoBack.data.abilities);

    // Proving ~get~ axios
    // TODO: Call own security api to validate the token (in this case: firebase api)
    // mocks meanwhile

    var userInfo = {
        'id': '3',
        'name': 'Laura Zuleta'
    };
    if (token === 'tokenuser1') {
        userInfo = {
            'id': '1',
            'name': 'Santiago Cadavid'
        };
    }
    if (token === 'tokenuser2') {
        userInfo = {
            'id': '2',
            'name': 'Laura Cadavid'
        };
    }


    return new Promise((resolve, reject) => resolve(userInfo));
};

module.exports = {
    getAuthUser: getAuthUser
};
