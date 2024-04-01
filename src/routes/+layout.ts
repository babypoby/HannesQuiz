import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
    depends('supabase:auth')

    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch,
        },
        cookies: {
            get(key) {
                if (!isBrowser()) {
                    return JSON.stringify(data.session)
                }

                const cookie = parse(document.cookie)
                return cookie[key]
            },
        },
    })

  

    

    const {
        data: { session },
    } = await supabase.auth.getSession()
    

    const { data: photoData, error } = await supabase.storage.from('photos').list('slideins')
    if (error) {
        console.error('Error loading photos:', error)
        return { supabase, session }

    }

    else {
        let photos = photoData?.map(photo => {
            const name = photo.name;
            const url = supabase.storage.from('photos').getPublicUrl(`slideins/${photo.name}`).data.publicUrl;
            return [name, url]
        })
        const photosMap = new Map(Array.from(photos))

        return { supabase, session, photosMap }

    }



}



