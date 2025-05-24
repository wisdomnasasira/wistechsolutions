document.addEventListener('DOMContentLoaded', () => {
    // Select the search input and button in the navbar (these are common to all pages)
    const siteSearchInput = document.getElementById('siteSearchInput');
    const siteSearchButton = document.getElementById('siteSearchButton');

    // Select the results div on the search.html page
    const siteSearchResultsDiv = document.getElementById('siteSearchResults');

    let searchIndex; // To hold our Lunr index
    let searchData;  // To hold the original data from search_index.json

    // Function to initialize Lunr.js and load the search data
    const loadSearchIndex = () => {
        fetch('search_index.json') // Make sure this path is correct relative to search.html
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                searchData = data; // Store the original data for displaying results

                // Create the Lunr index
                searchIndex = lunr(function () {
                    this.ref('id'); // 'id' field in your JSON will be the unique identifier
                    this.field('title', { boost: 10 }); // Give title a higher search priority
                    this.field('content');
                    this.field('keywords'); // Include keywords in the search fields

                    searchData.forEach(doc => {
                        this.add(doc); // Add each document from your JSON to the index
                    }, this);
                });
                console.log('Lunr search index built successfully!');

                // If on the search.html page, check for a query in the URL
                if (siteSearchResultsDiv) { // Check if it's the search results page
                    const urlParams = new URLSearchParams(window.location.search);
                    const queryFromUrl = urlParams.get('q'); // Get 'q' parameter from URL
                    if (queryFromUrl) {
                        siteSearchInput.value = queryFromUrl; // Populate search input
                        performSiteSearch(queryFromUrl);     // Perform search automatically
                    }
                }
            })
            .catch(error => {
                console.error('Error loading or building search index:', error);
                if (siteSearchResultsDiv) {
                    siteSearchResultsDiv.innerHTML = '<p style="color: red;">Error loading search functionality. Please try again later.</p>';
                }
            });
    };

    // Function to redirect to search.html with the query
    const redirectToSearchPage = () => {
        const query = siteSearchInput.value.trim();
        if (query) {
            // Redirect to search.html with the query as a URL parameter
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        } else {
            // If search input is empty, just go to search.html
            window.location.href = `search.html`;
        }
    };

    // Function to perform the actual search and display results on search.html
    const performSiteSearch = (query) => {
        siteSearchResultsDiv.innerHTML = ''; // Clear previous results
        
        if (!searchIndex || !searchData) {
            siteSearchResultsDiv.innerHTML = '<p>Search is not ready yet. Please wait a moment.</p>';
            return;
        }

        if (!query) {
            siteSearchResultsDiv.innerHTML = '<p>Please enter a search term.</p>';
            return;
        }

        const results = searchIndex.search(query); // Perform search using Lunr.js

        if (results.length > 0) {
            const ul = document.createElement('ul');
            ul.classList.add('search-results-list'); // Add a class for styling
            results.forEach(result => {
                // Find the original document from searchData using the 'ref' (id)
                const doc = searchData.find(d => d.id === result.ref);
                if (doc) {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <h3><a href="${doc.url}">${doc.title}</a></h3>
                        <p>${doc.content.substring(0, 200)}...</p> `;
                    ul.appendChild(li);
                }
            });
            siteSearchResultsDiv.appendChild(ul);
        } else {
            siteSearchResultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    };

    // Attach event listeners for the search input and button across ALL pages
    if (siteSearchButton && siteSearchInput) {
        siteSearchButton.addEventListener('click', redirectToSearchPage);
        siteSearchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                redirectToSearchPage();
            }
        });
    }

    // Load the search index when the page loads
    loadSearchIndex();
});