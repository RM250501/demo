
// エンドポイント
const ws = new WebSocket("ws://localhost:8080/Extenders/chat");

$(function() {

	const pElement = document.getElementById('result-text');
	pElement.textContent = "　";

	$("#submit-button").click(function() {
		console.log("送信ボタンが押されました");
		let messageInput = document.getElementById("response-box");
		sendMessage("pr" + messageInput.value);
		messageInput.value = "";
		document.getElementById("submit-button").disabled = true;
		const pElement = document.getElementById('result-text');
		pElement.textContent = 'みんなの回答を待っています';
	});
});

// サーバからメッセージを受信したときの処理
ws.onmessage = function(event) {
	switch (event.data.substring(0, 2)) {
		case "tm":
			let prompt_box = document.getElementById("prompt-box");
			prompt_box.value = event.data.substring(2);
			break;
		case "gc":
			const pElement = document.getElementById('result-text');
			pElement.textContent = "GAME CLEAR";
			break;
		default:
	}
}

// サーバにメッセージを送るためのメソッド
function sendMessage(value) {
	setTimeout(function() {
		ws.send(value);
	}, 300);
}
