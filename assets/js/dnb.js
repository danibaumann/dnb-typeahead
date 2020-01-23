class DnB {
  constructor() {
    this.fetchURL = 'https://api.dev.screenstyle.ch/v1/search/typeahead';
  }

  async getCompany(searchText) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const companyResponse = await fetch(`${this.fetchURL}?searchTerm=${searchText}`, {
      headers
    });

    const data = await companyResponse.json();

    return data
  }
}