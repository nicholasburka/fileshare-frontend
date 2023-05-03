<template>
	<div class="file" :key="file" :id="file">
          <!--<p v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</p>-->
          <!--<a v-on:click="if (!clicked[file]){$store.dispatch('downloadFile', file); clicked[file] = true; }" v-bind:id="file" v-bind:class="{clicked: clicked[file]}">{{file}}</a>-->
          <!--<button class="icofont-play" v-on:click="loadAudioSource(file)"></button>-->
          <div class="icon-holder" :id="file + 'icon-holder'" :ref="file + 'icon-holder'">
            <i class="icofont-play play-icon song-left" :id="file + 'play'" :ref="file + 'play'" v-on:click="loadAudioSource(file)"></i>
            <i class="" :id="file + 'loading'" :ref="file + 'loading'" />
          </div>
          <a
            class="file"
            :href="baseURL + file"
            v-text="file"
            @click.prevent="downloadItem({url: file, label: file})" />
    </div>
</template>

<script>
	export default {
		props: ["file"],
		data: function() {
return {
			'playable': true,
			'loading': false,
			'playing': false
		};
}
	}
</script>

<style>
</style>