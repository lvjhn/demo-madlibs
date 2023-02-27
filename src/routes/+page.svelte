<script>
    import { onMount } from "svelte";
    import MadLibsForm from "../components/MadLibsForm.svelte";
    import MadLibsIndex from "../components/MadLibsIndex.svelte";
    import MadLibsResult from "../components/MadLibsResult.svelte";

    let action = 'index';

    let isReady = false; 
    let openedTemplate;
    let templateResult;

    onMount(async () => {
        isReady = true;
    })

    function onOpenTemplate(event) {
        action = 'form';
        openedTemplate = event.detail;
    }

    function onGoto(event) {
        action = event.detail;
    }

    function onPostResult(event) {
        action = 'result'; 
        console.log(event.detail);
        templateResult = event.detail;
    }
    
</script> 

<div class="home">
    {#if isReady}
        <div class="action-container">
            <div class="title">
                <h2>Demo MadLibs</h2>
            </div>
            <div class="content">
                {#if action == 'index'}
                    <div class="mad-libs-index">
                        <MadLibsIndex 
                            on:open-template={onOpenTemplate}
                        />
                    </div>
                {:else if action == 'form'}
                    <div class="mad-libs-form">
                        <MadLibsForm 
                            {openedTemplate}
                            on:goto={onGoto}
                            on:post-result={onPostResult}
                        /> 
                    </div>
                {:else if action == 'result'}
                    <div class="mad-libs-result">
                        <MadLibsResult 
                            on:goto={onGoto}
                            {openedTemplate}
                            bind:result={templateResult}
                        />
                    </div> 
                {:else} 
                    <div class="unknown-action"> 
                        Unknown action
                    </div>
                {/if}
            </div>
        </div>
    {:else} 
        <div class="loading">
            Loading app...
        </div> 
    {/if}
</div>

<style lang="scss"> 
    .home {
        display: flex; 
        flex-direction: column;
        align-items: center; 
        justify-content: center;
        width: 100%;
        height: 100%; 
        position: fixed;
        top: 0px; 
        left: 0px;

        .title {
            text-align: center;
        }
    }


</style>