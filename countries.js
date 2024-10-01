const countriesDiv = document.getElementById('countries');

const getCountries = async () => {
    try {
        let response = await axios.get('https://www.thesportsdb.com/api/v1/json/3/all_countries.php');
        const countriesData = response.data.countries;

        countriesDiv.innerHTML = '';

        if (countriesData && countriesData.length > 0) {
            countriesData.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.className = 'country-card';

                const flagElement = document.createElement('img');
                flagElement.src = country.flag_url_32 || 'placeholder-flag-url.jpg';
                flagElement.alt = `${country.name_en} Flag`;
                flagElement.className = 'country-flag';

                const nameElement = document.createElement('h2');
                nameElement.innerHTML = country.name_en;

                countryDiv.appendChild(flagElement);
                countryDiv.appendChild(nameElement);
                countriesDiv.appendChild(countryDiv);
            });
        } else {
            countriesDiv.innerHTML = 'No countries found.';
        }
    } catch (error) {
        console.error('Error fetching countries data:', error);
        countriesDiv.innerHTML = 'An error occurred while fetching countries data.';
    }
};


window.onload = getCountries;