import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Butter from 'buttercms';

admin.initializeApp();
const butter = Butter('d8f2c77636ca3777bbb451764e7542ced94cfc81');
const timeStamp = admin.database.ServerValue.TIMESTAMP;
const db = admin.database();
const blogDataRef = db.ref(`/blog/blog-data`);

export const handleBlogWebhook = functions.https.onRequest(async (req, res) => {
    const hookType = req.body.webhook.event;
    const slug = req.body.data.id;
    console.log('hookType', hookType);
    console.log('body', req.body);
    if (hookType === 'post.published' || hookType === 'post.update') {
        await addPostSlug(slug);
        await addPostData(slug);
    } else if (hookType === 'post.delete') {
        deletePostSlug(slug);
        deletePostData(slug);
    }
    res.end();
});

const addPostSlug = async (slug) => {
    return await db.ref(`/blog/blog-slugs/${slug}`).set(timeStamp);
}

const addPostData = async (slug) => {
    const result = await getPostBySlug(slug);
    return await db.ref(`/blog/blog-data/${slug}`).set(result.data);
}

const deletePostSlug = async (slug) => {
    return await db.ref(`/blog/blog-slugs/${slug}`).remove();
}

const deletePostData = async (slug) => {
    return await db.ref(`/blog/blog-data/${slug}`).remove();
}

const getPostBySlug = async (slug) => {
    try {
        const post = await butter.post.retrieve(slug);
        return post.data;
    } catch (err) {
        console.log(err);
    }
}