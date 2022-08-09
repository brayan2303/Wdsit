import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { InvCardService } from '../../services/invCard.service';

@Component({
    selector: 'modal-cyclicSigned',
    templateUrl: 'cyclicSigned.modal.html',
    styleUrls: ['./cyclicSigned.modal.css']
})
export class CyclicSignedModal implements OnInit {
    isEmpty:boolean;
    constructor(private invCardS:InvCardService,private alertS:AlertService,public dialogRef: MatDialogRef<CyclicSignedModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.isEmpty=false;
    }
    ngOnInit(): void {
        var canvas = document.getElementById("canvas") as HTMLCanvasElement;
        var limpiar=document.getElementById("limpiar")as HTMLButtonElement;
        var ctx = canvas.getContext("2d");
        var cw = canvas.width = 450;
        var ch = canvas.height = 200;
        if(this.data.bytes!=''){
            var image=new Image();
            image.src=this.data.bytes;
            ctx.drawImage(image,0,0);
        }
        var dibujar = false;
        var factorDeAlisamiento = 3;
        var Trazados = [];
        var puntos = [];
        ctx.lineJoin = "round";

        limpiar.addEventListener('click', ()=> {
            dibujar = false;
            ctx.clearRect(0, 0, cw, ch);
            Trazados.length = 0;
            puntos.length = 0;
            this.isEmpty=true;
        }, false);

        canvas.addEventListener('mousedown', ()=> {
            dibujar = true;
            //ctx.clearRect(0, 0, cw, ch);
            puntos.length = 0;
            ctx.beginPath();
            this.isEmpty=false;
        }, false);

        canvas.addEventListener('mouseup', ()=> {
            redibujarTrazados();
        }, false);

        /*canvas.addEventListener("mouseout", function (evt) {
            redibujarTrazados();
        }, false);*/

        canvas.addEventListener("mousemove", (evt)=> {
            if (dibujar) {
                var m = oMousePos(canvas, evt);
                puntos.push(m);
                ctx.lineTo(m.x, m.y);
                ctx.lineWidth=3;
                ctx.stroke();
            }
        }, false);
        function reducirArray(n, elArray) {
            var nuevoArray = [];
            nuevoArray[0] = elArray[0];
            for (var i = 0; i < elArray.length; i++) {
                if (i % n == 0) {
                    nuevoArray[nuevoArray.length] = elArray[i];
                }
            }
            nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];
            Trazados.push(nuevoArray);
        }
        function calcularPuntoDeControl(ry, a, b) {
            var pc: any = {}
            pc.x = (ry[a].x + ry[b].x) / 2;
            pc.y = (ry[a].y + ry[b].y) / 2;
            return pc;
        }
        function alisarTrazado(ry) {
            if (ry.length > 1) {
                var ultimoPunto = ry.length - 1;
                ctx.beginPath();
                ctx.moveTo(ry[0].x, ry[0].y);
                for (var i = 1; i < ry.length - 2; i++) {
                    var pc = calcularPuntoDeControl(ry, i, i + 1);
                    ctx.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y);
                }
                ctx.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);
                ctx.stroke();
            }
        }
        function redibujarTrazados() {
            dibujar = false;
            ctx.clearRect(0, 0, cw, ch);
            reducirArray(factorDeAlisamiento, puntos);
            for (var i = 0; i < Trazados.length; i++)
                alisarTrazado(Trazados[i]);
        }
        function oMousePos(canvas, evt) {
            var ClientRect = canvas.getBoundingClientRect();
            return { //objeto
                x: Math.round(evt.clientX - ClientRect.left),
                y: Math.round(evt.clientY - ClientRect.top)
            }
        }
    }
    save() {
        var canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.invCardS.sign(this.data.cardId,this.data.signed,this.isEmpty?'':canvas.toDataURL('image/png', 1.0)).subscribe(resS=>{
            if(resS.message==='OK'){
                if(resS.object!=0){
                    this.alertS.open(this.isEmpty?'Firma eliminada!':'Tarjeta firmada!','success');
                    this.close();
                }else{
                    this.alertS.open('Error cargando firma!','error');
                }
            }else{
                this.alertS.open(resS.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
}