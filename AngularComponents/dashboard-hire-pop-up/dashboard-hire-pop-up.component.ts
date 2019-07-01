import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-dashboard-hire-pop-up',
  templateUrl: './dashboard-hire-pop-up.component.html',
  styleUrls: ['./dashboard-hire-pop-up.component.sass']
})
export class DashboardHirePopUpComponent implements OnInit {
  @Input() postId: string;
  @Input() executorId: string;
  refresh: Function;

  constructor(public activeModal: NgbActiveModal, private postsService: PostsService) { }
  hire() {
    // let form = new FormData();
    // form = this.id;
    // ПОЧИНИТЬ ТУТ ЛОГИКУ ПРИНЯТИЕ АССЕРТ

   this.postsService.acceptRequest({postId: this.postId , executorId : this.executorId}).then(request => {
      this.refresh();
      this.activeModal.close();;
    });
    //  this.refresh();
  }
  ngOnInit() {
  }

}
