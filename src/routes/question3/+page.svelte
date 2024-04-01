<script lang="ts">
  import { fade } from "svelte/transition";
  import { goto, beforeNavigate } from "$app/navigation";

  export let data;
  let photos = data.photosMap as Map<string, string>;

  let date = 1;
  let month = 1;
  let year = 1990;

  let sad = false;
  let moresad = false;
  let happy = false;

  function check() {
    if (date === 11 && month === 3 && year === 2004) {
      activeHappy();
    } else {
      activeSad();
    }
  }
  function activeHappy() {
    sad = false;
    happy = true;
    moresad = false;
    document.body.classList.remove("backgroundSad3");
    document.body.classList.remove("backgroundMoreSad3");
    document.body.classList.add("backgroundHappy3");
  }
  function activeSad() {
    if (sad) {
      moresad = true;
      document.body.classList.add("backgroundMoreSad3");
      document.body.classList.remove("backgroundHappy3");
      document.body.classList.remove("backgroundSad3");
    } else {
      sad = true;
      happy = false;
      moresad = false;
      document.body.classList.remove("backgroundHappy3");
      document.body.classList.add("backgroundSad3");
      document.body.classList.remove("backgroundMoreSad3");
    }
  }

  beforeNavigate(() => {
    document.body.classList.remove("backgroundSad3");
    document.body.classList.remove("backgroundHappy3");
    document.body.classList.remove("backgroundMoreSad3");
  });
</script>

<h1>Question 3</h1>
<h2>When is Hannes' Birthday?</h2>
<div class="labelContainer">
  <label>
    <input type="number" bind:value={date} min="1" max="31" />
  </label>
  /
  <label>
    <input type="number" bind:value={month} min="1" max="12" />
  </label>
  /
  <label>
    <input type="number" bind:value={year} min="1990" max="2024" />
  </label>
</div>

<div class="labelContainer">
  Are you sure that Hannes was born on the {date}.{month}.{year}?
</div>

<div class="labelContainer">
  <button on:click={check} class="smallButton">Yes</button>
  <button on:click={activeSad} class="smallButton">No</button>
</div>

{#if happy}
  <div class="labelContainer" transition:fade={{ duration: 1000 }}>
    <button class="bigButton" on:click={() => goto("/question4")}
      >To the next quest</button
    >
  </div>
{/if}

<img
  class:sad
  class:moresad
  alt="Hannes is angry"
  src={photos?.get("confused.png")}
/>

<img class:happy alt="Hannes is smiling" src={photos?.get("hoho.png")} />

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
    transform: translate(-270%, 0%) rotate(0deg);
  }
  .moresad {
    transform: translate(-200%, 0%) rotate(0deg);
    width: 500px;
    transition: 1s;
  }
  .happy {
    width: 550px;
    transform: translate(0%, 0%) rotate(0deg);
  }
  :global(.backgroundSad3) {
    background-color: rgb(119, 193, 119);
    transition-duration: 1s;
  }
  :global(.backgroundHappy3) {
    background-color: rgb(254, 200, 91);
    transition-duration: 1s;
  }
  :global(.backgroundMoreSad3) {
    background-color: rgb(82, 144, 94);
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
    margin-bottom: 40px;
  }
  div {
    font-family: "Gaegu";
    font-size: 35px;
    margin-left: 10px;
  }
  input {
    font-family: "Gaegu";
    font-size: 50px;
    background-color: transparent;
    border-radius: 20px;
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
  }
  .bigButton {
    box-shadow: 0 8px rgb(79, 38, 66);
  }
  .bigButton:hover {
    background-color: rgb(255, 78, 202);
    transition: 0.5s;
    box-shadow: 0 8px rgb(79, 38, 66);
  }
  .bigButton:active {
    background-color: rgb(255, 78, 202);
    transform: translateY(6px);
    box-shadow: 0 8px rgb(79, 38, 66);
    transition: 0.5s;
  }
  .smallButton {
    font-family: "Gaegu";
    font-size: 40px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    border-radius: 40px;
    color: black;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: transparent;
    border: 2px solid black;
  }
  .smallButton:hover {
    transform: translateY(-6px);
    transition-duration: 0.5s;
  }
  .smallButton:active {
    transition-duration: 0.5s;
    transform: translateY(6px);
  }
  .labelContainer {
    display: flex;
    justify-content: center;
    margin: 20px;
    align-items: center;
  }
  :global(body) {
    overflow: hidden;
  }
  @font-face {
    font-family: "Sail";
    src: url($lib/assets/Sail/Sail-Regular.ttf) format("truetype");
  }
  @font-face {
    font-family: "Rubik";
    src: url($lib/assets/Rubik_Doodle_Shadow/RubikDoodleShadow-Regular.ttf) format("truetype");
  }

  @font-face {
    font-family: "Gaegu";
    src: url($lib/assets/Gaegu/Gaegu-Regular.ttf) format("truetype");
  }
</style>
