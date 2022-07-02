import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  @ViewChild('select') select:ElementRef
  askHelpForm:FormGroup
  points=0
  showOther=false
  TypeOfServes=' '
  price=0
  showPrice=false
  latitude = 51.678418;
  longitude = 7.809007;
  cond=false
  des=false
  onelocation=''
  ss(onelocationn) {
    this.onelocation=onelocationn
  }
  chooseLocation(event) {
    console.log(event?.coords?.latitude,event?.coords?.longitude)
    this.latitude=event?.coords?.latitude
    this.longitude=event?.coords?.longitude
    this.cond=true
    alert(this.latitude)
  }
  onPaid(value) {
    if(value=='free') {
      this.price=0
      this.showPrice=false
    } else {
      this.showPrice=true
    }
  }
  onselectchange(select) {
    if(select=='Help Me') {
      this.points=3
      this.TypeOfServes='Help Me'
      console.log(this.TypeOfServes)
      this.showOther=false
    }
    else if(select=='Delivery') {
      this.points=10
      this.showOther=false
      this.TypeOfServes='Delivery'
    }
    else if(select=='Home') {
      this.points=5
      this.showOther=false 
      this.TypeOfServes='Home'
    }
    else if(select=='Nursing') {
      this.points=9
      this.showOther=false 
      this.TypeOfServes='Nursing'
    }
    else if(select=='Disabled Assistant') {
      this.points=13
      this.showOther=false 
      this.TypeOfServes='Disabled Assistant'
    }
    else if(select=='Elderly') {
      this.points=11
      this.showOther=false 
      this.TypeOfServes='Elderly'
    }
    else if(select=='WASALNY') {
      this.points=7
      this.showOther=false 
      this.TypeOfServes='WASALNY'
    }

    else if(select=='other') {
      this.showOther=true
      this.points=15
      
    }
  }
  one
  two
  constructor(private fb:FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,
    public authService:AuthService,
    private http:HttpClient) { }
    askHelpp:any=[]
    getloc(one,two,three){
      this.one = one
      this.two=two
      this.openModal(three)
    }
  ngOnInit() {  
    this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;
  });
    this.returnAskHelpForm()
      this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetNotDoneForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
  ).subscribe(
    res => {
      console.log(res,"zzzzzzz")
      this.askHelpp=res
    } , err => {
      console.log(err)
    }
  )
  }
  
  deleteHelp(id) {
    this.http.delete(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/Delete/${id }`
    ).subscribe(
      res => {
        this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetNotDoneForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
        ).subscribe(
          res => {
            console.log(res,"zzzzzzz")
            this.askHelpp=res
          } , err => {
            console.log(err)
          }
        )
      } , err => {
        console.log(err)
      }
    )
  }
returnAskHelpForm() {
  return this.askHelpForm=this.fb.group({
    TypeOfServes:  [''],
    Time:  [''],
    Phone:[''],
    Date:  [''],
    Describtion:  ['']
  })
}

modalRef?: BsModalRef;

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
helpid=0
askHelp(value) {
  console.log('this.helpid',this.helpid)
  if(this.showOther) this.points=15
  if(this.helpid>0) {
    this.http.put(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/Update`,{...value,Points:this.points,IsDone:false,
    Longitude:this.longitude,
    Latitude: this.latitude,
    Zoom:0,
    Accepte:false,
    Price:this.price,
    UserId:JSON.parse(localStorage.getItem('user')).Id,Id:this.helpid,TypeOfServes:this.TypeOfServes}
    ).subscribe(
      res => {
        console.log(res)
        this.askHelpForm.reset()
        this.points=0
        this.showOther=false
        this.TypeOfServes=' '
        this.price=0
        this.showPrice=false
        this.select.nativeElement.value=''
        this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetNotDoneForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
        ).subscribe(
          res => {
            console.log(res,"z")
            this.askHelpp=res
          } , err => {
            console.log(err)
          }
        )
      } , err => {
        console.log(err)
      }
    )
  } else {
    this.http.post(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/Insert`,{...value,Points:this.points,IsDone:false,
    Longitude:this.longitude,
    Latitude: this.latitude,
    Zoom:0,
    Accepte:false,
    Price:this.price,
    UserId:  JSON.parse(localStorage.getItem('user')).Id,
    Id:0,TypeOfServes:this.TypeOfServes}
    ).subscribe(
      res => {
        console.log('test location')
        console.log(res)
        this.askHelpForm.reset()
        this.askHelpForm.reset()
        this.points=0
        this.showOther=false
        this.TypeOfServes=' '
        this.price=0
        this.showPrice=false
        this.select.nativeElement.value=''
        this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetNotDoneForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
        ).subscribe(
          res => {
            console.log(res,"zzzzzzz")
            this.askHelpp=res
          } , err => {
            console.log(err)
          }
        )
      } , err => {
        console.log(err)
      }
    )
  }
}
updateHelp(id,item,el) {
  this.helpid=id
  this.TypeOfServes=item.TypeOfServes
  this.latitude=item.Latitude  
  this.longitude=item.Longitude
  this.askHelpForm.patchValue(item)
  el.scrollIntoView();
}
blureTypeofservice(typeofservice) {
  this.TypeOfServes=typeofservice.value
  this.points=15
  console.log(this.TypeOfServes)
}
blurePrice(price) {
  this.price=Number(price.value)
  console.log(this.TypeOfServes)
}
blurePoints(pointssss) {
  this.points=pointssss.value
  console.log(this.points)
}

zoom: number;
address: string;
private geoCoder;

@ViewChild('search')
public searchElementRef: ElementRef;





private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}

getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { latitude: latitude, longitude: longitude } }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  
  });
}

}