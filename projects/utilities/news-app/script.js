const container = document.getElementById('articles');

// Mock Data because real NewsAPI requires backend/paid key usually blocks localhost
const mockNews = [
    {
        title: "AI Models Reach New Heights in Coding capability",
        desc: "The latest benchmark shows LLMs outperforming averages in complex algorithms.",
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500",
        url: "#"
    },
    {
        title: "SpaceX Starship Prepares for Next Orbit",
        desc: "Engineers are finalizing the booster for the upcoming test flight.",
        img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500",
        url: "#"
    },
    {
        title: "Global Markets See Shift in Tech Stocks",
        desc: "Investors remain cautious as semiconductor demands fluctuate.",
        img: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=500",
        url: "#"
    },
    {
        title: "New CSS Features Landing Chrome 120",
        desc: "Web developers rejoice as nesting and scope become standard.",
        img: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500",
        url: "#"
    },
    {
        title: "Electric Vehicle Battery Tech Breakthrough",
        desc: "Solid state batteries promise 2x range for future cars.",
        img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500",
        url: "#"
    }
];

// Simulate Fetch
setTimeout(() => {
    container.innerHTML = '';
    mockNews.forEach(news => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.innerHTML = `
            <div class="img-box"><img src="${news.img}" alt="News"></div>
            <div class="content">
                <h3>${news.title}</h3>
                <p>${news.desc}</p>
                <a href="${news.url}" class="read-more">Read Full Story &rarr;</a>
            </div>
        `;
        container.appendChild(card);
    });
}, 1000);
