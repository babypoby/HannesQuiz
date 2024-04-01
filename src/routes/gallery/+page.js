
import description from '$lib/descriptions.json';



export async function load({parent}) {
    const {supabase} = await parent();
    const { data, error } = await supabase.storage.from('photos').list('gallery')
    const { data: likes, error: likeError } = ((await supabase.from("Likes").select()));
    const {data: user, error: userError} = await supabase.auth.getUser()
    if (error) {
        console.error('Error loading photos:', error)
    }

    if (likeError) {
        console.error('Error loading likes:', likeError)
    }

    if (userError) {
        console.error('Error loading user:', userError)
    }

    else {
        const countedLikes = Object.create(null);
        
        for (const row of likes) {
            const currCount = countedLikes[row.picture_id] ?? 0;
            countedLikes[row.picture_id] = currCount + 1;
        }

        let photos = data?.map(photo => {
            let liked = false;
            const name = photo.name;
            const url = supabase.storage.from('photos').getPublicUrl(`gallery/${photo.name}`).data.publicUrl;
            const descriptionText = description[photo.name];
            if (likes?.find(like => like.picture_id === photo.id && like.user === user.user.id)) {
                liked = true;
            }
            return {id: photo.id, name: name, url: url, description: descriptionText, liked: liked, count: 0 }
        })
        photos = photos.slice(1);

       
        return {
            photos: photos, likes: countedLikes
        }
    }
}