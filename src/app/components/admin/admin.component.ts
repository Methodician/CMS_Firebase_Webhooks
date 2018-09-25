import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'hook-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  postSlugs;
  postList;
  featuredPostSlugs;
  featuredPostList;
  archivedFeaturedPostList;

  constructor(private blogSvc: BlogService) { }

  ngOnInit() {
    // Watch the posts
     this.blogSvc.watchPostSlugsFB().subscribe(res => {
       if(res){
        this.postList = res;
        this.postSlugs = Object.keys(res);
       }
     });
     // Watch the featured posts
     this.blogSvc.watchFeaturedPostSlugs().subscribe(res => {
       if(res){
         this.featuredPostList = res;
         this.featuredPostSlugs = Object.keys(res);
       }
     })
     // Watch the featured posts acchive
     this.blogSvc.watchArchivedFeaturedPostSlugs().subscribe(res => {
       if(res){
         this.archivedFeaturedPostList = res;
       }
     })
  }

  featureBlogPost(slug: string){
    this.blogSvc.featurePost(slug);
  }

  unfeatureBlogPost(slug: string){
    this.blogSvc.unfeaturePost(slug, this.featuredPostList[slug]);
  }

  isFeatured(slug){
    if(this.featuredPostSlugs){
      return this.featuredPostSlugs.indexOf(slug) > -1;
    }
  }

}
