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
  }

  async getPosts() {
    const results = await this.blogService.getPosts();
    this.posts = results.data;
  }

}
