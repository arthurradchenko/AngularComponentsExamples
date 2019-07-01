import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PostsService} from '../../services/posts.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
// modals
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionResultNotificatorPopUpComponent } from '../action-result-notificator-pop-up/action-result-notificator-pop-up.component';
// RxJs imports
import 'rxjs/Rx';
import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  stepOne = true;
  visibility = false;
  photoName = '';
  photoName2 = '';
  photoUrl1 = '';
  photoUrl2 = '';
  //
  selectedFile: File;
  //
  locations: any;
  categories: any;
  // multipleCategories : Array[];
  multipleCategories: number[] = new Array();
  selectedlistOfCategories: string[] = new Array();
  catString: string ;
  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router,
    private modalService: NgbModal,
  ) { }
  //
  removeCategory(event) {
      let indexOfValue =  this.selectedlistOfCategories.indexOf(event.target.innerText);
      this.selectedlistOfCategories.splice(indexOfValue, 1);
      this.multipleCategories.splice(indexOfValue, 1);
      this.catString = this.multipleCategories.join();
  }
  // Add multiple categories
  multiplyCategory(event: any, categoryString: string) {
    let existsIndexStrings = this.selectedlistOfCategories.indexOf(categoryString);
    if (existsIndexStrings === -1) {
        this.selectedlistOfCategories.push(categoryString);
    }
    // id`s
    let existsIndexId = this.multipleCategories.indexOf(this.registrationForm.value.categoryId);
    if (existsIndexId === -1) {
        this.multipleCategories.push(this.registrationForm.value.categoryId);
    }
    this.catString = this.multipleCategories.join();
  }
  // CHOOSE FILE
  readUrl(event: any, element: HTMLInputElement, img: HTMLInputElement) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          if (img.name == 'photo1') {
              this.photoUrl1 = event.target.result;
          } else {
            this.photoUrl2 = event.target.result;
          }
        };
        reader.readAsDataURL(event.target.files[0]);
        // checkvisibility
        this.visibility = !this.visibility;
  }
  // inputValue check
  this.selectedFile = event.target.files[0];
  }
    // CHOOSE FILE
  nextStep() {
      this.stepOne = false;
  }
  previousStep() {
      this.stepOne = true;
  }
  ngOnInit() {
    this.postsService.getallCategories().then((result) => {
      this.categories = result;
    });
    this.postsService.getallLocations().then((result) => {
      this.locations = result.response;
    });
    this.registrationForm = new FormGroup(
          {
          'name': new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z_а-яА-Я]{3,20}$')
          ]),
          'lastName': new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z_а-яА-Я]{3,20}$')
          ]),
          'email': new FormControl('', [
            Validators.required,
            Validators.pattern('[a-zA-Z_0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')
          ]),
          'tel': new FormControl('', [
            Validators.required,
            Validators.pattern('380[0-9]{9}')
            //  Validators.pattern('[0-9]{3}[0-9]{9}') - чекни
          ]),
          'password': new FormControl('', [
              Validators.required,
              Validators.pattern(/^(?=.*\d)(?=.*[A-Za-z]).{11,}$/),
          ]),
          'city': new FormControl('', Validators.required),
          'categoryId': new FormControl('', Validators.required),
          'photo': new FormControl('', Validators.required)
          });
  }
  registerUser() {
    const input = new FormData();
    input.append('name', this.registrationForm.value.name);
    input.append('lastName', this.registrationForm.value.lastName);
    input.append('email', this.registrationForm.value.email);
    input.append('tel', this.registrationForm.value.tel);
    input.append('password', this.registrationForm.value.password);
    input.append('locationId', this.registrationForm.value.city);
    input.append('avatar', this.selectedFile, this.selectedFile.name);
    input.append('categoryId', this.catString);
    // CHANGE TO FORM DATA
    this.authService.registerUser(input).then(() => {
        this.router.navigate(['/posts']);
    }).catch(err => {
        let error = err.json().response;
        const activePopUp = this.modalService.open(ActionResultNotificatorPopUpComponent);
        activePopUp.componentInstance.succes = false;
        activePopUp.componentInstance.message = error;
    });
  }
}
