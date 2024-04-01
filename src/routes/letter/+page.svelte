<script>
  import { fade } from "svelte/transition";
  let visible = false;
  let text = "";
</script>

<div class="big">
  <div class="greeting">Congratulations!</div>

  <div class="text">
    You arrived in the last stage of the journey. Here you have the oppurtunity
    to pour your heart out and say things to Hannes that you couldn't (or
    wouldn't) otherwise say.
  </div>

  <label>
    <input type="checkbox" bind:checked={visible} />
    I have difficulties being emotionally vulnerable.
  </label>

  {#if visible}
    <div transition:fade class="pop">
      <p>No worries! Here are some questions that can get you started:</p>
      <p>- What are your favorite memories with Hannes?</p>
      <p>- How would you describe Hannes in 3 words?</p>
      <p>- What was your first impression of Hannes?</p>
      <p>- Where do you see Hannes in 10 years?</p>
      <p>- How would you describe your friendship with Hannes in 3 words?</p>
      <p>P.S: Don't be shy, the message is sent anonymously</p>
    </div>
  {/if}

  <form method="POST">
    <label
      for="message"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Your Message
    </label>
    <textarea bind:value={text} id="message" rows="12" name="message" />
    <div class="buttonContainer">
      <button class="bigButton" type="submit">Send</button>
    </div>
  </form>
</div>

<style>
  div,
  form {
    display: flex;
    flex-direction: column;
  }
  .greeting {
    font-family: "Sail";
    font-size: 100px;
    text-align: center;
  }
  .greeting {
    animation-duration: 3.115s;
  }

  .greeting {
    background: linear-gradient(
      53.13deg,
      #ffd33d 0,
      #fb8532 16.02%,
      #ea4a5a 28.06%,
      #8a63d2 56.92%,
      #2188ff 72.93%,
      #34d058 84%,
      #ffd33d 100%
    );
    background-size: auto;
    background-clip: border-box;
    background-clip: text;
    display: inline-block;
    color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 6.28s alternate infinite;
    animation-duration: 6.28s;
    background-size: 300%;
  }

  @keyframes shine {
    0% {
      background-position: 200% left;
      filter: hue-rotate(0);
    }
    62.8% {
      background-position: 100% center;
      filter: hue-rotate(180);
    }
    100% {
      background-position: 200% right;
      filter: hue-rotate(360);
    }
  }

  .text {
    font-family: "Gaegu";
    font-size: 30px;
    margin-left: 20px;
    margin-right: 10px;
  }
  .big {
    row-gap: 20px;
  }
  .pop {
    color: rgb(105, 105, 105);
  }
  .buttonContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  label,
  p,
  textarea {
    font-family: "Gaegu";
    font-size: 30px;
    margin-left: 20px;
    margin-right: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: transparent;
  }

  textarea {
    font-family: "DMMono";
    font-size: 20px;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 20px;
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }

  :global(body) {
    background-color: white;
  }
  button {
    font-family: "Sail";
    font-size: 30px;
    color: white;
    background-color: rgb(101, 199, 255);
    border: 0;
    border-radius: 100px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 100px;
    box-shadow: 0 5px rgb(131, 164, 183);
  }

  button:hover {
    transition: 0.3s;
    background-color: rgb(44, 177, 254);
    box-shadow: 0 5px rgb(131, 164, 183);
  }

  button:active {
    background-color: rgb(44, 177, 254);
    box-shadow: 0 5px rgb(131, 164, 183);
    transform: translateY(4px);
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

  @font-face {
    font-family: "DMMono";
    src: url($lib/assets/DMMono/DMMono-Regular.ttf) format("truetype");
  }
</style>
