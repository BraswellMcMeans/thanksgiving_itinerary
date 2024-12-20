// itinerary.js

const itinerary = [
    {
        day: "Friday, November 22",
        title: "Arrive in LA",
        activities: [
            "6:43pm - Mom & Dad land in LAX",
            "7:00 Pick up AVIS rental car - $100.47",
            "Stay at SLS Luxury Collection in LA - $484.99"
        ]
    },
    {
        day: "Saturday, November 23",
        title: "Vegas Arrival",
        activities: [
            "4:20pm - Brittany & Zac Land in Las Vegas (AA1365)",
            "3:47pm - Braswell & Tara Land in Las Vegas (DL2922)",
            "Mom & Dad Empire Concert",
            "Walk around the Strip",
            "Visit Old Vegas Strip",
            "Kids Stay at Las Vegas Hilton Resorts World - 60k Points",
            "Mom & Dad stay at SLS in LA - $484.99"
        ]
    },
    {
        day: "Sunday, November 24",
        title: "Exploring Las Vegas",
        activities: [
            "10:30 - Mom & Dad drop off rental car",
            "11:35am - Mom & Dad depart LAX (DL1696)",
            "12:54pm - Mom & Dad land in Las Vegas (DL1696)",
            "1:30pm - Mom & Dad Pick up Rental Car (Premium SUV) - $344.77",
            "2:00pm - Check  into Hotel",
            "5:00pm - Head to Dinner",
            "6:30pm - Be at Cirque du Soleil 'O' - $208",
            "Stay the night at the Bellagio 1K & 2Q - $536.60"
        ]
    },
    {
        day: "Monday, November 25",
        title: "Grand Canyon and St. George",
        activities: [
            "7:00am - Leave Bellagio for the Grand Canyon",
            "12:00pm - Arrive at Grand Canyon, lunch and sightseeing",
            "3:00pm - Drive to St. George",
            "6:00pm - Check into St. George hotel (Advenire Autograph Collection) 1K & 2Q - $393.14",
            "7:00pm - Dinner in St. George"
        ]
    },
    {
        day: "Tuesday, November 26",
        title: "Back to Las Vegas",
        activities: [
            "10:00am - Drive back to Las Vegas",
            "1:00pm - Check into Bellagio",
            "5:30pm - Dinner in Vegas",
            "7:30pm - Arrive at Omega Mart - $64",
            "Stay the night at Bellagio 1K & 2Q - $537"
        ]
    },
    {
        day: "Wednesday, November 27",
        title: "Flight to Seattle, Drive to Vancouver",
        activities: [
            "8:50am - Leave hotel and head to drop off rental car",
            "9:15am - Drop off rental car",
            "11:10am - Flight departs Las Vegas to Seattle (DL2922)",
            "2:05pm - Land in Seattle",
            "2:40pm - Pick up rental car - $449.27",
            "3:00pm - Drive to Whistler",
            "9:00pm - Arrive in Whistler, check into The Westin Resort Penthouse Suite 1K & 1Q - $1,858.42",

        ]
    },
    {
        day: "Thursday, November 28",
        title: "Thanksgiving in Whistler",
        activities: [
            "6:00am - Wake up",
            "7:00am - Leave airbnb to go pick up gear",
            "8:00am - LIFTS OPEN",
            "10:30am - Mom & Brittany & Zac Head to Scandinave Spa Whistler ($103)",
            "3:00pm - Lifts Close. Head Back to House",
            "4:00 - Start Making Thanksgiving dinner",
            "7:30pm Eat Thanksgiving dinner in Vancouver"
        ]
    },
    {
        day: "Friday, November 29",
        title: "Explore Vancouver",
        activities: [
            "10:00am - Wake up",
            "11:00am - Check out of Airbnb and head back to Vancouver",
            "1:30pm - Arrive in Vancouver and Check into Hotel",
            "???pm - Go to Hockey Match",
            "???pm - Head to Dinner"
        ]
    },
    {
        day: "Saturday, November 30",
        title: "Drive to Seattle",
        activities: [
            "10:30am - Wake up",
            "12:00pm - Drive back to Seattle",
            "3:30pm - Arrive in Seattle and check into W Bellevue - 1K & 2Q - $480.52",
            "6:00pm - Go to dinner",
            "10:00pm - Drop off Brittany and Zac at the airport",
            "11:41pm - Brittany & Zac Depart SEA toward BNA (AS382)"
        ]
    },
    {
        day: "Sunday, December 1",
        title: "Fly Home",
        activities: [
            "7:00am - Mom & Dad Uber to airport",
            "8:35am - Mom & Dad Depart SEA toward PNS (DL562)",
            "10:30 - Tara & Braswell Drop off rental car downtown",
            "11:00am - Drop off luggage for the day? - $35(6 bags)",
            "Exlpore Seattle",
            "5:00 - Tara & Braswell head to SEA airport",
            "7:11pm - Tara & Braswell Depart SEA toward DEN (UA297)",
            "10:55pm - Tara & Braswell Land in DEN",
            "4:23pm - Mom & Dad Land in PNS"
        ]
    }
];

// Function to load Google Maps script
function loadGoogleMaps() {
    const apiKey = 'AIzaSyDInsR8k5VT078Gmvvky1etBpHAyrp9IZE'; // Replace with your actual API key
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDInsR8k5VT078Gmvvky1etBpHAyrp9IZE&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// Initialize the map only when the tab is clicked
document.getElementById('map-tab').addEventListener('click', function() {
    if (!document.getElementById('map').children.length) {
        loadGoogleMaps(); // Load the Google Maps API
    }
});

// Function to initialize the map
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: 36.1699, lng: -115.1398 } // Las Vegas
    });

    var locations = [
        { lat: 34.0522, lng: -118.2437, title: 'Los Angeles' },
        { lat: 36.1699, lng: -115.1398, title: 'Las Vegas' },
        { lat: 36.1069, lng: -112.1129, title: 'Grand Canyon' },
        { lat: 37.0965, lng: -113.5684, title: 'St. George' },
        { lat: 47.6062, lng: -122.3321, title: 'Seattle' },
        { lat: 49.2827, lng: -123.1207, title: 'Vancouver' }
    ];

    // Add markers for each location
    locations.forEach(function(location) {
        new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title
        });
    });

    // Add routes between locations
    var flightPath = new google.maps.Polyline({
        path: locations.map(loc => ({ lat: loc.lat, lng: loc.lng })),
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
}

// Function to load itinerary
function loadItinerary() {
    const accordion = document.getElementById("accordion");
    itinerary.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const header = document.createElement("div");
        header.classList.add("card-header");
        header.id = `heading${index}`;

        const button = document.createElement("button");
        button.classList.add("btn", "btn-link");
        button.setAttribute("data-toggle", "collapse");
        button.setAttribute("data-target", `#collapse${index}`);
        button.innerText = item.day;

        header.appendChild(button);
        card.appendChild(header);

        const collapseDiv = document.createElement("div");
        collapseDiv.id = `collapse${index}`;
        collapseDiv.classList.add("collapse");
        collapseDiv.setAttribute("data-parent", "#accordion");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const ul = document.createElement("ul");

        item.activities.forEach(activity => {
            const li = document.createElement("li");
            li.innerText = activity; 
            ul.appendChild(li);
        });

        cardBody.appendChild(ul);
        collapseDiv.appendChild(cardBody);
        card.appendChild(collapseDiv);

        accordion.appendChild(card);
    });
}

// Function to fetch flight information
async function fetchFlightInfo(flightId) {
    const apiKey = 'INSERT_API_KEY_HERE'; // Replace with your FlightAware API key
    const response = await fetch(`https://aeroapi.flightaware.com/aeroapi/flights/${flightId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

// Load flight information
async function loadFlightInformation() {
    const flightInfoContent = document.getElementById("flight-info-content");
    flightInfoContent.innerHTML = "Loading..."; 

    const flights = {
        "Brittany & Zac": ["AA1365", "AS382"],
        "Mom & Dad": ["DL3198", "DL562"],
        "Tara & Braswell": ["DL2922", "UA297"]
    };

    try {
        flightInfoContent.innerHTML = ""; 
        for (const [couple, flightsList] of Object.entries(flights)) {
            const coupleDiv = document.createElement("div");
            coupleDiv.innerHTML = `<h5>${couple}</h5>`;
            const ul = document.createElement("ul");

            for (const flightId of flightsList) {
                const flightInfo = await fetchFlightInfo(flightId);
                const li = document.createElement("li");
                li.innerText = `${flightInfo.callsign} - Status: ${flightInfo.status}`;
                ul.appendChild(li);
            }
            coupleDiv.appendChild(ul);
            flightInfoContent.appendChild(coupleDiv);
        }
    } catch (error) {
        flightInfoContent.innerHTML = "Error loading flight information.";
        console.error(error);
    }
}

// Event listener to load the itinerary on page load
document.addEventListener('DOMContentLoaded', () => {
    loadItinerary();

    // Load flight information when the flight info tab is clicked
    document.getElementById('flight-info-tab').addEventListener('click', loadFlightInformation);
});
