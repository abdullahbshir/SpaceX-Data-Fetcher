document.getElementById('fetchButton').addEventListener('click', function() {
    const shipsContainer = document.querySelector('.ship');
    if (shipsContainer.style.display === 'none') {
        shipsContainer.style.display = 'block';
    } else {
        shipsContainer.style.display = 'none';
    }
});
const url = 'https://api.spacexdata.com/v3/ships';

async function shipDetails(ship_id) {
    console.log("inside function", ship_id);
    try {
        const response = await fetch(`https://api.spacexdata.com/v3/ships/${ship_id}`);
        const shipData = await response.json();
        return shipData;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function fetchData() {
    try {
        const response = await fetch(url);
        const ships = await response.json();

        // Find the container where the ship data will be displayed
        const shipContainer = document.getElementById('ship-container');

        // Clear any previous content
        shipContainer.innerHTML = '';



        // Loop through the ships and create HTML elements
        for (const ship of ships) {
            // Create a card for each ship
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.width = '19rem';


            
            // Check if ship image exists
            if (ship.image) {
                const img = document.createElement('img');
                img.src = ship.image;
                img.classList.add('card-img-top');
                card.appendChild(img);
                card.style.height = '50%';
                
                card.style.display = 'block'; 
            } else {
                card.style.display = 'none';
            }


            // Card body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');



            // Ship name
            // const shipName = document.createElement('h5');
            // shipName.classList.add('card-title');
            // shipName.textContent = `Name: ${ship.ship_name}`;
            // cardBody.appendChild(shipName);

            // Details button
            const detailsButton = document.createElement('button');
            detailsButton.classList.add('btn', 'btn-info');
            detailsButton.textContent = 'Details';
            



            // Details div
            const detailsDiv = document.createElement('div');
            detailsDiv.style.display = 'none';



            // Add event listener for the details button
            detailsButton.addEventListener('click', async () => {
                const shipData = await shipDetails(ship.ship_id);
                console.log(shipData);

                if (shipData) {
                    detailsDiv.innerHTML = `
                        <h5>Ship ID: ${shipData.ship_id}</h5>
                        <p>ABS: ${shipData.abs}</p>
                        <p>Weight (lbs): ${shipData.weight_lbs}</p>
                        <p>Weight (kg): ${shipData.weight_kg}</p>
                        <p>Year Built: ${shipData.year_built}</p>
                        <p>Home Port: ${shipData.home_port}</p>
                    `;
                    detailsDiv.style.display = 'block';
                } else {
                    detailsDiv.innerHTML = '<p>Error fetching details.</p>';
                }
            });



            // Append button and details to card body
            cardBody.appendChild(detailsButton);
            cardBody.appendChild(detailsDiv);
            card.appendChild(cardBody);
            shipContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}



document.getElementById('fetchButton').addEventListener('click', fetchData);

document.getElementById('homeButton').addEventListener('click', () => {
    window.location.href = 'file:///C:/Users/bashi/Desktop/Practice/Self_Practice/rocket.js/ships.html';
});
