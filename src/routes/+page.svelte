<script lang="ts">
	import { onMount } from 'svelte';

	interface audio {
		audio: AudioBuffer | undefined;
		name: string;
	}

	let current: audio = {
		audio: undefined,
		name: ''
	};

	let is_recording = false;
	let mediaRecorder: MediaRecorder | null = null;
	let stream: MediaStream | null = null;
	let media: Blob[] = [];

	let audio_url: string | null = null;
	let audio_blob: Blob | null = null;

	$: {
		if (audio_blob) {
			audio_url = URL.createObjectURL(audio_blob);
			let audioElement = new Audio(audio_url);
			audioElement.play();
			console.log('new audio url', audio_url);
		}
	}

	async function startRecording() {
		if (!is_recording) {
			stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.ondataavailable = (e: BlobEvent) => {
				media = [...media, e.data];
			};
			mediaRecorder.start();
			is_recording = true;
		}
	}

	function stopRecording() {
		if (is_recording && mediaRecorder !== null) {
			mediaRecorder.stop();
			is_recording = false;
			audio_blob = new Blob(media, { type: 'audio/mpeg; codecs=opus' });
			media = [];
			if (stream) {
				let tracks = stream.getTracks();
				tracks.forEach((track) => {
					track.stop();
				});
			}
		}
	}
</script>

<svelte:head>
	<title>Audio Record</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="d-flex align-items-center flex-column w-100 h-100">
	<h1 class="pt-5">Create Audio</h1>
	<div id="addition_wrapper" class=" container px-5 mt-2">
		<label for="audio_input">file name</label>
		<div class="row input-group ">
			<div class="col  col-10">
				<input
					bind:value={current.name}
					type="text"
					class="form-control"
					id="audio_input"
					aria-describedby="input_addon"
				/>
			</div>
			<div class="col col-2 mx-0 px-0 input-group-append">
				<button
					on:click={is_recording ? stopRecording : startRecording}
					class="btn btn-outline-dark {is_recording ? 'bg-danger' : ''}"
				>
					<i class="bi bi-mic {is_recording ? 'text-white' : 'text-dark'} " />
				</button>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col">
				<button class="btn btn-outline-dark">save</button>
			</div>
		</div>
	</div>
	{#if audio_url !== null}
		<audio controls>
			<source src={audio_url} type="audio/mpeg; codecs=opus" />
		</audio>
	{/if}
</div>
