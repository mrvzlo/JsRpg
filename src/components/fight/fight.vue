<template>
   <canvas class="w-100 h-100"> </canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Character from '../models/characters/character';

@Options({
   props: { character: Character },
})
export default class Fight extends Vue {}
</script>
