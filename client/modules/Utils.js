import * as mime from 'react-native-mime-types';

class Utils{
  static capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
    if(!birthday) return '';
    birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  static getFileExt(file){
    const ext = mime.extension(file.type);
    let type = '';
    if(ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'bmp'){
      type = 'pi';
    }
    else if(ext === 'avi' || ext === 'mp4' || ext === 'mov' || ext === 'wmv' || ext === 'flv' || ext === 'webm'){
      type = 'vi';
    }
    else if(ext === 'wav' || ext === 'mp3' || ext === 'ogg' || ext === 'aac'){
      type = 'mu';
    }
    return {type,ext};
  }

}


export default Utils;
