import { AfterViewInit, Component } from "@angular/core";



@Component({
    selector: 'app-mapNew',
    templateUrl: './mapNew.component.html',
    styleUrls: ['./mapNew.component.css']
})

export class MapNewComponent implements AfterViewInit {
    ngAfterViewInit(): void {
      throw new Error("Method not implemented.");
    }
    private map;

 /* private initMap(): void {
    this.map = L.map('map', {
      center: [ 4.60971, -74.08175 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 5,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
  
      tiles.addTo(this.map);
 
      
      var marker = L.marker([4.630437825831916, -74.11127238650617]).addTo(this.map);
      marker.bindPopup("<b>Mi ubicación ¡ESTOY AQUI EN WODEN!</b>");
  }


    constructor() { }
  
    ngAfterViewInit(): void { 

        this.initMap();

    }
  */




  }