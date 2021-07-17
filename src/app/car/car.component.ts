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
}
