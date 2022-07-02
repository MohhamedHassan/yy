import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  public uploader: FileUploader;
  private hasDragOver = false;

  @Input()
  editmode = false;
  @Input()
  url = '';

  @Output()
  private urlChange = new EventEmitter();

  constructor() {
    this.uploader = new FileUploader({
      url: `${environment.apiUrl}UsersRigester/UploadImage`,
      disableMultipart: false,
      autoUpload: true
    });

    this.uploader.response.subscribe(res => {
      // Upload returns a JSON with the image ID
      console.log('img',res)
      console.log('imgObj', JSON.parse(res))
      this.url =  'http://finalmohamed-001-site1.itempurl.com/Resources/ProfileImages/' +  JSON.parse(res);
      this.urlChange.emit(this.url);
    });
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }

  ngOnInit() {
  }

}
