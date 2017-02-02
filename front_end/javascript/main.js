function sendInput() {

    // get value from text input
    var input = $('#nameInput').val();

    // makes call to server
    $.get('/script/' + input, function(result) {
	$('#nameOutput').html(result);
    });
}
