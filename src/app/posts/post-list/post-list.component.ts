import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from "../posts.service";
import { PageEvent } from "@angular/material";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
    posts: Post[] = [];
    private postsSub: Subscription;
    isLoading = false;
    totalPosts = 10;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1,2,5,10];

    constructor(public postsService: PostsService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

    onChangePage(pageData: PageEvent) {
        this.postsPerPage = pageData.pageSize; 
        this.currentPage = pageData.pageIndex + 1;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId)
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}