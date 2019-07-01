import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';
import { ActionResultNotificatorPopUpComponent } from '../action-result-notificator-pop-up/action-result-notificator-pop-up.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-postpopup',
    templateUrl: './postpopup.component.html',
    styleUrls: ['./postpopup.component.sass']
})
export class PostPopUpComponent implements OnInit {
    @Input() user: any;
    textarea: any;
    @Input() post: any;
    constructor(
      public activeModal: NgbActiveModal,
      public modalService : NgbModal,
      private postsService: PostsService,
      private authService: AuthService,
      private router: Router) { }

    ngOnInit() {
    }
    push() {
        const form = new FormData();
        this.postsService.doRequest({comment: this.textarea, postId: this.post.id})
        .then((res) => {
          //  const token = this.postsService.getToken();
          //  return this.authService.getUserProfile(token);
            this.activeModal.close();
            let response = res.json().response;
            const activePopUp = this.modalService.open(ActionResultNotificatorPopUpComponent);
            activePopUp.componentInstance.succes = true;
            activePopUp.componentInstance.message = response;
        })
        .catch((err)=>{
          this.activeModal.dismiss();
          let error = err.json().response;
          const activePopUp = this.modalService.open(ActionResultNotificatorPopUpComponent);
          activePopUp.componentInstance.succes = false;
          activePopUp.componentInstance.message = error;
        });
    }
    register() {
      this.activeModal.close();
      this.router.navigate(['/register']);
    }
}
