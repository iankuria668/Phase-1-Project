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
                // Storing the JSON data in an array
                const quotesArray = data;
    
                // Iterating over each quote in the array and logging it in the console
                quotesArray.forEach(quote => {
                    console.log(quote.text);
                    console.log(quote.author);
                });
    
                //Creating a random index
                const index = Math.floor(Math.random() * quotesArray.length);
                // Select a random quote from the array using the random index
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
            .catch(error => {
                // Handle errors
                console.error('Error fetching quotes:', error);
            });
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

    // Adding a hover effect to the pink buttons
    // Selecting the button class
    let myButtons = document.querySelectorAll(".pinkButton");
    myButtons.forEach((button) => {
        //Adding the event listener mouseenter
        button.addEventListener("mouseenter", () => {0
            button.style.transform = "scale(1.2)";
        });
        //Adding the event listener mouseleave
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        }); 
    });

    // Adding a blur effect function that disappear when scrolled to the liked quotes
    function blurEffect(){
        let likedQuotesblur = document.getElementById("list");
        let scrollPosition = window.scrollY;
        //Setting the threshold
        let threshold = 200;
        if (scrollPosition > threshold) {
            likedQuotesblur.style.opacity = '1';
            likedQuotesblur.classList.remove("blur");
        } else {
            likedQuotesblur.style.opacity = '0';
            likedQuotesblur.classList.add("blur");
        }
    }
    window.addEventListener('scroll', blurEffect);
});
