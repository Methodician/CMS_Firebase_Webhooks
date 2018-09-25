import { Injectable } from '@angular/core';
import * as Butter from 'buttercms';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  butter = Butter('d8f2c77636ca3777bbb451764e7542ced94cfc81');
  db = firebase.database();

  constructor() { }

  async getPosts() {
    const posts = await this.butter.post
      .list({
        pate: 1,
        page_size: 10
      });
    return posts.data;
  }

  async getPostBySlug(slug) {
    try {
      const post = await this.butter.post
        .retrieve(slug);
      return post.data;
    } catch (error) {
      console.log(error);
    }
  }

  watchPostSlugsFB(): BehaviorSubject<any> {
    const subject = new BehaviorSubject(null);
    this.db.ref('/blog/blog-slugs').on('value', res => {
      subject.next(res.val());
    });
    return subject;
  }

  watchFeaturedPostSlugs(): BehaviorSubject<any> {
    const subject = new BehaviorSubject(null);
    this.db.ref('/blog/featured-posts').on('value', res => {
      subject.next(res.val());
    });
    return subject;
  }

  watchArchivedFeaturedPostSlugs(): BehaviorSubject<any> {
    const subject = new BehaviorSubject(null);
    this.db.ref('/blog-archive/featured-posts').on('value', res => {
      subject.next(res.val());
    })
    return subject;
  }

  async featurePost(slug){
    return await this.db.ref(`/blog/featured-posts/${slug}`).set(firebase.database.ServerValue.TIMESTAMP);
  }

  async unfeaturePost(slug, timestamp){
    await this.db.ref(`/blog-archive/featured-posts/${slug}`).set(timestamp);
    return await this.db.ref(`/blog/featured-posts/${slug}`).remove();
  }



}
