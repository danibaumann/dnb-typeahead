class UI {
  constructor() {
    this.companyList = document.getElementById('complist');
  }
  showCompanyDetails(comps) {
    this.clearCompanyData();
    for (const rec of comps) {
      const org = rec.organization;
      // console.log(organization.primaryName);
      // output to html
      this.companyList.innerHTML += `
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${org.primaryName}</h5>
            <small>DUNS&copy;: ${org.duns}</small>
          </div>
          <p class="mb-1">
            ${org.primaryAddress.streetAddress.line1}, ${org.primaryAddress.addressLocality.name} - ${org.primaryAddress.addressCountry.isoAlpha2Code}
          </p>
          <small>Industry: ${org.primaryIndustryCodes[0].usSicV4Description}</small>
        </a>
      `
    }
  }
  clearCompanyData() {
    this.companyList.innerHTML = '';
  }
  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.searchContainer');
    const search = document.querySelector('.search');
    container.insertBefore(div, search);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}