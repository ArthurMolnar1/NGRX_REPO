import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  editPostForm!: FormGroup;
  id!: string;

  constructor(
    private PostService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });

    this.id = this.route.snapshot.params['id'];
    this.PostService.entities$.subscribe((posts) => {
      const post = posts.find((post) => post.id === this.id);
        this.editPostForm?.patchValue({
          title: post?.title,
          description: post?.description,
        });
    });
  }

  onEditPost() {
    const postdata = {
      ...this.editPostForm.value,
      id: this.id
    }
    
    this.PostService.update(postdata);
    this.router.navigate(['/posts']);
  }
}
