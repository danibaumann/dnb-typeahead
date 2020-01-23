// Init DnB
const dnb = new DnB;
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchCompany');
// Init a timeout variable to be used below
let timeout = null;
const keyupDelayInMilliseconds = 350;

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  clearTimeout(timeout);

  // Get input text
  const compText = e.target.value;

  // Timeout wrapper function
  timeout = setTimeout(() => {
    if (compText != '') {
      // Make http call
      dnb.getCompany(compText).then(result => {
        if (!result.success) {
          // show alert
          ui.showAlert('Company not found', 'alert alert-danger');
          ui.clearCompanyData();
        } else {
          // show company details
          ui.showCompanyDetails(result.data);
        }
      })
    } else {
      // clear data
      ui.clearCompanyData();
    }
  }, keyupDelayInMilliseconds);
});