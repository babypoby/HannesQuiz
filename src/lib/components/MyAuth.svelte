<script lang="ts">
    import type { SupabaseClient } from "@supabase/supabase-js";
    import GitHubLogo from "$lib/assets/github-mark.svg";

    export let supabase: SupabaseClient;

    async function handleClick() {
        await supabase.auth.signInWithOAuth({
            provider: "github",
        });
    }
</script>

<button on:click={handleClick}>
    <img src={GitHubLogo} alt="GitHub Logo" height="400vh" />
</button>

<style>
    button {
        border: none;
        background-color: transparent;
    }
</style>
