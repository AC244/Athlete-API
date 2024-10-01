const leaguesDiv = document.getElementById('leagues');

const getLeagues = async () => {
    try {
        let response = await axios.get('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
        const leaguesData = response.data.leagues;

        leaguesDiv.innerHTML = '';

        if (leaguesData && leaguesData.length > 0) {
            leaguesData.forEach(league => {
                const leagueDiv = document.createElement('div');
                leagueDiv.className = 'league-card';

                const nameElement = document.createElement('h2');
                nameElement.innerHTML = league.strLeague;

                const sportElement = document.createElement('p');
                sportElement.innerHTML = `<strong>League:</strong> ${league.strLeague || 'N/A'}`;

                const countryElement = document.createElement('p');
                countryElement.innerHTML = `<strong>Sport:</strong> ${league.strSport || 'N/A'}`;

                leagueDiv.appendChild(nameElement);
                leagueDiv.appendChild(sportElement);
                leagueDiv.appendChild(countryElement);
                leaguesDiv.appendChild(leagueDiv);
            });
        } else {
            leaguesDiv.innerHTML = 'No leagues found.';
        }
    } catch (error) {
        console.error('Error fetching leagues data:', error);
        leaguesDiv.innerHTML = 'An error occurred while fetching leagues data.';
    }
};

// Fetch leagues when the page loads
window.onload = getLeagues;