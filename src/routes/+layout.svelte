<script>
  import { goto, onNavigate } from "$app/navigation";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  export let data;
  import MyExit from "$lib/components/MyExit.svelte";

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });

  onMount(async() => {
    const {error, data: user} = await data.supabase.auth.getSession();
    if (error) {
      console.error("error", error);
      return;
    }
    console.log(user);
    if (!user.session) {
      console.log("no user");
      goto("/auth");
    }
  });
</script>

<main>
  <slot />
  <MyExit {supabase} />
</main>
