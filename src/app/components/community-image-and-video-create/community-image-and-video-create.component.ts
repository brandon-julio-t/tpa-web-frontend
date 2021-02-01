import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-community-images-and-videos-create',
  templateUrl: './community-image-and-video-create.component.html',
  styleUrls: ['./community-image-and-video-create.component.scss'],
})
export class CommunityImageAndVideoCreateComponent implements OnInit {
  form = this.fb.group({
    description: ['', Validators.required],
    name: ['', Validators.required],
    file: ['', Validators.required],
  });

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onFileChange(e: EventTarget | null): void {
    const input = e as HTMLInputElement;
    const file = input.files?.item(0);
    this.form.controls.file.setValue(file);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.spinner.show();
    this.apollo
      .mutate({
        mutation: gql`
          mutation createCommunityImagesAndVideos(
            $description: String!
            $name: String!
            $file: Upload!
          ) {
            createCommunityImagesAndVideos(
              input: { description: $description, name: $name, file: $file }
            ) {
              id
            }
          }
        `,
        variables: this.form.value,
      })
      .subscribe((resp) => {
        if (resp.data) {
          this.spinner.hide();
          this.form.reset();
          alert('Create success!');
        }
      });
  }
}
