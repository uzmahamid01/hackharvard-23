// ...

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.button'); // Select the element with the 'button' class
    const squareContainer = document.getElementById('squareContainer');
    const textContainer = document.getElementById('textContainer');

    button.addEventListener('click', function() {
        // Hide the button
        button.style.display = 'none';

        // Show the black square
        squareContainer.style.display = 'block';

        // Set your custom text
        textContainer.innerHTML = 'Scientists using space-based radar found that land in New York City is sinking at varying rates from human and natural factors. A few spots are rising.';
    });
});






// Function to handle button click
/* document.getElementByClass('button').addEventListener('click', function() {
    // Make an HTTP GET request to your backend
    axios.get(`${backendUrl}/your-backend-endpoint`)
        .then(response => {
            // Handle the response from the backend
            const responseText = response.data; // Assuming the response is text
            // Update the HTML element with the response text
            document.getElementById('responseText').innerText = responseText;
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
            // Optionally, update the HTML element with an error message
            document.getElementById('responseText').innerText = 'Error occurred while fetching data.';
        });
});
 */
// ...
