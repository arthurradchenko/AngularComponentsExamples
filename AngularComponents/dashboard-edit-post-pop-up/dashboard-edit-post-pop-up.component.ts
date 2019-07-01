import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { PostsService } from '../../services/posts.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { EmployerService } from "../../services/employer.service"

@Component({
    selector: 'app-dashboard-edit-post-pop-up',
    templateUrl: './dashboard-edit-post-pop-up.component.html',
    styleUrls: ['./dashboard-edit-post-pop-up.component.sass']
})

export class DashboardEditPostPopUpComponent implements OnInit {
    postEditingForm: FormGroup;
    @Input() post: any;
    refresh: Function;
    active: any;
    completed: any;
    request: any;
    categories: any;
    locations: any;
    locSelected: number;
    multipleCategories: number[] = new Array();
    selectedlistOfCategories: string[] = new Array();
    catString: string;

    constructor(public activeModal: NgbActiveModal, private authService: AuthService, private postsService: PostsService, private router: Router, private employerService: EmployerService) { }

    removeCategory(event) {
        let indexOfValue = this.selectedlistOfCategories.indexOf(event.target.innerText);
        this.selectedlistOfCategories.splice(indexOfValue, 1);
        this.multipleCategories.splice(indexOfValue, 1);
    }
    
    multiplyCategory(event: any, categoryString: string) {
        let existsIndexStrings = this.selectedlistOfCategories.indexOf(categoryString);
        if (existsIndexStrings === -1) {
            this.selectedlistOfCategories.push(categoryString);
        }
        // id`s
        let existsIndexId = this.multipleCategories.indexOf(this.postEditingForm.value.categoryId);
        if (existsIndexId === -1) {
            this.multipleCategories.push(this.postEditingForm.value.categoryId);
        }
        this.catString = this.multipleCategories.join();
    }
    editPost() {
        if (this.selectedlistOfCategories == undefined) return alert("Укажите категорию объявления");
        const input = new FormData();
        input.append("title", this.postEditingForm.value.title);
        input.append("description", this.postEditingForm.value.description);
        input.append("categoryId", this.catString);
        input.append("price", this.postEditingForm.value.price);
        input.append("locationId", this.postEditingForm.value.city);
        this.postsService.editPost(input, this.post.id).then(() => {
            this.refresh();
            this.activeModal.close();
        })
      }
    ngOnInit() {
        this.postsService.getallCategories().then((result) => {
            this.categories = result;
        });
        this.postsService.getallLocations().then((result) => {
            this.locations = result.response;
        });
        for(let i = 0; i < this.post.category.length; i++){
            this.selectedlistOfCategories.push(this.post.category[i].title);
            this.multipleCategories.push(this.post.category[i].id);
        }
        this.locSelected = this.post.location.id;
        this.postEditingForm = new FormGroup(
            {
                "price": new FormControl(this.post.price, Validators.required),
                "title": new FormControl(this.post.title, Validators.required),
                "description": new FormControl(this.post.description, Validators.required),
                "categoryId": new FormControl("", Validators.required),
                "city": new FormControl("", Validators.required),
            })


    }
}