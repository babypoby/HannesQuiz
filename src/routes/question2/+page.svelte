<script>
    import {fade} from 'svelte/transition';
    import {goto, beforeNavigate} from '$app/navigation';

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
        document.body.classList.remove("backgroundSad2");
        document.body.classList.remove("backgroundMoreSad2")
        document.body.classList.add("backgroundHappy2");
    }
    function activeSad() {
        if (sad) {
            moresad = true;
            document.body.classList.add("backgroundMoreSad2");
            document.body.classList.remove("backgroundHappy2");
            document.body.classList.remove("backgroundSad2");
        }
        else{
        sad = true;
        happy = false;
        moresad = false;
        document.body.classList.remove("backgroundHappy2");
        document.body.classList.add("backgroundSad2");
        document.body.classList.remove("backgroundMoreSad2");
        }
    
    }

    beforeNavigate(() => {
        document.body.classList.remove("backgroundSad2");
        document.body.classList.remove("backgroundHappy2");
        document.body.classList.remove("backgroundMoreSad2");
    }); 
  
   
</script>

<h1>Question 2</h1>
<h2>During which sport did Hannes hurt his lungs?</h2>
<div class = "labelContainer">
    <label>
        <input type="radio" on:click={activeSad} bind:group={lang} value="1" />
        Sailing
    </label>
    <label>
        <input type="radio" on:click={activeHappy} bind:group={lang} value="2" />
        Mountain Biking
    </label>
    <label>
        <input type="radio" on:click={activeSad} bind:group={lang} value="3" />
        Karate
    </label>
    <label>
        <input type="radio" on:click={activeSad} bind:group={lang} value="4" />
        Fencing
    </label>
</div>

{#if happy}
<div class= "buttonContainer" transition:fade={{duration: 1000}}><button on:click={()=>goto('/question3')}>To the next quest</button></div>
{/if}



<img class:sad class:moresad alt="Hannes is angry" src={photos?.get("disappointment.png")} />

<img class:happy alt="Hannes is smiling" src={photos?.get("heppy.png")} />

<style>
    img {
        position: absolute;
        right: 0;
        bottom: -60px;
        transform: translate(-100%, 0) rotate(-90deg);
        transform-origin: 100% 100%;
        transition: transform 1s;
        width: 600px; /* Adjust the width as needed */
        height: auto; /* Maintain aspect ratio */
    }
    .sad {
        transform: translate(0%, -10%) rotate(0deg);
    }
    .moresad {
        width: 700px;
        transition: 1s;
    }
    .happy {
        transform: translate(0%, 0%) rotate(0deg);
    }
    :global(.backgroundSad2) {
        background-color: rgb(142, 144, 233);
        transition-duration: 1s;
    }
    :global(.backgroundHappy2) {
        background-color: rgb(255, 170, 212);
        transition-duration: 1s;
    }
    :global(.backgroundMoreSad2) {
        background-color: rgb(94, 97, 172);
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

    button{
    font-family: "Sail";
    font-size: 40px;
    text-align: center;
    color: rgb(255, 235, 155);
    background-color: rgb(255, 120, 29);
    border-radius: 100px;
    margin: 60px;
    padding: 20px;
    border:0;
    box-shadow: 0 8px rgb(80, 42, 16);
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
.buttonContainer{
    display: flex;
    justify-content: center;
}
:global(body) {
		overflow: hidden;
	}
    @font-face {
    font-family: "Sail";
    src: url("./src/Sail/Sail-Regular.ttf")
        format("truetype");
}
@font-face {
    font-family: "Rubik";
    src: url("./src/Rubik_Doodle_Shadow 2/RubikDoodleShadow-Regular.ttf")
        format("truetype");
}

@font-face {
    font-family: "Gaegu";
    src: url("./src/Gaegu/Gaegu-Regular.ttf")
        format("truetype");
}
</style>