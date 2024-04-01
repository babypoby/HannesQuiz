<script lang="ts">
  import { browser } from "$app/environment";
  import { goto, beforeNavigate } from "$app/navigation";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  export let data;
  let photos = data.photosMap as Map<string, string>;
  let options = [
    "Ferrari",
    "Porsche",
    "Segelyacht",
    "Flugzeug",
    "Helikopter",
    "Fuehrerschein",
    "Hilti Bohrmaschine",
    "Grundstueck auf dem Mond",
    "Marsbesuch",
  ];
  let choice : string[] = [];

  // run the check function whenever correct changes
  $: check(choice);

  let sad = false;
  let happy = false;
  let happydouble = false;
  function check(choice: string[]) {
    if (!browser) return;
    if (!document?.body) return;
    if (
      choice.length == 5 &&
      choice.includes("Ferrari") &&
      choice.includes("Porsche") &&
      choice.includes("Segelyacht") &&
      choice.includes("Fuehrerschein") &&
      choice.includes("Hilti Bohrmaschine")
    ) {
      activeHappy();
    } else if (choice.length == 0) {
      sad = false;
      happy = false;
      happydouble = false;
      document.body.classList.remove("backgroundSad5");
      document.body.classList.remove("backgroundHappy5");
    } else {
      activeSad();
    }
  }
  function activeHappy() {
    sad = false;
    happy = true;
    happydouble = true;
    document.body.classList.remove("backgroundSad5");
    document.body.classList.add("backgroundHappy5");
  }
  function activeSad() {
    sad = true;
    happy = false;
    happydouble = false;
    document.body.classList.remove("backgroundHappy5");
    document.body.classList.add("backgroundSad5");
  }

  beforeNavigate(() => {
    document.body.classList.remove("backgroundSad5");
    document.body.classList.remove("backgroundHappy5");
  });
</script>

<h1>Question 5</h1>
<h2>What would Hannes like to have (in life)?</h2>

<div class="labelContainer">
  {#each options as option}
    <label>
      <input type="checkbox" bind:group={choice} value={option} />
      {option}
    </label>
  {/each}
</div>

{#if happy}
  <div class="buttonContainer" transition:fade={{ duration: 1000 }}>
    <button on:click={() => goto("/gallery")}>Continue to surprise</button>
  </div>
{/if}

<img class:sad alt="Hannes is angry" src={photos?.get("sad.png")} />

<img class:happy alt="Hannes is smiling" src={photos?.get("flex.png")} />

<img
  class:happydouble
  alt="Hannes is impressed"
  src={photos?.get("surprise.png")}
/>

<style>
  img {
    position: absolute;
    right: 0;
    bottom: -60px;
    transform: translate(-100%, 0) rotate(-90deg);
    transform-origin: 100% 100%;
    transition: transform 1s;
    width: 300px; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
  }
  .sad {
    transform: translate(-390%, -10%) rotate(0deg);
  }

  .happy {
    width: 400px;
    transform: translate(-280%, -10%) rotate(0deg);
  }

  .happydouble {
    width: 550px;
    transform: translate(0%, -5%) rotate(0deg);
  }
  :global(.backgroundSad5) {
    background-color: rgb(137, 163, 225);
    transition-duration: 1s;
  }
  :global(.backgroundHappy5) {
    background-color: rgb(254, 246, 91);
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
    margin: 50px;
  }
  label {
    font-family: "Gaegu";
    font-size: 35px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
  }
  .labelContainer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 10px;
    column-gap: 0px;
  }

  button {
    font-family: "Sail";
    font-size: 40px;
    text-align: center;
    color: rgb(255, 221, 250);
    background-color: rgb(255, 121, 215);
    border-radius: 100px;
    margin: 40px;
    padding: 20px;
    border: 0;
    box-shadow: 0 8px rgb(79, 38, 66);
  }
  .buttonContainer {
    display: flex;
    justify-content: center;
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
