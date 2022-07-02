export class NotificationModel{
    Id?: number;
    NotificationMasseg?: string;
    UrlMobile?: string;
    UrlWeb?: string;
    AskeId?: number;
    VolunteerId?: number;
    IsView?: boolean;
    constructor(item ?: NotificationModel){
        item = item ? item : {};
        this.Id = item.Id ? item.Id : 0;
        this.NotificationMasseg = item.NotificationMasseg ? item.NotificationMasseg : '';
        this.UrlMobile = item.UrlMobile ? item.UrlMobile : '';
        this.AskeId = item.AskeId ? item.AskeId : 0 ;
        this.IsView = item.IsView ? item.IsView : false;
        this.UrlWeb = item.UrlWeb ? item.UrlWeb : '';
        this.VolunteerId = item.VolunteerId ? item.VolunteerId : 0;
    }
}