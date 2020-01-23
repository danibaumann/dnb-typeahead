class DnB {
  constructor() {
    this.countryISOAlpha2Code = 'CH';
    this.isOutOfBusiness = 'false';
    this.token = '1C1h55I6T3YiV1PTpb4Lz73JeuPi';
    this.clientSecret = '';
    this.fetchURL = 'http://localhost/v1/search/typeahead/';
  }

  async getCompany(searchText) {
    const headers = new Headers({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    const companyResponse = await fetch(`${this.fetchURL}?isOutOfBusiness=${this.isOutOfBusiness}&countryISOAlpha2Code=${this.countryISOAlpha2Code}&searchTerm=${searchText}`, {
      mode: 'no-cors', // no-cors, *cors, same-origin
      //credentials: 'same-origin', // include, *same-origin, omit
      headers
    });

    const companyData = await companyResponse.json();

    return {
      company: companyData
    }
  }
}