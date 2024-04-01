<script>
    import { onDestroy, onMount } from 'svelte';
    import {fade} from 'svelte/transition';
    import {goto, beforeNavigate} from '$app/navigation';

    export let data;
    let photos = data.photosMap;

    let name = '';
    let titleClass= ''
    let ready = false;
    function toggleYellow() {
        if (name.trim() !== '') {
            document.body.classList.add('backgroundYellow');
            titleClass = 'titleYellow';
            ready = true;
        } else {
            document.body.classList.remove('backgroundYellow');
            titleClass = '';
            ready = false;
        }
    }
    beforeNavigate(() => {
        document.body.classList.remove('backgroundYellow');
    });
    
</script>


<h1 class={titleClass}>The Hannes Quiz</h1>

<input bind:value={name} on:input={toggleYellow} placeholder="Enter your name" />
<p>Hello {name || 'stranger'}! Welcome to the Hannes Quiz. </p>
{#if name}
    <div transition:fade={{duration: 1000}}>
        <p> Depending how you perform on the test, there will be a surprise in the end. Good luck! </p>
        <div class= "buttonContainer"><button on:click = {() => goto ('/question1')}>Abfahrt</button></div>
    </div>

{/if}


<img
	class:curious={ready}
	alt="Hannes is smiling"
	src={photos?.get('raincoat.png')}
/> 

<style>

img {
		position: absolute;
		right: 0;
		bottom: -60px;
		transform: translate(-100%, 0) rotate(-90deg);
		transform-origin: 100% 100%;
		transition: transform 1s;
        width: 150px; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
	}
.curious {
        transform: translate(-50%, 0) rotate(0deg);
    }

h1 {
    font-family: "Rubik";
    font-size: 80px;
    text-align: center;
    margin-bottom: 80px;
    margin-top: 30px;
}
p,input {
    font-family: "Gaegu";
    font-size: 35px;
    margin-left: 10px;
    background-color: transparent;
}

button{
    font-family: "Sail";
    font-size: 80px;
    text-align: center;
    color: rgb(146, 213, 255) ;
    margin: 50px;
    background-color: rgb(0, 10, 151);
    border-radius: 100px;
    padding: 30px;
    border:0;
    box-shadow: 0 8px rgb(0, 2, 28);
}
.buttonContainer{
    display: flex;
    justify-content: center;
}
button:hover{
    background-color: rgb(0, 6, 93);
    transition-duration: 0.5s;
    box-shadow: 0 8px rgb(0, 2, 28);
}
button:active{
    background-color: rgb(0, 6, 93);
    transition-duration: 0.5s;
    transform: translateY(6px);
    box-shadow: 0 8px rgb(0, 2, 28);
}
:global(.backgroundYellow) {
    background-color: rgb(250, 255, 161);
    transition-duration: 1s;
}
.titleYellow{
    font-size: 120px;
    color: rgb(255, 102, 0);
    transition-duration: 1s;
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
