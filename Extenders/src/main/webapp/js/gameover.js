document.addEventListener('DOMContentLoaded', () => {

	// Local StorageからJSON文字列を取得
	const wordsJson = localStorage.getItem('gameWordsJson');
	console.log("LocalStorageの生データ:", wordsJson);

	// ★ 修正点1: HTML要素を取得する ★
	const answersList = document.getElementById('player-answers');

	if (wordsJson && answersList) { // answersList が存在するかどうかもチェック
		try {
			// JSON文字列をJavaScriptのオブジェクト（Map形式）に変換
			// 修正点2: 変数名を wordsMap に変更するか、ループで words を使う
			// ここでは、ループで words を使うように統一します。
			const words = JSON.parse(wordsJson);

			// JSONデータがMap（オブジェクト）であることを確認
			if (typeof words !== 'object' || words === null) {
				console.error("解析されたデータがオブジェクトではありません。", words);
				return;
			}

			// データのコンソール出力と確認
			console.group("✅ GO画面: Local Storageから結果を取得");
			console.log("JSON文字列:", wordsJson);
			console.log("回答マップ (JS Object):", words); // words はオブジェクトなので「マップ」と表現
			console.groupEnd();

			let htmlContent = '';

			// ★ 修正点3: Object.entries() の引数を words に変更する（wordsがマップ形式のデータ） ★
			for (const [userId, answer] of Object.entries(words)) {

				// ユーザーIDを整形 (例: "User5" → "プレイヤー 5")
				const playerName = userId.replace('User', 'プレイヤー ');

				// HTMLテンプレートに合わせて<li>要素を作成
				htmlContent += `
			                    <li class="answer-item">
			                        <span class="player-name">${playerName}</span>: 
			                        <span class="player-answer-different">${answer}</span>
			                    </li>
			                `;
			}

			// 既存のリスト内容を新しい回答で置き換える
			answersList.innerHTML = htmlContent;


			// データが二重で使われないようストレージから削除
			localStorage.removeItem('gameWordsJson');

		} catch (e) {
			console.error("Local Storageデータの解析に失敗しました:", e);
			answersList.innerHTML = '<li>データの読み込みに失敗しました。</li>';
		}
	} else {
		console.warn("Local Storageにゲーム結果データが見つからないか、リスト要素が見つかりませんでした。");
		if (answersList) {
			answersList.innerHTML = '<li>回答データがありません。</li>';
		}
	}

});