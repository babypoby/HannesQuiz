<script lang="ts">
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { goto } from "$app/navigation";
  export let supabase: SupabaseClient;
</script>

<button
  on:click={async () => {
    const error = await supabase.auth.signOut();
    goto("/auth");
  }}
  ><svg
    class="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
    />
  </svg></button
>

<style>
  button {
    border: none;
    background-color: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  path {
    stroke: rgb(191, 191, 191);
  }

  button:hover path {
    stroke: rgb(89, 89, 89);
  }
</style>
