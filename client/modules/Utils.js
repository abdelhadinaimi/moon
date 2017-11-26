
class Utils{
  static capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static getUserInfo(username){
    let request = new Request('http://localhost:3000/api/user/'+username,{
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return fetch(request,{credentials: 'include'})
    .then(res=>res.json())
    .then(data => data);
  }
}


export default Utils;
