import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  post!: Post | any;

  constructor(
    private route: ActivatedRoute,
    private PostService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.PostService.entities$.subscribe((posts) => {
      this.post = posts.find((post) => post.id === id);
    });
  }
}
