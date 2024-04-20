function searchWord() {
    var word = document.getElementById('word').value;
    var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word: word })
    })
    .then(response => response.json())
    .then(data => {
        let result = data.result;
        let output = capitalizedWord + ': ' + result;
        document.getElementById('definition').innerText = output;
        document.getElementById('word').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
