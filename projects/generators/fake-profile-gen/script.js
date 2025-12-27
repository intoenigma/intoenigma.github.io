async function getProfile() {
    try {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        const user = data.results[0];

        document.getElementById('p-img').src = user.picture.large;
        document.getElementById('p-name').innerText = `${user.name.first} ${user.name.last}`;
        document.getElementById('p-loc').innerText = `${user.location.city}, ${user.location.country}`;
        document.getElementById('p-email').innerText = user.email;
        document.getElementById('p-login').innerText = user.login.username;

    } catch (e) {
        console.error(e);
        document.getElementById('p-name').innerText = 'Error Fetching Identity';
    }
}
getProfile();
