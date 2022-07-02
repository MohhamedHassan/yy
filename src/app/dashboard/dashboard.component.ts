import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import * as Chartist from 'chartist';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  askHelp
  totalPoints=0
  analytics=[
    {
      name:'Home Service',
      points:0
    },
    {
      name:'Delivery Service',
      points:0
    },
    {
      name:'Nursing Service',
      points:0
    },
    {
      name:'Help Me Service',
      points:0
    },
    {
      name:'Disabled Assistant',
      points:0
    },
    {
      name:'Elderly Service',
      points:0
    },
    {
      name:'WASALNY Service',
      points:0
    },
    {
      name:'Other Service',
      points:0
    },
  ]
  constructor(private http:HttpClient,
    public authService:AuthService) { }
  // showNotification(from, align){
  //     const type = ['','info','success','warning','danger'];

  //     const color = Math.floor((Math.random() * 4) + 1);

  //     $.notify({
  //         icon: "notifications",
  //         message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

  //     },{
  //         type: type[color],
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
  //           '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
  //           '<i class="material-icons" data-notify="icon">notifications</i> ' +
  //           '<span data-notify="title">{1}</span> ' +
  //           '<span data-notify="message">{2}</span>' +
  //           '<div class="progress" data-notify="progressbar">' +
  //             '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  //           '</div>' +
  //           '<a href="{3}" target="{4}" data-notify="url"></a>' +
  //         '</div>'
  //     });
  // }
  ngOnInit() {
    if(this.authService.type=='Volunteer') {
      this.http.get(`${environment.apiUrl}AskeHelp/GetDoneForVolunteer/${JSON.parse(localStorage.getItem('user')).Id }`
      ).subscribe(
        res => {
          console.log(res,"newwwww")
          this.askHelp=res
          for (let i = 0 ; i < this.askHelp.length;i++) {
           if(this.askHelp[i].TypeOfServes=='Delivery') {
             this.totalPoints+=10
            this.analytics[1].points+=10
            
           }
           else if(this.askHelp[i].TypeOfServes=='Home') {
             this.totalPoints+=5
             this.analytics[0].points+=5
  
           }
           else if(this.askHelp[i].TypeOfServes=='Nursing'){
             this.totalPoints+=9
             this.analytics[2].points+=9
           }
           else if(this.askHelp[i].TypeOfServes=='Help Me') {
             this.totalPoints+=3
             this.analytics[3].points+=3
           }
           else if(this.askHelp[i].TypeOfServes=='Disabled Assistant') {
             this.totalPoints+=13
             this.analytics[4].points+=13
           }
           else if(this.askHelp[i].TypeOfServes=='Elderly') {
             this.totalPoints+=11
             this.analytics[5].points+=11
           }
           else if(this.askHelp[i].TypeOfServes=='WASALNY') {
            this.totalPoints+=14
            this.analytics[6].points+=14
          }
           else  {
             this.totalPoints+=15
             this.analytics[7].points+=15
           }
         }
         console.log('na',this.analytics)
        } , err => {
          console.log(err)
        }
      ) 
    } else {
      this.http.get(`${environment.apiUrl}AskeHelp/GetDoneForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
      ).subscribe(
        res => {
          console.log(res,"newwwww")
          this.askHelp=res
          for (let i = 0 ; i < this.askHelp.length;i++) {
           if(this.askHelp[i].TypeOfServes=='Delivery') {
            this.analytics[1].points+=1
            
           }
           else if(this.askHelp[i].TypeOfServes=='Home') {
             this.analytics[0].points+=1
  
           }
           else if(this.askHelp[i].TypeOfServes=='Nursing'){
             this.analytics[2].points+=1
           }
           else if(this.askHelp[i].TypeOfServes=='Help Me') {
             this.analytics[3].points+=1
           }
           else if(this.askHelp[i].TypeOfServes=='Disabled Assistant') {
             this.analytics[4].points+=1
           }
           else if(this.askHelp[i].TypeOfServes=='Elderly') {
             this.analytics[5].points+=1
           }
           else if(this.askHelp[i].TypeOfServes=='WASALNY') {
            this.analytics[6].points+=1
          }
           else  {
             this.analytics[7].points+=1
           }
         }
         console.log('na',this.analytics)
        } , err => {
          console.log(err)
        }
      ) 
    }
 
  }
  // doneHelp(Id) {
  //   this.http.put(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/Done/${Id}`,{}).subscribe(
  //     (res:any) => {
  //       console.log(res,'delete')
  //       this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetNotDone`).subscribe(
  //         (res:any) => {
  //           console.log(res,'zzz')
  //           this.askHelp=res
  //           this.authservice.notifications=res
  //         } , err => {
  //           console.log(err)
  //         }
  //       )
  //     } , err => {
  //       console.log(err)
  //     }
  //   )
  // }

  // constructor() { }
  // startAnimationForLineChart(chart){
  //     let seq: any, delays: any, durations: any;
  //     seq = 0;
  //     delays = 80;
  //     durations = 500;

  //     chart.on('draw', function(data) {
  //       if(data.type === 'line' || data.type === 'area') {
  //         data.element.animate({
  //           d: {
  //             begin: 600,
  //             dur: 700,
  //             from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //             to: data.path.clone().stringify(),
  //             easing: Chartist.Svg.Easing.easeOutQuint
  //           }
  //         });
  //       } else if(data.type === 'point') {
  //             seq++;
  //             data.element.animate({
  //               opacity: {
  //                 begin: seq * delays,
  //                 dur: durations,
  //                 from: 0,
  //                 to: 1,
  //                 easing: 'ease'
  //               }
  //             });
  //         }
  //     });

  //     seq = 0;
  // };
  // startAnimationForBarChart(chart){
  //     let seq2: any, delays2: any, durations2: any;

  //     seq2 = 0;
  //     delays2 = 80;
  //     durations2 = 500;
  //     chart.on('draw', function(data) {
  //       if(data.type === 'bar'){
  //           seq2++;
  //           data.element.animate({
  //             opacity: {
  //               begin: seq2 * delays2,
  //               dur: durations2,
  //               from: 0,
  //               to: 1,
  //               easing: 'ease'
  //             }
  //           });
  //       }
  //     });

  //     seq2 = 0;
  // };
  // ngOnInit() {
  //     /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  //     const dataDailySalesChart: any = {
  //         labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  //         series: [
  //             [12, 17, 7, 17, 23, 18, 38]
  //         ]
  //     };

  //    const optionsDailySalesChart: any = {
  //         lineSmooth: Chartist.Interpolation.cardinal({
  //             tension: 0
  //         }),
  //         low: 0,
  //         high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
  //         chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  //     }

  //     var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

  //     this.startAnimationForLineChart(dailySalesChart);


  //     /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

  //     const dataCompletedTasksChart: any = {
  //         labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
  //         series: [
  //             [230, 750, 450, 300, 280, 240, 200, 190]
  //         ]
  //     };

  //    const optionsCompletedTasksChart: any = {
  //         lineSmooth: Chartist.Interpolation.cardinal({
  //             tension: 0
  //         }),
  //         low: 0,
  //         high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
  //         chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
  //     }

  //     var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

  //     // start animation for the Completed Tasks Chart - Line Chart
  //     this.startAnimationForLineChart(completedTasksChart);



  //     /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

  //     var datawebsiteViewsChart = {
  //       labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  //       series: [
  //         [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

  //       ]
  //     };
  //     var optionswebsiteViewsChart = {
  //         axisX: {
  //             showGrid: false
  //         },
  //         low: 0,
  //         high: 1000,
  //         chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
  //     };
  //     var responsiveOptions: any[] = [
  //       ['screen and (max-width: 640px)', {
  //         seriesBarDistance: 5,
  //         axisX: {
  //           labelInterpolationFnc: function (value) {
  //             return value[0];
  //           }
  //         }
  //       }]
  //     ];
  //     var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

  //     //start animation for the Emails Subscription Chart
  //     this.startAnimationForBarChart(websiteViewsChart);
  // }

}
