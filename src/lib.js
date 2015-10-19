
function getJSON(url,sucess,error){

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        sucess(JSON.parse(this.responseText));
      } else {
        error(this.responseText);
      }
    }
  };

  request.send();
  //request = null;

}

export default { get: getJSON } ;
