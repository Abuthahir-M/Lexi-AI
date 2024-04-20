function searchWord() {
    var word = document.getElementById('word').value;
    var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
    $.ajax({
        type: 'POST',
        url: '/search',
        data: {word: word},
        success: function(response) {
            let result = response.result;
            let output = capitalizedWord + ': ' + result;
            document.getElementById('definition').innerText = output;
            document.getElementById('word').value = '';
        }
    
    });
}
