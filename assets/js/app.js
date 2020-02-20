// Init DnB
const dnb = new DnB;
const ui = new UI;

// Set field variables
const searchUser = document.getElementById('searchCompany');
const companyName = document.getElementById('companyName');
const address = document.getElementById('address');
const address2 = document.getElementById('address2');
const country = document.getElementById('country');
const state = document.getElementById('state');
const zip = document.getElementById('zip');
const registrationNumber = document.getElementById('registrationNumber');

// Init a timeout variable to be used below
let timeout = null;
const keyupDelayInMilliseconds = 300;

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

function fetchCompanyDetails(duns) {
  dnb.getCompanyDetailsForDuns(duns).then(result => {
    console.log(result);
    ui.clearCompanyData();
    companyName.value = result.data.primaryName;
    address.value = result.data.primaryAddress.streetAddress.line1;
    address2.value = result.data.primaryAddress.streetAddress.line2;
    country.value = result.data.primaryAddress.addressCountry.name;
    state.value = result.data.primaryAddress.addressLocality.name;
    zip.value = result.data.primaryAddress.postalCode;
    registrationNumber.value = result.data.registrationNumbers[0].registrationNumber;
  });
};