import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-look-post-pop-up',
  templateUrl: './dashboard-look-post-pop-up.component.html',
  styleUrls: ['./dashboard-look-post-pop-up.component.sass']
})
export class DashboardLookPostPopUpComponent implements OnInit {
  user: any;
  post: any;

  constructor(public activeModal: NgbActiveModal, private postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
  }

}
