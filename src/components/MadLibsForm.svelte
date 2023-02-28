<script>
	import { Card, Button, Input } from '@svelteuidev/core';
    import { createEventDispatcher, onMount } from 'svelte';
    import { onClient } from '@/helpers/on-client'
    import MadLibs from '@/helpers/mad-libs'

    export let openedTemplate;

    let template = null;
    let madlibs = null;

    let fillData = {};
    let isSubmitDisabled = true;

    $: fillData && (() => { 
        isSubmitDisabled = false;
        for(let data in fillData) 
            if(fillData[data] == null || fillData[data] == "") 
                isSubmitDisabled = true;        
    })()

    const dispatch = createEventDispatcher();

    onMount(async () => {
        _app.staticData.http
            .get(openedTemplate.url) 
            .then(response => {
                template = response.data;
                initMadLibs(template);
            });
    });

    function initMadLibs(template) {
        madlibs = new MadLibs(template);
        for(let variable in madlibs.variables) {
            fillData[variable] = null;
        }
    } 

    function openTemplate(id) {
        dispatch('open-template', { id });
    }

    function submitResult() {
        dispatch('post-result', madlibs.fillTemplate(fillData));
    }

</script> 

<Card class="form action-item">
    <div class="title">
        <h3>{openedTemplate.title}</h3>
    </div>
    <div class="form">
        {#if template}
            {#each Object.keys(madlibs.variables) as variable} 
                <div class="input-item">
                    <div class="input">
                        <Input type="text" bind:value={fillData[variable]}/>
                    </div>
                    <div class="pos">
                        <div class="pos-text">
                            {madlibs.partsOfSpeech()[madlibs.variables[variable]]}
                        </div>
                    </div>
                </div>
            {/each}
        {:else}
            Loading template...
        {/if}
    </div> 
    <div class="options">
        <div class="back-button">
            <Button on:click={() => dispatch("goto", "index")} fullSize>
                Back
            </Button>
        </div> 
        <div class="submit-button"> 
            <Button 
                bind:disabled={isSubmitDisabled}
                on:click={submitResult} 
                color="green" 
                fullSize
            >
                Submit
            </Button>
        </div>
    </div>
</Card>

<style lang="scss"> 
    .title {
        h3 {
            font-weight: bold;
            margin: 0px;
            padding: 0px
        }
    }

    .form {
        margin-top: 20px;
    }

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

    .form {
        display: flex;
        gap: 10px;
        flex-direction: column;

        .input-item {
            display: flex;

            .input {
                flex-grow: 1;
            }

            .pos {
                width: 250px;
                text-align: center;
                margin-top: 10px;
                font-style: italic;
            }
        }
    }
</style>