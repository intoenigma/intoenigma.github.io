const input = document.getElementById('title-in');
const btn = document.getElementById('change-btn');

input.value = document.title;

btn.addEventListener('click', () => {
    document.title = input.value || "New Title";
    alert("Title Updated!");
});
