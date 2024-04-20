function searchWord() {
    var word = document.getElementById('word').value;
    var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/search', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var result = response.result;
                var output = capitalizedWord + ': ' + result;
                document.getElementById('definition').innerText = output;
                document.getElementById('word').value = '';
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify({word: word}));
}
