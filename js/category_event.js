const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("categoryId");
    fetch(`https://tastenest.onrender.com/community/event/?category=${param}`)
      .then((res) => res.json())
      .then((data) => displayCategoryPage(data));
};

const displayCategoryPage = (categories) => {

    if (!categories || categories.length === 0) {
        window.location.href = "404.html";
    }

    categories.forEach((event) => {
        const parent = document.getElementById("event-category-page");

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

getparams();