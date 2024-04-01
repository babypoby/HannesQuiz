<script lang="ts">
  import { fade } from "svelte/transition";
  import { goto, beforeNavigate } from "$app/navigation";

  export let data;
  let photos = data.photosMap as Map<string, string>;
  let lang = 0;
  let sad = false;
  let moresad = false;
  let happy = false;
  function activeHappy() {
    sad = false;
    happy = true;
    moresad = false;
    document.body.classList.remove("backgroundSad4");
    document.body.classList.remove("backgroundMoreSad4");
    document.body.classList.add("backgroundHappy4");
  }
  function activeSad() {
    if (sad) {
      moresad = true;
      document.body.classList.add("backgroundMoreSad4");
      document.body.classList.remove("backgroundHappy4");
      document.body.classList.remove("backgroundSad4");
    } else {
      sad = true;
      happy = false;
      moresad = false;
      document.body.classList.remove("backgroundHappy4");
      document.body.classList.add("backgroundSad4");
      document.body.classList.remove("backgroundMoreSad4");
    }
  }

  beforeNavigate(() => {
    document.body.classList.remove("backgroundSad4");
    document.body.classList.remove("backgroundHappy4");
    document.body.classList.remove("backgroundMoreSad4");
  });
</script>

<h1>Question 4</h1>
<h2>What is Hannes' favorite flower?</h2>
<div class="labelContainer">
  <label>
    <input type="radio" on:click={activeSad} bind:group={lang} value="1" />
    Forsythia (Forsythie)
  </label>
  <label>
    <input type="radio" on:click={activeSad} bind:group={lang} value="2" />
    Snowdrop (Schneegloeckchen)
  </label>
  <label>
    <input type="radio" on:click={activeSad} bind:group={lang} value="3" />
    Corn poppy (Klatschmohn)
  </label>
  <label>
    <input type="radio" on:click={activeHappy} bind:group={lang} value="4" />
    Daffodil (Narzisse)
  </label>
</div>

{#if happy}
  <div class="buttonContainer" transition:fade={{ duration: 1000 }}>
    <button on:click={() => goto("/question5")}>To the next quest</button>
  </div>
{/if}

<img
  class:sad
  class:moresad
  alt="Hannes is angry"
  src={photos?.get("krise.png")}
/>

<img class:happy alt="Hannes is smiling" src={photos?.get("hihi.png")} />

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
    transform: translate(-50%, -20%) rotate(0deg);
  }
  .moresad {
    width: 500px;
    transition: 1s;
  }
  .happy {
    width: 500px;
    transform: translate(0%, -10%) rotate(0deg);
  }
  :global(.backgroundSad4) {
    background-color: rgb(192, 78, 78);
    transition-duration: 1s;
  }
  :global(.backgroundHappy4) {
    background-color: rgb(254, 200, 91);
    transition-duration: 1s;
  }
  :global(.backgroundMoreSad4) {
    background-color: rgb(120, 50, 50);
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
    color: rgb(255, 221, 250);
    background-color: rgb(255, 121, 215);
    border-radius: 100px;
    margin: 60px;
    padding: 20px;
    border: 0;
    box-shadow: 0 8px rgb(79, 38, 66);
  }
  .buttonContainer {
    display: flex;
    justify-content: center;
  }
  :global(body) {
    overflow: hidden;
  }
  button:hover {
    background-color: rgb(255, 78, 202);
    transition: 0.5s;
    box-shadow: 0 8px rgb(79, 38, 66);
  }
  button:active {
    background-color: rgb(255, 78, 202);
    transform: translateY(6px);
    box-shadow: 0 8px rgb(79, 38, 66);
    transition: 0.5s;
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
