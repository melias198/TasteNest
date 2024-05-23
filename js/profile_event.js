async function profileEventLoad () {
    try {
        const response = await fetchWithToken(`${API_URL}/profile/event/`);
        if (response.ok) {
            const data = await response.json();
            displayEventList(data);
        } else {
            console.error('Failed to fetch events list', response.status);
        }
    } catch (error) {
        console.error('Error fetching event list:', error);
    }
};

const displayEventList = (events) => {
    events.forEach(element => {
        const parent = document.getElementById("profile-event-tbody");

        const eventDate = new Date(element.created);
        const formattedDate = eventDate.toLocaleDateString(); 

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${element.id}</td>
        <td><a href="event-details.html?eventId=${element.id}">${element.name}</a></td>
        <td>${formattedDate}</td>
        <td><a href="event-update.html?eventId=${element.id}" class="btn">Update</a> <hr> <a onclick="handleDeleteEvent(${element.id})" href="" class="btn btn-danger">Delete</a></td>
        `;

        parent.appendChild(tr);
    });
};


const handleDeleteEvent = async (id) => {
    const url = `${API_URL}/profile/event/${id}/`;
    const options = {
        method: 'DELETE',
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Event deleted successfully');
        } else {
            console.log('Event to delete recipe');
        }
    } catch (error) {
        console.error('Event deleting recipe:', error);
    }
};




profileEventLoad();