<script>
    import { Rating, Heart } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    export let data;

    let photos = data.photos;
    let likeCounts = data.likes;

    async function handleClick(photo) {
        const { error, data: user } = await data.supabase.auth.getUser();
        if (error) {
            console.error("error", error);
            return;
        }
        if (photo.liked) {
            photo.liked = false;
            likeCounts[photo.id] -= 1;
            const { error } = await data.supabase
                .from("Likes")
                .delete()
                .eq("user", user.user.id)
                .eq("picture_id", photo.id);
            if (error) console.error("error", error);
        } else {
            photo.liked = true;
            if (!likeCounts[photo.id]) {
                likeCounts[photo.id] = 1;
            } else {
                likeCounts[photo.id] += 1;
            }
            const { error } = await data.supabase.from("Likes").insert({
                user: user.user.id,
                picture_id: photo.id,
                created_at: new Date(),
            });
            if (error) console.error("error", error);
        }
        photos = [...photos];
    }
</script>

<h1>Gallery of Hannes</h1>

<div class="photos">
    {#each photos as photo}
        <figure>
            <img src={photo.url} alt={photo.description} />
            <div class="label">
                <div>{photo.description}</div>
                <button on:click={() => handleClick(photo)}>
                    {#if photo.liked}
                        <Rating total={1} rating={1} icon={Heart} size={50} />
                    {:else}
                        <Rating total={1} rating={0} icon={Heart} size={50} />
                    {/if}
                    <span class:liked = {photo.liked}>
                        {likeCounts[photo.id] === undefined
                            ? 0
                            : likeCounts[photo.id]}
                    </span>
                </button>
            </div>
        </figure>
    {:else}
        <p>Loading...</p>
    {/each}
</div>
<div class="buttonContainer">
    <button class="bigButton" on:click={() => goto("/letter")}
        >To the last quest</button
    >
</div>

<style>
    .photos {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 20px;
        row-gap: 15px;
    }

    .label {
        display: flex;
        justify-content: space-between;
    }
    figure {
        width: 100%;
        margin: 0;
    }

    img {
        width: 100%;
        border-radius: 10px;
    }

    button {
        background-color: white;
        border: none;
        cursor: pointer;
        position: relative;
    }
    .liked{
        color: white;
    }

    .bigButton {
        font-family: "Sail";
        font-size: 40px;
        text-align: center;
        color: rgb(255, 255, 255);
        background-color: rgb(255, 51, 109);
        border-radius: 100px;
        margin: 60px;
        padding: 20px;
        border: 0;
        box-shadow: 0 8px rgb(62, 23, 34);
    }
    .buttonContainer {
        display: flex;
        justify-content: center;
    }

    .bigButton:hover {
        background-color: rgb(255, 0, 72);
        transition: 0.5s;
        box-shadow: 0 8px rgb(62, 23, 34);
    }
    .bigButton:active {
        background-color: rgb(255, 0, 72);
        transform: translateY(6px);
        box-shadow: 0 8px rgb(62, 23, 34);
    }

    h1 {
        font-family: "Title";
        font-size: 100px;
        text-align: center;
    }
    div {
        font-family: "Text";
        font-size: 35px;
    }
    span {
        font-family: "Text";
        font-size: 20px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(body) {
        overflow: scroll !important;
    }
    @font-face {
        font-family: "Title";
        src: url("./src/Rubik_Doodle_Shadow 2/RubikDoodleShadow-Regular.ttf")
            format("truetype");
    }

    @font-face {
        font-family: "Text";
        src: url("./src/Gaegu/Gaegu-Regular.ttf") format("truetype");
    }

    @font-face {
        font-family: "Sail";
        src: url("./src/Sail/Sail-Regular.ttf") format("truetype");
    }
</style>
