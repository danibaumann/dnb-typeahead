class UI {
  constructor() {
    this.companyList = document.getElementById('complist');
    this.resultContainer = document.getElementById('searchresults');
    this.country = document.getElementById('country');

    let countryList = ["SWITZERLAND", "GERMANY", "UNITED STATES", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTIGUA &AMP; BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA &AMP; HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRITISH VIRGIN ISLANDS", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CAPE VERDE", "CAYMAN ISLANDS", "CHAD", "CHILE", "CHINA", "COLOMBIA", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D IVOIRE", "CROATIA", "CRUISE SHIP", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ESTONIA", "ETHIOPIA", "FALKLAND ISLANDS", "FAROE ISLANDS", "FIJI", "FINLAND", "FRANCE", "FRENCH POLYNESIA", "FRENCH WEST INDIES", "GABON", "GAMBIA", "GEORGIA", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA BISSAU", "GUYANA", "HAITI", "HONDURAS", "HONG KONG", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISLE OF MAN", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JERSEY", "JORDAN", "KAZAKHSTAN", "KENYA", "KUWAIT", "KYRGYZ REPUBLIC", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MAURITANIA", "MAURITIUS", "MEXICO", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NEPAL", "NETHERLANDS", "NETHERLANDS ANTILLES", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORWAY", "OMAN", "PAKISTAN", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT PIERRE &AMP; MIQUELON", "SAMOA", "SAN MARINO", "SATELLITE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOUTH AFRICA", "SOUTH KOREA", "SPAIN", "SRI LANKA", "ST KITTS &AMP; NEVIS", "ST LUCIA", "ST VINCENT", "ST. LUCIA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TIMOR L'ESTE", "TOGO", "TONGA", "TRINIDAD &AMP; TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS &AMP; CAICOS", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "URUGUAY", "UZBEKISTAN", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS (US)", "YEMEN", "ZAMBIA", "ZIMBABWE"];

    // set country options
    for (var i = 0; i < countryList.length; i++) {
      const opt = countryList[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      this.country.appendChild(el);
    }
  }
  showCompanyDetails(comps) {
    this.clearCompanyData();
    this.resultContainer.style.display = 'block';
    // only dispay the first 5 elements from the returned array
    for (let i = 0; i < 5; i++) {
      this.clearAlert();
      const org = comps[i].organization;

      // output results to html
      this.companyList.innerHTML += `
        <a onclick="fetchCompanyDetails(${org.duns})" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <p>${org.primaryName}</p>
            <small>DUNS&copy;: ${org.duns}</small>
          </div>  
          <p>
            ${org.primaryAddress.streetAddress.line1}, ${org.primaryAddress.addressLocality.name} - ${org.primaryAddress.addressCountry.isoAlpha2Code}
          </p>
          <small>Industry: ${org.primaryIndustryCodes[0].usSicV4Description}</small>
        </a>
      `
    }
  }
  clearCompanyData() {
    this.companyList.innerHTML = '';
    this.resultContainer.style.display = 'none';
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