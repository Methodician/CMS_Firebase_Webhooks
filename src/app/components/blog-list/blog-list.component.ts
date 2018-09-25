import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
// import { FeaturedService } from '../../services/featured.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hook-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  posts;
  featuredPosts = [];
  featuredPostSlugs;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPosts();
    this.getFeaturedPosts();
  }

  async getPosts() {
    const results = await this.blogService.getPosts();
    this.posts = results.data;
  }

  async getPostBySlug(slug){
    const result = await this.blogService.getPostBySlug(slug);
    return result;
  }

  getFeaturedPosts(){
     this.blogService.watchFeaturedPostSlugs().subscribe(async (result) => {
       if(result){
          this.featuredPosts = [];
          const slugs = Object.keys(result);
          for(let slug of slugs){
            const post = await this.blogService.getPostBySlug(slug);
            this.featuredPosts.push(post.data);
          }
       }
     });
  }

}
