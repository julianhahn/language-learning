<script lang="ts">
	import type { DatabaseCreateResponse } from 'nano';
	import { onMount } from 'svelte';
	export let data: DatabaseCreateResponse;
	let files: File[] = [];

	onMount(() => {
		document.addEventListener('paste', async (event) => {
			let pictures = <FileList>event.clipboardData?.files;
			saveFileLst(pictures);
		});
	});

	async function saveFileLst(pictureList: FileList) {
		for (let pic of pictureList) {
			//files = [pic, ...files];
			let body;
			const toBase64 = (file: File) =>
				new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => resolve(reader.result as string);
				});
			await toBase64(pic).then((str) => {
				body = str;
				console.log(str);
			});
			/* 		const formD = new FormData();
			formD.append('image', pic, 'image.png');
 */
			const response = await fetch('/api/copy_paste', {
				method: 'POST',
				//body: formD,
				body: JSON.stringify(body),
				headers: {
					'content-type': 'image/png'
					/* Accept: 'application/json' */
				}
			});

			let lg = await response.json();
			console.log(typeof lg);

			const blob = new Blob([lg.data], { type: 'image/png' });
			console.log(blob);
			const file = new File([blob], 'image.png', { type: 'image/png' });
			console.log(file);
			files = [file, ...files];
		}
	}

	function handleFile(file: File) {
		console.log(file);

		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => {
			const buffer = reader.result as ArrayBuffer;
			const blob = new Blob([buffer], { type: 'image/png' });
			navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
		};
	}

	function onInputHandler(event: HTMLInputElement) {
		if (event.files !== null) {
			saveFileLst(event.files);
			console.log('test');
		}
	}
</script>

<svelte:head>
	<title>Copy & Paste</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	<div>
		<input
			type="file"
			multiple
			accept="image/png"
			class="drag-drop-input"
			placeholder="Drag and drop a file here"
			on:input={(e) => onInputHandler(e.currentTarget)}
		/>
	</div>

	<div>
		{#each files as file}
			<div class="card">
				<div class="card-body">
					<img
						src={URL.createObjectURL(file)}
						alt={file.name}
						on:click={() => {
							handleFile(file);
						}}
						on:keypress={() => {
							handleFile(file);
						}}
					/>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.drag-drop-input::-webkit-file-upload-button {
		visibility: hidden;
	}
	.drag-drop-input::-webkit-textfield-decoration-container {
		visibility: hidden;
	}
	.drag-drop-input::before {
		content: attr(placeholder);
		align-items: center;
		background-color: beige;
		display: inline-block;
		text-align: center;
		font-size: 25px;
		-webkit-user-select: none;
		user-select: none;
	}
	.drag-drop-input {
		padding: 20px;
		background-color: beige;
		border: 2px dashed #ccc;
		border-radius: 5px;
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.card {
		text-align: center;
		border: 1px solid grey;
		border-radius: 10px;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
		margin: 10px;
	}
	.card-body {
		padding: 10px;
	}
	img {
		max-width: 100%;
		max-height: 800px;
	}
</style>
