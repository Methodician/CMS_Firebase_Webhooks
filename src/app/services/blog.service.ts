import { Injectable } from '@angular/core';
import * as Butter from 'buttercms';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  butter = Butter('d8f2c77636ca3777bbb451764e7542ced94cfc81');

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



}
