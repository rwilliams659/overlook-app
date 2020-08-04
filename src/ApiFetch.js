class ApiFetch {
  constructor() {
    this.root = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/'
  }

  fetch(urlEnd) {
    const url = this.root + urlEnd
    return fetch(url).then(response => response.json())
  }


}

module.exports = ApiFetch