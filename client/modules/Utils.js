
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
  static pgFormatDate(date) {
    function zeroPad(d) {
      return ("0" + d).slice(-2)
    }

    var parsed = new Date(date)

  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate()), zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(" ");
  }

  static isDate(object){
    return Object.prototype.toString.call(object) === '[object Date]';
  }

  static calculateAge(birthday) { // birthday is a date
    birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}


export default Utils;
