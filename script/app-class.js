const textInfo = document.getElementById('total_diario');
let days_bill ;
let total_bill;
let aptos=[];

class Apto {
  constructor (num,diasApto,facturaApto,inquilino){
    this.numApto = num;
    this.total_dias_apto = diasApto;
    this.total_factura_apto = facturaApto;
    this.inquilino = [];
  }
}
class Inquilino {
  constructor ( nomInquilino, dia){
    this.nomInquilino = nomInquilino;
    this.dia = dia || null;
  }
}
let lucy = new Inquilino ('Lucy',days_bill);
let augus = new Inquilino ('Augus',days_bill)
let apto301 = new Apto ( 301);
apto301.inquilino.push(lucy, augus);
aptos.push(apto301);
console.log(aptos);


function bill(){
  days_bill = Number(document.getElementById('days_bill').value);
  total_bill = Number(document.querySelector('#total_bill').value);
  
  apto301.inquilino.forEach(inquilino => {
    inquilino.dia = days_bill;
  });
  

}