class Auth {

  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
      this.validateAuthentification();
     return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    let request = new Request('/api/logout',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    fetch(request,{credentials: 'include'});
    localStorage.removeItem('token');
  }

  static validateAuthentification(){
    let request = new Request('/api/isAuthenticated',{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    fetch(request,{credentials: 'include'})
    .then(res=>res.json())
    .then(data=>{
        if(!data.connected)
          this.deauthenticateUser();
        else{
          //this.authenticateUser(data.user); //TODO fix bug when user logout and refreshes the page he is still logged in client-side
        }
    });

  }
  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
