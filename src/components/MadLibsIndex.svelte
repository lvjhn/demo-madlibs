<script>
	import { Card } from '@svelteuidev/core';
    import { createEventDispatcher, onMount } from 'svelte';
    import { onClient } from '@/helpers/on-client'

    let templates = null; 

    const dispatch = createEventDispatcher();

    onMount(async () => {
        _app.staticData.http.get("/data/templates-list.json") 
            .then(response => {
                templates = response.data;
            });
    });

    function openTemplate(template) {
        dispatch('open-template', template);
    }

</script> 

<Card class="index action-item">
    <div class="instructions">    
        <h4>Select a template below to continue...</h4>
    </div> 
    <div class="template-listing"> 
        {#if templates}
            {#each templates as template, index (index) } 
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div 
                    class="template-item"
                    on:click={() => openTemplate(template)}
                > 
                    {template.title}
                </div>
            {/each}
        {/if}
    </div>
</Card>

<style lang="scss"> 
    h4 {
        margin: 0px;
        padding: 0px;    
        color: rgb(50, 50, 50);
    }

    .template-listing {
        margin-top: 10px;
        display: flex; 
        gap: 10px;
        flex-direction: column;
        height: 300px;
        overflow-y: scroll;
        padding-right: 10px;
        padding-left: 5px;
        padding-top: 5px;
        
        .template-item {
            box-shadow: 0px 0px 2px grey;
            padding: 10px;
            border-radius: 2px;
        }

        .template-item:hover {
            background-color: rgb(234, 234, 234);
            cursor: pointer;
        }

        .template-item:active {
            background-color: rgb(230, 230, 230);
        }
    }

</style>