// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({
  url,
  locals: { getSession, supabase },
}) => {
  return {
    session: await getSession(),
  };
};
