// Init DnB
const dnb = new DnB;

// Search input
const searchUser = document.getElementById('searchCompany');

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const compText = e.target.value;

  if (compText != '') {
    // Make http call
    dnb.getCompany(compText).then(data => {
      console.log(data);
    })
  }
});