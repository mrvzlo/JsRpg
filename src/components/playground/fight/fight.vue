<template>
   <canvas class="w-100 h-100"> </canvas>
</template>

<script lang="ts">
import Character from '@/components/shared/models/characters/character';
import { Options, Vue } from 'vue-class-component';

@Options({
   props: { character: {} },
})
export default class Fight extends Vue {}
</script>
