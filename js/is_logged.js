function isLoggedIn() {
    const token = localStorage.getItem('refresh_token');
    return token !== null && token !== undefined && token !== '';
}


function updateNavigationLinks() {
    const loginLink = document.getElementById('loginLink');
    const profileLink = document.getElementById('profileLink');

    if (isLoggedIn()) {
        loginLink.style.display = 'none';
    } 
    else {
        profileLink.style.display = 'none';
    }
}


updateNavigationLinks();