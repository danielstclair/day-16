$(document).ready(function() {
	var getMessages = function() {
		$.get(
			'http://tiny-pizza-server.herokuapp.com/collections/dstest',
			function(messages) {
				render(messages);
			},
			'json'
		);
	};

	var render = function(messages) {
		var messageRow = _.template('<div class="row"><div><%= message %></div><div class="user-name"><%= name %></div></div>')
		$('#message-board').html('');
		for(var i=0; i<messages.length; i++) {
			if(messages[i].message && messages[i].name) {
				$('#message-board').append(messageRow(messages[i]));
			}
		}
	};

	// var makeRow = function(message) {
	// 	return '<div><div>'+message.message+'</div><div>'+message.name+'</div></div>'
	// }

	getMessages();

	setInterval(getMessages, 1000);
	
	function postMessage(){
		$.post(
			'http://tiny-pizza-server.herokuapp.com/collections/dstest',
			{
				message: $('#text').val(),
				name: 'A-Team'
			},
			function(message) {
				console.log(message);
				// render(message);
			},
			'json'
		);
		var message = $('#text').val();
		var words = message.split();
		var imageRegex = /([^s]+(?=.(jpg|gif|png)).2)/gm;
		for (var i = 0; i < words.length; i++) {
			var firstChars = words[i].substring(i, 7);
			var lastChars = words[i].substring(words[i].length-4);
			var gif = false;
			if (firstChars == 'http://') {
				gifLoader();
			};
			if (lastChars == '.gif') {
				gifLoader();
			};
		};
		function gifLoader(){ 
			console.log('hey');
			// $(message).append('<img src="'words'">');
		}
	}
	$('#send').on('click', postMessage);

});
