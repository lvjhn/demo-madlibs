<script>
	import { Card, Button, Input } from '@svelteuidev/core';
    import { createEventDispatcher, onMount } from 'svelte';
    import { onClient } from '@/helpers/on-client'
    import MadLibs from '@/helpers/mad-libs'

    export let openedTemplate;
    export let result;

    const dispatch = createEventDispatcher();

    onMount(async () => {
   
    });

</script> 

<Card class="form action-item">
    <div class="title">
        <h3>{openedTemplate.title}</h3>
    </div>
    <div class="form">
        {result}
    </div>
    <div class="options">
        <Button on:click={() => dispatch("goto", "index")} fullSize>
            Back to Index
        </Button>
    </div>
</Card>

<style lang="scss"> 
    .options {
        margin-top: 20px;
        display: flex;
        gap: 5px;

        .back-button {
            text-align: left; 
            flex-grow: 1;
        }

        .submit-button {
            text-align: right; 
            flex-grow: 1;
        }
    }
</style>