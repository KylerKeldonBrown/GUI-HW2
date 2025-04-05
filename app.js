const fetchBtn = document.getElementById('fetchBtn');
const imageContainer = document.getElementById('imageContainer');
const greetingElement = document.getElementById('greeting');

const quotes = [
    "Gimme 3",
    "That Jumper is pure",
    "Lebron is the Goat",
    "Kobe once said to believe in your dreams",
    "Never Give Up!!",
    "No matter the hour or the day keep working hard",
    " To be a failure is to give up on ones self",
    " Life wasnt made to be  easy",
    "i can do all things through God who strengthens me"
];

fetchBtn.addEventListener('click', () => {
    const query = 'basketball'; 
    const apiKey = '49655013-3889320031fafc6777390345c'; 
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=5`;

    // Show a random greeting
    greetingElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.hits.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.hits.length);
                const imageUrl = data.hits[randomIndex].webformatURL;

                imageContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.width = '300px';
                img.style.borderRadius = '10px';
                img.alt = 'Cool Wallpaper';

                imageContainer.appendChild(img);
            } else {
                throw new Error("No images found.");
            }
        })
        .catch(error => {
            console.error('Error fetching image:', error);
            imageContainer.innerHTML = '<p style="color:red;">Failed to fetch image. Please try again later.</p>';
        });
});
