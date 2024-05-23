const handleEventPost = async (event) => {
    event.preventDefault();
    
    const title = getValue("event-title");
    const description = getValue("event-description");
    const location = getValue("event-location");
    const date = getValue("event-date");
    const image = document.getElementById("event-image").files[0];

    const formattedDate = new Date(date).toISOString();

    const eventData = new FormData();
    eventData.append('name', title);
    eventData.append('description', description);
    eventData.append('location', location);
    eventData.append('event_date', formattedDate);
    eventData.append('image', image);

    const url = "https://tastenest.onrender.com/community/event/create/";
    const options = {
        method: 'POST',
        body: eventData
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Event uploaded successfully');
            window.location.href = "profile-event.html";
        } else {
            console.log('Failed to upload event');
        }
    } catch (error) {
        console.error('Error uploading event:', error);
    }
};



const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};


  