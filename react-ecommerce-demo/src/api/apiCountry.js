const API_BASE_URL = "https://api.countrystatecity.in/v1";

export default {
  getCountries: `${API_BASE_URL}/countries`,
  getStates: (countryCode) => `${API_BASE_URL}/countries/${countryCode}/states`,

 };
