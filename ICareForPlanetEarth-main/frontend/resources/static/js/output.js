document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementsByClassName('button');
    const squareContainer = document.getElementById('squareContainer');

    button.addEventListener('click', function() {
        // Hide the button
        button.style.display = 'none';

        // Show the black square with text
        squareContainer.style.display = 'block';
        squareContainer.innerHTML = 'Black Square';
    });
});