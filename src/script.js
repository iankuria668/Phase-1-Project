document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    let quoteText = document.getElementById("quoteText");
    let authorName = document.getElementById("authorName");
    const newQuoteButton = document.getElementById("new-quote-button");
    const likeQuoteButton = document.getElementById("like-quote-button");
    const listedQuotes = document.getElementById("list");
    const resetButton = document.getElementById("reset-button");

    //Configuring the Base Url
    const baseUrl = 'https://type.fit/api/quotes';

    // Fetching the quotes and storing them in an array
    function getQuotes() {
        fetch(baseUrl)
            .then(response => {
                // Parse the JSON data
                return response.json();
            })
            .then(data => {
                // Store the JSON data in an array
                const quotesArray = data;
                //Creating a random number
                const index = Math.floor(Math.random() * quotesArray.length);
                // Select a random quote from the array
                const selectedQuote = quotesArray[index];
                console.log(selectedQuote);
                // Display the quote and author
                const newQuote = selectedQuote.text;
                const newAuthor = selectedQuote.author;
                console.log(newQuote);
                console.log(newAuthor);

                quoteText.innerText = newQuote;
                authorName.innerText = `~ ${newAuthor} ~`;
            })
            
    }

    // Adding a function to add the liked quotes to the list
    function  addToLikedList(){
        const newLi = document.createElement("li");
        newLi.innerText =`${quoteText.innerText} (${authorName.innerText})`;
        listedQuotes.appendChild(newLi);
    }

    // Adding a function to reset the list
    function resetList(){
        listedQuotes.innerHTML = "";
    }

    // Event listener for the reset button
    resetButton.addEventListener("click", resetList);
    // Event listener for the like quote button
    likeQuoteButton.addEventListener("click", addToLikedList);
    // Event listener for the new quote button
    newQuoteButton.addEventListener("click", getQuotes);
});
