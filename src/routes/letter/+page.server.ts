import { MAILGUN_KEY } from '$env/static/private';
import type { Actions } from './$types';

// Import modules using ES module syntax
import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Create an instance of Mailgun
const mailgun = new Mailgun(formData);

// Create a client with the Mailgun instance
const mg = mailgun.client({
    username: 'api',
    key: MAILGUN_KEY,
});

// Use async/await to make the request
async function sendEmail(subject: string, text: string) {
    try {
        // Create a message using the client
        const msg = await mg.messages.create('sandbox0804ef75ea3d497c8d27b7ac66ff8ac9.mailgun.org', {
            from: "Excited User <postmaster@sandbox0804ef75ea3d497c8d27b7ac66ff8ac9.mailgun.org>",
            to: ["hannes.furmans@web.de"],
            subject: subject,
            text: text,
        });
        console.log(msg); // logs response data
    } catch (err) {
        console.log(err); // logs any error
    }
}

// Call the sendEmail function to send the email


export const actions = {
    default: async ({ request, locals: {supabase} }) => {
        if (supabase.auth.getUser() === null) {
            return {
                status: 401,
                body: { error: "Unauthorized" },
            };
        }

        const body = await request.formData();
        const text = body.get("message");
        if (!text) {
            return {
                status: 400,
                body: { error: "Message is required" },
            };
        }
        sendEmail ("Love Mail", text as string);
    },
} satisfies Actions;