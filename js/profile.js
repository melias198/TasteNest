async function loadProfile () {
    try {
        const response = await fetchWithToken(`${API_URL}/profile/`);
        if (response.ok) {
            const data = await response.json();
            displayProfile(data);
        } else {
            console.error('Failed to fetvh profile data', response.status);
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
   
};

const displayProfile = (data) => {
    const parent = document.getElementById("profile-section");

    const div = document.createElement("div");
    div.classList.add("col-md-12","text-center","profile-img")

    div.innerHTML = `
    <img src="${data.image}" alt="">
    <h5>${data.first_name} ${data.last_name}</h5>
    <h6>${data.email}</h6>
    <span>Phone : ${data.mobile} | adress : ${data.address} | Total Recipe : ${data.total_recipe} | Total Event : ${data.total_event}</span>
    `;
    parent.appendChild(div);
};


async function loadProfileUpdate () {
    try {
        const response = await fetchWithToken(`${API_URL}/profile/`);
        if (response.ok) {
            const data = await response.json();
            displayProfileUpdate(data);
        } else {
            console.error('Failed to fetch profile data', response.status);
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
   
};

const displayProfileUpdate = (data) => {
    document.getElementById("update-firstname").value = data.first_name;
    document.getElementById("update-lastname").value = data.last_name;
    document.getElementById("update-mobile").value = data.mobile;
    document.getElementById("update-address").value = data.address;
};


const handleProfileUpdate = async () => {
    const first_name = document.getElementById("update-firstname").value;
    const last_name = document.getElementById("update-lastname").value;
    const mobile = document.getElementById("update-mobile").value;
    const address = document.getElementById("update-address").value;
    const image = document.getElementById("update-profile-image").files[0];
    
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('mobile', mobile);
    formData.append('address', address);
    if (image) {
        formData.append("image", image);
    }

    const Token = localStorage.getItem('access_token');

    fetch("https://tastenest.onrender.com/chef/profile/update/", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${Token}`,
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log("Profile updated successfully.");
            window.location.href = "profile.html"; 
        } else {
            console.log("Failed to update Items.");
        }
    })
    .catch(error => console.error("Error updating Items:", error));

};

loadProfile();
loadProfileUpdate();