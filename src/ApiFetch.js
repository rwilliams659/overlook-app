class ApiFetch {
  constructor() {
    this.root = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/'
  }

  fetch(urlEnd) {
    const url = this.root + urlEnd
    return fetch(url).then(response => response.json())
  }

  delete(bookingId) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "id": bookingId
        }
      ),
    })
      .then(response => console.log(response.status))
      .catch(err => console.error(err))
  }

}

export default ApiFetch