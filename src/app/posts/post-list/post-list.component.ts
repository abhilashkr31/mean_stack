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
    // posts = [
    //     {
    //         title: "First Post",
    //         content: "This is the First Post"
    //     },
    //     {
    //         title: "Second Post",
    //         content: "This is the Second Post"
    //     },
    //     {
    //         title: "Third Post",
    //         content: "This is the Third Post"
    //     },
    // ]
    posts: Post[] = [];
    private postsSub: Subscription;
    isLoading = false;
    totalPosts = 10;
    postsPerPage = 2;
    pageSizeOptions = [1,2,5,10];

    constructor(public postsService: PostsService) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

    onChangePage(pageData: PageEvent) {
        console.log(pageData);
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId)
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}