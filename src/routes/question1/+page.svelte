<script>
    import { fade } from "svelte/transition";

    import { goto, beforeNavigate } from "$app/navigation";

    export let data;
    let photos = data.photosMap;

    let lang = 0;
    let sad = false;
    let moresad = false;
    let happy = false;
    function activeHappy() {
        sad = false;
        happy = true;
        moresad = false;
        document.body.classList.remove("backgroundSad1");
        document.body.classList.add("backgroundHappy1");
    }
    function activeSad() {
        if (sad) {
            moresad = true;
        }
        sad = true;
        happy = false;
        document.body.classList.remove("backgroundHappy1");
        document.body.classList.add("backgroundSad1");
    }

    beforeNavigate(() => {
        document.body.classList.remove("backgroundSad1");
        document.body.classList.remove("backgroundHappy1");
    });
</script>

<h1>Question 1</h1>
<h2>What is the best programming language (according to Hannes)?</h2>
<div class="labelContainer">
    <label>
        <input type="radio" on:click={activeSad} bind:group={lang} value="1" />
        Haskell
    </label>
    <label>
        <input type="radio" on:click={activeSad} bind:group={lang} value="2" />
        Elixir
    </label>
    <label>
        <input type="radio" on:click={activeSad} bind:group={lang} value="3" />
        Typescript
    </label>
    <label>
        <input
            type="radio"
            on:click={activeHappy}
            bind:group={lang}
            value="4"
        />
        Rust
    </label>
</div>

{#if happy}
    <div class="buttonContainer" transition:fade={{ duration: 1000 }}>
        <button on:click={() => goto("/question2")}>To the next quest</button>
    </div>
{/if}

<img class:sad class:moresad alt="Hannes is angry" src={photos?.get("angry.png")}/>

<img class:happy alt="Hannes is smiling" src={photos?.get("good.png")} />

<style>
    img {
        position: absolute;
        right: 0;
        bottom: -60px;
        transform: translate(-100%, 0) rotate(-90deg);
        transform-origin: 100% 100%;
        transition: transform 1s;
        width: 400px; /* Adjust the width as needed */
        height: auto; /* Maintain aspect ratio */
    }
    .sad {
        transform: translate(0%, 0%) rotate(0deg);
    }
    .moresad {
        width: 600px;
        transition: 1s;
    }
    .happy {
        transform: translate(0%, 0%) rotate(0deg);
    }
    :global(.backgroundSad1) {
        background-color: rgb(255, 97, 97);
        transition-duration: 1s;
    }
    :global(.backgroundHappy1) {
        background-color: rgb(255, 170, 212);
        transition-duration: 1s;
    }
    :global(body) {
        background-color: white;
    }
    h1 {
        font-family: "Rubik";
        font-size: 70px;
        text-align: center;
    }
    h2 {
        font-family: "Gaegu";
        font-size: 40px;
        margin-left: 20px;
    }
    label {
        font-family: "Gaegu";
        font-size: 35px;
        margin-left: 10px;
    }
    .labelContainer {
        display: flex;
        flex-direction: column;
    }

    button {
        font-family: "Sail";
        font-size: 40px;
        text-align: center;
        color: rgb(255, 235, 155);
        border-radius: 100px;
        margin: 60px;
        padding: 20px;
        border: 0;
        background-color: rgb(254, 131, 49);
        box-shadow: 0 8px rgb(80, 42, 16);
    }
    .buttonContainer {
        display: flex; 
        justify-content: center;
    }
    button:hover{
        transition: 0.3s;
        background-color: rgb(255, 102, 0);
        box-shadow: 0 8px rgb(80, 42, 16);
    }
    button:active{
        background-color: rgb(255, 102, 0);
        transform: translateY(6px);
        box-shadow: 0 8px rgb(80, 42, 16);
    }
    :global(body) {
        overflow: hidden;
    }
    @font-face {
        font-family: "Sail";
        src: url("./src/Sail/Sail-Regular.ttf") format("truetype");
    }
    @font-face {
        font-family: "Rubik";
        src: url("./src/Rubik_Doodle_Shadow 2/RubikDoodleShadow-Regular.ttf")
            format("truetype");
    }

    @font-face {
        font-family: "Gaegu";
        src: url("./src/Gaegu/Gaegu-Regular.ttf") format("truetype");
    }
</style>
