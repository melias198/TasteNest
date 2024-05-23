const getparams = async () => {
    const param = new URLSearchParams(window.location.search).get("eventId");
    if(!param)
    {
        window.location.href = "profile-event.html";
    }
    const url = `${API_URL}/profile/event/${param}/`;
    const options = {
        method: 'GET',
    };
    try {
        const response = await fetchWithToken(url,options);
        if (response.ok) {
            const data = await response.json();
            displayEventDetails(data);
        } else {
            console.error('Failed to fetch event details.', response.status);
        }
    } catch (error) {
        console.error('Error fetching event details:', error);
    }
};

const displayEventDetails = (data) => {
    const eventDate = new Date(data.event_date);
    const formattedDate = eventDate.toLocaleDateString();

    document.getElementById("event-title").value = data.name;
    document.getElementById("event-description").value = data.description;
    document.getElementById("event-location").value = data.location;
    document.getElementById("event-date").value = formattedDate;
}


const handleEventUpdate = async () => {
    const title = getValue("event-title");
    const description = getValue("event-description");
    const location = getValue("event-location");
    const date = getValue("event-date");
    const image = document.getElementById("event-image").files[0];

    const formattedDate = new Date(date).toISOString();
    
    const formData = new FormData();
    formData.append('name', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('event_date', formattedDate);
    if (image) {
        formData.append("image", image);
    }

    const id = new URLSearchParams(window.location.search).get("eventId");

    const url = `${API_URL}/profile/event/${id}/`;
    const options = {
        method: 'PATCH',
        body: formData
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Event updated successfully');
            window.location.href = "profile-event.html";
        } else {
            console.log('Failed to updated event');
        }
    } catch (error) {
        console.error('Error updating event:', error);
    }
};



const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};



getparams();