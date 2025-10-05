document.addEventListener('DOMContentLoaded', () => {
	const startButton = document.getElementById('startButton');

	startButton.addEventListener('click', () => {
		console.log('ゲーム開始！');
		// ここで次の画面（例: login.html）に移動します
		window.location.href = 'index.html';
	});
});