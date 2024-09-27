const search = document.querySelector('.arrowButton');
const input = document.getElementById('input');
const playerName = document.getElementById('playerName');


const getPlayer = async (name) => {
    try {
        let response = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`);
        const playerData = response.data.player;

        playerName.innerHTML = '';

        if (playerData && playerData.length > 0) {
            for (let i = 0; i < playerData.length; i++) {
                const player = playerData[i];

                const playerDiv = document.createElement('div');
                playerDiv.className = 'player-card';

                const nameElement = document.createElement('h2');
                nameElement.innerHTML = `Player: ${player.strPlayer}`;
                playerDiv.appendChild(nameElement);

                const imageElement = document.createElement('img');
                imageElement.src = player.strCutout || 'placeholder-image-url.jpg';
                imageElement.alt = `${player.strPlayer} Image`;
                playerDiv.appendChild(imageElement);

                playerDiv.innerHTML += `
                    <p><strong>Sport:</strong> ${player.strSport || 'N/A'}</p>
                    <p><strong>Position:</strong> ${player.strPosition || 'N/A'}</p>
                    <p><strong>Height:</strong> ${player.strHeight || 'N/A'}</p>
                    <p><strong>DOB:</strong> ${player.dateBorn || 'N/A'}</p>
                    <p><strong>Birthplace:</strong> ${player.strBirthLocation || 'N/A'}</p>
                    <p><strong>Team:</strong> ${player.strTeam || 'N/A'}</p>
                    <p><strong>Description:</strong> ${player.strDescriptionEN || 'No description available.'}</p>
                `;

                const fanartContainer = document.createElement('div');
                fanartContainer.className = 'fanart-container';

                const fanarts = [player.strFanart1, player.strFanart2, player.strFanart3];
                fanarts.forEach((fanart, index) => {
                    if (fanart) {
                        const imgElement = document.createElement('img');
                        imgElement.src = fanart;
                        imgElement.alt = `Fanart ${index + 1}`;
                        imgElement.className = 'fanart-image'; // Add class for styling
                        fanartContainer.appendChild(imgElement);
                    }
                });

                playerDiv.appendChild(fanartContainer);
                     playerName.appendChild(playerDiv);
            }
        } else {
            playerName.innerHTML = 'Player not found.';
        }
    } catch (error) {
        console.error('Error fetching player data:', error);
        playerName.innerHTML = 'An error occurred while fetching player data.';
    }
};

search.addEventListener('click', () => {
    const playerNameInput = input.value.trim();
    if (playerNameInput) {
        getPlayer(playerNameInput);
    } else {
        playerName.innerHTML = 'Please enter a player name.';
    }
});

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const playerNameInput = input.value.trim(); 
        if (playerNameInput) {
            getPlayer(playerNameInput); 
        } else {
            playerName.innerHTML = 'Please enter a player name.'; 
        }
    }
});

