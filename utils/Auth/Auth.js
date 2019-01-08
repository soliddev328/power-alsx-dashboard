export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'testingpurpose.auth0.com',
    clientID: 'hUwE2PqLMjL82P7vc58k9XoKdqpFYJl6',
    redirectUri: 'http://localhost:3000/callback'
  });
}
