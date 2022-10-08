import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Coffee } from '../../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { productList } from '../../state/product.actions';
import { map } from 'rxjs/operators';
import { CoffeService } from 'src/app/services/coffe.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,AfterViewChecked {

  private _coffees:Coffee[] = []; 
  lengthPaginator:number = 0; 
  itemSize:number = 10;
  pageSizeOptions:number[]= [];
  coffePagination:Coffee[] = []; 

  currentPage:number = 0; 
  
  get coffees():Coffee[]{
    return [...this._coffees];
  }

  constructor( private coffeService:CoffeService,
               private store:Store) { 

                this.getCoffees();
               }
  
  
  ngAfterViewChecked():void{
    this.addActiveClass(this.currentPage+1);
  }

  ngOnInit(): void {  

    
  }

  getCoffees(){
    this.coffeService.getCoffees()
                  // .subscribe(coffees => {
                  //   this.store.dispatch( productList( { coffees, pageNumber:this.currentPage } ) )
                  // });
                   .pipe(
                      map(coffees => {
                        
                        this.store.dispatch( productList( { coffees, pageNumber:this.currentPage } ) )
                        return coffees;
                      })
                  )
                  .subscribe( coffees => {
                    this._coffees = coffees
                    this.lengthPaginator = (coffees.length / 10);               
                    this.paginator();
                    this.coffeService.setCoffees(this.coffees);
                    
                    })
  }

  paginator(){
    for(let i = 0; i<this.lengthPaginator; i++){
      this.pageSizeOptions.push(i+1); 

    }
    this.coffePagination = this.coffees.slice(0,10);
    this.readCurrentPage();
    
  }

  handlePage( pageNumber:number ){

    this.currentPage = pageNumber; 
    
    if( this.currentPage === 0 ){
      this.coffePagination = this.coffees.slice(0,10);
    }else{
      this.coffePagination = this.coffees.slice(pageNumber*this.itemSize,((pageNumber*this.itemSize)+10));
    }

    this.saveCurrentPage();

  }

  saveCurrentPage(){
    localStorage.removeItem('page'); 
    localStorage.setItem('page',(this.currentPage).toString());
  }

  readCurrentPage(){

    if( !localStorage.getItem('page')){return; } 

    let pageNumber = parseInt(localStorage.getItem('page')!); 
    this.currentPage = pageNumber; 
    this.handlePage(pageNumber);
  }

  addActiveClass(pageNumber:number){

    const numberPages = document.querySelectorAll('.page-link');

    numberPages.forEach( a => {
       
      if( a.classList.contains('active') ){
        a.classList.remove('active');
      }

      if( parseInt(a.innerHTML) === pageNumber ){
        a.classList.add('active'); 
      }
      
    })
    

  }


}
