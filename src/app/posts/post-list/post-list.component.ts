import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from "../posts.service";

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

    constructor(public postsService: PostsService) {
    }

    ngOnInit() {
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}