const loadEvent = () => {
    fetch("https://tastenest.onrender.com/community/event/")
      .then((res) => res.json())
      .then((data) => { 
        console.log(data);
        displayEvent(data) })
      .catch((err) => console.log(err));
};

function shuffleEvent(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const displayEvent = (events) => {

  shuffleEvent(events);
  const limitedEvent = events.slice(0, 6);

    limitedEvent.forEach((event) => {
        const parent = document.getElementById("event-list");

        const eventDate = new Date(event.event_date);
        const formattedDate = eventDate.toLocaleDateString(); 
        const formattedTime = eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 

        const a = document.createElement("a");
        a.classList.add("recipe")

        a.href = `event-details.html?eventId=${event.id}`;

        a.innerHTML = `
        <img
        src="${event.image}"
        class="img recipe-img"
        alt=""
        />
        <h5>${event.name}</h5>
        <p>Date : ${formattedDate} | Time : ${formattedTime}</p>
        <p>Organizer : ${event.organizer}</p>
        `;

        parent.appendChild(a);
    });
  };

 

loadEvent();
