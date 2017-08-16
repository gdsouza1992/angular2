import { Component, OnInit } from '@angular/core';
import { Video } from './../video';
import { VideoService } from './../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

    videos: Array<Video>;

    selectedVideo: Video;
    private hideNewVideo : boolean = true;
    constructor(private _videoService : VideoService) { }

    ngOnInit() {
        this._videoService.getVideos()
            .subscribe(resVideoData => this.videos = resVideoData);
    }

    onSelectVideo(video:any) {
        this.selectedVideo = video;
        this.hideNewVideo = true;
        console.log(this.selectedVideo);
    }

    onSubmitAddVideo(video: Video){
        this._videoService.addVideo(video)
            .subscribe(resNewVideo => {
                this.videos.push(resNewVideo);
                this.selectedVideo = resNewVideo;
                this.hideNewVideo = true;
            })
    }

    onUpdateVideoEvent(video: Video){
        this._videoService.updateVideo(video)
            .subscribe(resUpdatedVideo => video = resUpdatedVideo);
        this.selectedVideo = null;
    }

    onDeleteVideoEvent(video: Video){
        let videoArray = this.videos;
        this._videoService.deleteVideo(video)
            .subscribe(resDeletedVideo => {
                this.videos = videoArray.filter((eachVideo: Video) => {
                    return eachVideo._id !== resDeletedVideo._id
                });
            });
        this.selectedVideo = null;
    }

    newVideo(){
        this.hideNewVideo = false;
    }

}
