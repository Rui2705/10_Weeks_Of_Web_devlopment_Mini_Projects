
const quote = document.getElementById("quotes");
const author = document.getElementById("author");
const button = document.querySelector("button");

const api = "https://dummyjson.com/quotes";

async function getQuotes(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.quotes; 
    } catch (error) {
        quote.innerHTML = "Failed to fetch quotes.";
        author.innerHTML = "";
        console.error("Error fetching quotes:", error);
    }
}

let quotesArray = []; 

async function displayRandomQuote() {
    if (quotesArray.length === 0) {
        quotesArray = await getQuotes(api);
    }
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const randomQuote = quotesArray[randomIndex];

    quote.innerHTML = `"${randomQuote.quote}"`;
    author.innerHTML = `- ${randomQuote.author}`;
}


displayRandomQuote();
 
button.addEventListener("click", displayRandomQuote);


