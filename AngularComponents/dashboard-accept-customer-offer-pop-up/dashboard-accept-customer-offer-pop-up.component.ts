import { Component, OnInit , Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service'
@Component({
  selector: 'app-dashboard-accept-customer-offer-pop-up',
  templateUrl: './dashboard-accept-customer-offer-pop-up.component.html',
  styleUrls: ['./dashboard-accept-customer-offer-pop-up.component.sass']
})
export class DashboardAcceptCustomerOfferPopUpComponent implements OnInit {
  id : any;
  refresh : Function;
  constructor(public activeModal: NgbActiveModal, private employeeService : EmployeeService, private authService: AuthService) { }

  ngOnInit() {
  }
  acceptRequest(id) {
    this.employeeService.acceptRequest({postId: id}).then((result) => {
    })
    .catch(err => {
        let error = err;
    });
    this.refresh();
    this.activeModal.close();

  }
}
