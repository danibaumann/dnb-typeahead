// Init DnB
const dnb = new DnB()
const ui = new UI()

//
const delaySlider = document.getElementById("typeahead-delay")
const sliderValue = document.getElementById("slider-value")
// initial value
let typeaheadDelay = 300
sliderValue.innerHTML = typeaheadDelay

// Set field variables
const searchUser = document.getElementById("searchCompany")
const companyName = document.getElementById("companyName")
const address = document.getElementById("address")
const address2 = document.getElementById("address2")
const country = document.getElementById("country")
const state = document.getElementById("state")
const zip = document.getElementById("zip")
const registrationNumber = document.getElementById("registrationNumber")
const jsonOutput = document.getElementById("json-output")
const networkIcon = document.getElementById("network-indicator")
const devModeOutput = document.getElementById("raw-output")

// internal system form
const uidInput = document.getElementById("uid")
const operationStatus = document.getElementById("operationStatus")
const industryCodes = document.getElementById("industryCodes")
const numberOfEmployees = document.getElementById("numberOfEmployees")
const yearlyRevenue = document.getElementById("yearlyRevenue")
const mostSeniorPrinciple = document.getElementById("mostSeniorPrinciple")

const devModeCheckBox = document.getElementById("devModeChecker")

// Dev Mode Checkbox event listener
devModeCheckBox.addEventListener("change", function () {
  if (this.checked) {
    devModeOutput.hidden = false
  } else {
    devModeOutput.hidden = true
  }
})

// get slider Changes
delaySlider.oninput = function () {
  typeaheadDelay = this.value
  sliderValue.innerHTML = this.value
}

// Init a timeout variable to be used below
let timeout = null

// Search input event listener
searchUser.addEventListener("keyup", (e) => {
  console.log(typeaheadDelay)
  clearTimeout(timeout)

  // Get input text
  const compText = e.target.value

  // Timeout wrapper function
  timeout = setTimeout(() => {
    if (compText != "") {
      // set network indicator
      networkIcon.className = "loading"

      // Make http call
      dnb.getCompany(compText).then((result) => {
        if (!result.success) {
          // show alert
          ui.showAlert("Company not found", "alert alert-danger")
          ui.clearCompanyData()
        } else {
          // show company details
          ui.showCompanyDetails(result.data)
          jsonOutput.innerHTML = JSON.stringify(result.data, undefined, 2)
        }
        networkIcon.className = ""
      })
    } else {
      // clear data
      ui.clearCompanyData()
    }
  }, typeaheadDelay)
})

function fetchCompanyDetails(duns) {
  networkIcon.className = "loading"
  dnb.getCompanyDetailsForDuns(duns).then((result) => {
    networkIcon.className = ""
    const comp = result.data
    console.log(comp)
    ui.clearCompanyData()
    companyName.value = comp.primaryName
    address.value = comp.primaryAddress.streetAddress.line1
    address2.value = comp.primaryAddress.streetAddress.line2
    country.value = comp.primaryAddress.addressCountry.name
    state.value = comp.primaryAddress.addressLocality.name
    zip.value = comp.primaryAddress.postalCode
    registrationNumber.value = comp.registrationNumbers[0].registrationNumber
    jsonOutput.innerHTML = JSON.stringify(result, undefined, 2)

    operationStatus.value = comp.dunsControlStatus.operatingStatus.description
    numberOfEmployees.value = comp.numberOfEmployees[0].value
    yearlyRevenue.value = `${comp.financials[0].yearlyRevenue[0].value} ${comp.financials[0].yearlyRevenue[0].currency}`
    mostSeniorPrinciple.value = comp.mostSeniorPrincipals[0].fullName

    // Find UID in registration numvers
    const uid = comp.registrationNumbers.find((e) =>
      e.registrationNumber.includes("-")
    )
    console.log(uid)
    uid
      ? (uidInput.value = uid.registrationNumber)
      : (uidInput.value = comp.registrationNumbers[0].registrationNumber)

    // Hanlde Industry Codes
    const codes = []
    for (const iCode of comp.industryCodes) {
      codes.push(`${iCode.code} - ${iCode.description}`)
    }
    industryCodes.value = codes.join("\n\n")
  })
}
