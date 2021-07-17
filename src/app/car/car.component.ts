import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

export class Car {
  constructor(
    public id: number,
    public color: string,
    public year: number,
    public marque: string,
    public model: string
  ) {
  }
}

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars!: Car[];
  closeResult!: String;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.httpClient.get<any>('http://localhost:8080/cars').subscribe(
      response => {
        console.log(response);
        this.cars = response;
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/cars/addnew';
    this.httpClient.post(url, f.value)
      .subscribe(() => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal: any, car: Car) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
    });
    document.getElementById('color_d')!.setAttribute('value', car.color);
    document.getElementById('year_d')!.setAttribute('value', car.year.toString());
    document.getElementById('marque_d')!.setAttribute('value', car.marque);
    document.getElementById('model_d')!.setAttribute('value', car.model);
  }
}
