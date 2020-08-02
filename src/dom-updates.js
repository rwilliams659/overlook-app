const domUpdates = {

  //login view
  displayFormError() {
    let errorMsg = document.getElementById('error-msg');
    errorMsg.innerText = 'Username or password invalid. Please try again.';
  },
  

}

module.exports = domUpdates; 


// if (typeof module !== "undefined") {
//   module.exports = domUpdates;
// }