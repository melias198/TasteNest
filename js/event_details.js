const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("eventId");
    fetch(`https://tastenest.onrender.com/community/event/${param}/`)
      .then((res) => res.json())
      .then((data) => displayDetails(data));
};

const displayDetails = (event) => {
    console.log(event);
    const parent = document.getElementById("event-page");

    const eventDate = new Date(event.event_date);
    const formattedDate = eventDate.toLocaleDateString(); 
    const formattedTime = eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 

    const section = document.createElement("section");
    section.classList.add("recipe-hero");

    const img = document.createElement("img");
    img.classList.add("img", "recipe-hero-img");
    img.src = `${event.image}`;

    const article = document.createElement("article");
    article.classList.add("recipe-info");

    article.innerHTML = `
    <h2>${event.name}</h2>
    <p class="text-muted">Organizer: ${event.organizer}</p>
    <p>
      ${event.description}
    </p>
    <div class="recipe-icons">
              <article>
                <i class="fas fa-calendar-alt"></i>
                <h5>date</h5>
                <p>${formattedDate}</p>
              </article>
              <article>
                <i class="far fa-clock"></i>
                <h5>time</h5>
                <p>${formattedTime}</p>
              </article>
              <article>
                <i class="fas fa-map-marker-alt"></i> 
                <h5>place</h5>
                <p>${event.location}</p>
              </article>
    </div>
    <p class="recipe-tags">
      Tags : ${event.category.map(item => `<a href="#">${item}</a>` )}
    </p>
    `;

    section.appendChild(img);
    section.appendChild(article);

    parent.appendChild(section);
};



getparams();