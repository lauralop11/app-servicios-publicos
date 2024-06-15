let total_bill;
let days_bill ;
let recibo = document.getElementById('selectRecibos');
let value_bill_day;
let total_diaria_inquilino;
let inputInq;

const textinfo = document.getElementById('total_diario');
let acordeon;
let titleAcordeon;
let contenedorInfo;

const aptos = [
    {
    apto: 101,
    inquilinos: [
      {nom:'Pablo',days:days_bill || null, apto:101},
      {nom:'Juan',days:days_bill || null, apto:101},
    ],
    total_dias_apto:0,
    total_factura_apto:0,
  },
  {
    apto: 102,
    inquilinos: [
      {nom:'Carmen',days:days_bill || null, apto:102},
      {nom:'Lorena',days:days_bill || null, apto:102},
      {nom:'Laura',days:days_bill || null, apto:102}
    ],
    total_dias_apto:0,
    total_factura_apto:0,
  },
  {
    apto: 201,
    inquilinos: [
      {nom:'inquilino1',days:days_bill || null, apto:201},
      {nom:'inquilino2',days:days_bill || null, apto:201},
      {nom:'inquilino3',days:days_bill || null, apto:201}
    ],
    total_dias_apto:0,
    total_factura_apto:0,
  },
  {
    apto: 301,
    inquilinos: [
      {nom:'Lucy',days:days_bill || null, apto:301},
      {nom:'Augus',days:days_bill || null, apto:301},
    ],
    total_dias_apto:0,
    total_factura_apto:0,
  },
  {
    apto: 302,
    inquilinos: [
      {nom:'Daniel',days:days_bill || null, apto:302},
      {nom:'Maria',days:days_bill || null, apto:302},
      {nom:'Omaira',days:days_bill || null, apto:302}
    ],
    total_dias_apto:0,
    total_factura_apto:0,
  },
];

// funcion para mostrar informacion por apartamento
function init() {
  textinfo.innerHTML = " ";
  let i;
  
  if (recibo.value == 'agua'){
    i = 0;
  } else {
    i = 1;
  }

  for (i ; i < aptos.length; i++){

    acordeon = document.createElement('div'); // collapse
    inputcheck = document.createElement ('input');
    titleAcordeon = document.createElement('div'); // collapse-title
    avatarAcordeon = document.createElement('img');
    contenedorInfo = document.createElement('div'); // collapse-content

    acordeon.classList.add ('collapse', 'collapse-arrow', 'bg-base-200', 'my-3');
    inputcheck.setAttribute('type', 'radio');
    inputcheck.setAttribute('name', 'accordion');

    titleAcordeon.classList.add('collapse-title', 'text-xl', 'font-medium');
    titleAcordeon.innerText =  `Informacion ${aptos[i].apto}`;

    avatarAcordeon.setAttribute('src','./img/house.png');

    contenedorInfo.classList.add( 'collapse-content');
    contenedorInfo.setAttribute ('id',`${aptos[i].apto}` )

    titleAcordeon.appendChild(avatarAcordeon);
    acordeon.appendChild(inputcheck);
    acordeon.appendChild(titleAcordeon);  
    
    for (let y=0; y < aptos[i].inquilinos.length; y++){ //creacion de cada inquilino en html

    const infoInq = document.createElement('p');
    inputInq = document.createElement('input');
    infoInq.classList.add(`text-${y}`);
    inputInq.setAttribute('id', `${aptos[i].inquilinos[y].nom}`);
    inputInq.setAttribute('type', 'number');
    inputInq.setAttribute('min', '0');
    inputInq.classList.add('input-dias', 'w-14', 'm-2', 'border-2','input-bordered', 'rounded');

    infoInq.innerText = `${aptos[i].inquilinos[y].nom} dias a facturar`;

    infoInq.appendChild(inputInq);
    contenedorInfo.appendChild(infoInq);
    acordeon.appendChild(contenedorInfo);
    } 
    textinfo.appendChild(acordeon);
}
}
recibo.addEventListener('change',init);

function bill(){

  total_bill = Number(document.querySelector('#total_bill').value);
  days_bill = Number(document.querySelector('#days_bill').value);

//validacion que los inputs esten con valores
if (total_bill == 0 && days_bill == 0){
  
  document.querySelector('#total_bill').focus();
  document.querySelector('#days_bill').focus();
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Olvidaste ingresar el valor del recibo y los dias de la factura",
  });
  return;
}

  aptos.forEach((apto,i) => { //poner los dias de la factura en el valor dle input
    if (i > 0 || recibo.value == 'agua'){
      apto.inquilinos.forEach((inquilino) => {
      inquilino.days = days_bill;
      document.querySelector(`#${inquilino.nom}`).setAttribute('value', `${inquilino.days}`)
      })
    }
  })
  value_bill_day = total_bill/days_bill; //valor por dia del servicio publico 
  calcular(total_bill);
}

function calcular (totalFact) {
  //remover el texto existente
  document.querySelectorAll('.p-valor-fact').forEach((texto) => {
    texto.remove();
  })
  //sumatoria de los dias de todos los inquilinos
  let total_days_users = 0;

   aptos.forEach((apto) => {
     apto.total_dias_apto =0;
    apto.total_factura_apto = 0;
   })
 
  aptos.forEach((apto,i)=> {
    if (i > 0 || recibo.value == 'agua'){
      let infoDiasApto = document.createElement('p');
      infoDiasApto.classList.add('p-valor-fact');
   
      apto.inquilinos.forEach((inquilino)=>{ 
        total_days_users += inquilino.days;
        apto.total_dias_apto += inquilino.days;
      })
    let divApto = document.getElementById(`${apto.apto}`);
    
    infoDiasApto.innerText = `El apartamento ${apto.apto} tiene ${apto.total_dias_apto} como total de dias de consumo al mes`;
    divApto.appendChild(infoDiasApto);
    }
   
  }) 

 total_diaria_inquilino = totalFact/ total_days_users;

  aptos.forEach((apto,i) => {
    if (i > 0 || recibo.value == 'agua'){
      apto.total_factura_apto = parseInt( total_diaria_inquilino * apto.total_dias_apto)
      let infoDiasApto = document.createElement('p');
      infoDiasApto.classList.add('p-valor-fact');
      let divApto = document.getElementById(`${apto.apto}`);
      let monedaFact = (new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0}).format(
        apto.total_factura_apto,
      ))
      infoDiasApto.innerText = `El apartamento ${apto.apto} debe pagar ${monedaFact} por el recibo de este mes.`;
      divApto.appendChild(infoDiasApto);
      }
    
      
  })
    
}


 function modificar (){

  aptos.forEach((apto,i) => { //poner los dias de la factura en el valor dle input
    if (i > 0 || recibo.value == 'agua'){
      apto.inquilinos.forEach((inquilino) =>{
      const inputValue = document.querySelector(`#${inquilino.nom}`).value;
      inquilino.days = Number(inputValue);
    })
    }
    
  })

  calcular(total_bill);
 
 } 


//inquilinos.push({nom:'Pablo', days:31, apto:102});//agregar un nuevo inquilino


