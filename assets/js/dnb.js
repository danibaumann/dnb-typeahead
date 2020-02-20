class DnB {
  constructor() {
    this.searchURL = 'https://api.dev.screenstyle.ch/v1/search';
    this.matchURL = 'https://api.dev.screenstyle.ch/v1/match'
  }

  async getCompany(searchText) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const companyResponse = await fetch(`${this.searchURL}/typeahead?searchTerm=${searchText}`, {
      headers
    });

    const data = await companyResponse.json();

    return data
  }

  // fetch company details based on duns number
  async getCompanyDetailsForDuns(duns) {
    console.log(`will fetch company details for DUNS ${duns}`)
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const companyDetails = await fetch(`${this.matchURL}/cleanseMatch?duns=${duns}`, {
      headers
    });
    const data = await companyDetails.json();

    return data
  }
}