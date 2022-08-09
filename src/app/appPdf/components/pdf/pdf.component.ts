import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


 
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',

})
 
export class AppComponent {
 
  titulo = 'Generar PDF con Angular JS 5';
  var1 = 'df456s4f65465';
  var2 = 'El equipo es Scrap';
  var3 = 'Scrap';
  var4 = '2021-07-21';
 
  	generarPDF(){
	    html2canvas(document.getElementById('contenido'), {
        allowTaint: true,
        useCORS: false,
        scale: 1
      }).then(function(canvas) {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF();
        doc.addImage(img,'PNG',7, 20, 195, 105);
        doc.save('Reporte.pdf');
    });
  	}
 
}