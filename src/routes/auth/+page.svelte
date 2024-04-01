<script lang="ts">
  import { Auth } from "@supabase/auth-ui-svelte";
  import { ThemeSupa } from "@supabase/auth-ui-shared";
  import { onMount } from "svelte";
  import MyAuth from "$lib/components/MyAuth.svelte";

  export let data;
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<div>
  <div>
    <MyAuth supabase={data.supabase} />
  </div>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100vh;
  }
  div > div {
    display: flex;
    flex-direction: column;
  }
  :global(body) {
    overflow: hidden;
  }
</style>
