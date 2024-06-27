let swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
});

let newsContainer = document.querySelector(".newsContainer");

fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F").then(response => {
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    return response.json();
})
    .then(data => {
        let html = "";
        data.items.forEach(element => {
            let fullDate = new Date(element.pubDate);
            let date = fullDate.getDate();
            let month = fullDate.getMonth();
            let year = fullDate.getFullYear();
            let categoriesHtml = "";
            if (element.categories && element.categories.length > 0) {
                for (let i = 0; i < 2 && i < element.categories.length; i++) {
                    categoriesHtml += `<span>${element.categories[i]}</span>`;
                }
            }
            html += `
        <div class="swiper-slide news-slide">
        <div class="categories">
            ${categoriesHtml}
        </div>
        <h2>${element.title}</h2>
        <p class="desc">${element.description}</p>
        <a href="${element.link}">Read more</a>
        <div class="details">
        <span style="font-weight: bold;">${element.author}</span>
        <span style="font-size: 11px; color: #30;">${date + "/" + month + "/" + year}</span>
        </div>
        </div>
        `;
        newsContainer.innerHTML += html;
        // swiper.update();
    })
    })
    .catch(error => console.log(error));