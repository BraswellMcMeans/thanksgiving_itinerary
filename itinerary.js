// itinerary.js

require('dotenv').config();

const itinerary = [
    {
        day: "Friday, November 22",
        title: "Arrive in LA",
        activities: [
            "6:43pm - Mom & Dad land in LAX",
            "Stay at SLS Luxury Collection in LA - $485"
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
            "Mom & Dad stay at SLS in LA - $485"
        ]
    },
    {
        day: "Sunday, November 24",
        title: "Exploring Las Vegas",
        activities: [
            "4:43pm - Mom & Dad land in Las Vegas (DL3198)",
            "5:15pm - Mom & Dad Pick up Rental Car (Premium SUV) - $344.77",
            "5:20pm - Dinner (Mom & Dad to meet there)",
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
            "6:00pm - Check into St. George hotel (Advenire Autograph Collection) - $393.14",
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
            "9:15am - Leave hotel for airport",
            "11:10am - Flight departs Las Vegas to Seattle (DL2922)",
            "2:05pm - Land in Seattle",
            "2:40pm - Pick up rental car",
            "3:00pm - Drive to Vancouver",
            "7:00pm - Arrive in Vancouver, check into JW Marriott Park 1K & 2Q - $647.97"
        ]
    },
    {
        day: "Thursday, November 28",
        title: "Thanksgiving in Vancouver",
        activities: [
            "Spend the day exploring Vancouver",
            "Thanksgiving dinner in Vancouver"
        ]
    },
    {
        day: "Friday, November 29",
        title: "Explore Vancouver",
        activities: [
            "Continue exploring Vancouver",
            "Free day to visit city attractions"
        ]
    },
    {
        day: "Saturday, November 30",
        title: "Drive to Seattle",
        activities: [
            "12:00pm - Drive back to Seattle",
            "Explore Seattle in the evening",
            "Check into W Bellevue - 1K & 2Q - $480.52",
            "11:41pm - Brittany & Zac Depart SEA toward BNA (AS382)"
        ]
    },
    {
        day: "Sunday, December 1",
        title: "Fly Home",
        activities: [
            "8:35am - Mom & Dad Depart SEA toward PNS (DL562)",
            "7:11pm - Tara & Braswell Depart SEA toward DEN (UA297)",
            "7:11pm - Tara & Braswell Land in DEN",
            "4:23pm - Mom & Dad Land in PNS"
        ]
    }
];

// Function to load Google Maps script
function loadGoogleMaps() {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Use the environment variable
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
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
    const apiKey = 'INSERT_API_KEY_HERE'; 
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

            for (const flight of flightsList) {
                const flightData = await fetchFlightInfo(flight);
                const li = document.createElement("li");
                li.innerText = `${flight} on ${flightData.date}: ${flightData.status || 'No status available'}`;
                ul.appendChild(li);
            }

            coupleDiv.appendChild(ul);
            flightInfoContent.appendChild(coupleDiv);
        }
    } catch (error) {
        flightInfoContent.innerHTML = `<p>Error fetching flight information: ${error.message}</p>`;
    }
}

// Tab activation for flight information
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const target = $(e.target).attr("href");
    if (target === "#flight-info") {
        loadFlightInformation();
    }
});

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    loadItinerary();
});
