"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Butter = require("buttercms");
admin.initializeApp();
const butter = Butter('d8f2c77636ca3777bbb451764e7542ced94cfc81');
const timeStamp = admin.database.ServerValue.TIMESTAMP;
const db = admin.database();
const blogDataRef = db.ref(`/blog/blog-data`);
exports.handleBlogWebhook = functions.https.onRequest((req, res) => __awaiter(this, void 0, void 0, function* () {
    const hookType = req.body.webhook.event;
    const slug = req.body.data.id;
    console.log('hookType', hookType);
    console.log('body', req.body);
    if (hookType === 'post.published' || hookType === 'post.update') {
        yield addPostSlug(slug);
        yield addPostData(slug);
    }
    else if (hookType === 'post.delete') {
        deletePostSlug(slug);
        deletePostData(slug);
    }
    res.end();
}));
const addPostSlug = (slug) => __awaiter(this, void 0, void 0, function* () {
    return yield db.ref(`/blog/blog-slugs/${slug}`).set(timeStamp);
});
const addPostData = (slug) => __awaiter(this, void 0, void 0, function* () {
    const result = yield getPostBySlug(slug);
    return yield db.ref(`/blog/blog-data/${slug}`).set(result.data);
});
const deletePostSlug = (slug) => __awaiter(this, void 0, void 0, function* () {
    return yield db.ref(`/blog/blog-slugs/${slug}`).remove();
});
const deletePostData = (slug) => __awaiter(this, void 0, void 0, function* () {
    return yield db.ref(`/blog/blog-data/${slug}`).remove();
});
const getPostBySlug = (slug) => __awaiter(this, void 0, void 0, function* () {
    try {
        const post = yield butter.post.retrieve(slug);
        return post.data;
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=index.js.map