import { Component, OnInit, NgModule, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['video'],
  outputs: ['updateVideoEvent', 'deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {
    video: any;
    private editTitle: boolean = false;
    public updateVideoEvent = new EventEmitter();
    public deleteVideoEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(){
      this.editTitle = false;
    }

    onTitleClick(){
      this.editTitle = true;
    }

    updateVideo(){
        this.updateVideoEvent.emit(this.video);
    }

    deleteVideo(){
        this.deleteVideoEvent.emit(this.video);
    }


}
