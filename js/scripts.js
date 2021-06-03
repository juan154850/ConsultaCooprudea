
const btnSend = document.getElementById('btnSend');
const ced = document.getElementById('fname');
const resulNombre = document.getElementById('resulNombre');
const resulGrupo = document.getElementById('resulGrupo');
const resulId = document.getElementById('resulID');
const resultParticipante1 = document.getElementById('participante1');
const resultParticipante2 = document.getElementById('participante2');
const resultParticipante3 = document.getElementById('participante3');
const resultParticipante4 = document.getElementById('participante4');
const resultNick1 = document.getElementById('nick1');
const resultNick2 = document.getElementById('nick2');
const resultNick3 = document.getElementById('nick3');
const resultNick4 = document.getElementById('nick4');
function limpiarDocumento(){
  resultParticipante1.textContent = "NA";
  resultParticipante2.textContent = "NA";
  resultParticipante3.textContent = "NA";
  resultParticipante4.textContent = "NA";
  resultNick1.textContent = "NA";
  resultNick2.textContent = "NA";
  resultNick3.textContent = "NA";
  resultNick4.textContent = "NA";
}
limpiarDocumento();

let textoLeido;
class participante 
{
    constructor(nombre, grupo, cc, id) 
    {
      this.nombre = nombre;
      this.grupo = grupo;
      this.cc = cc;
      this.id = id
    }
  }
//función para leer documentos de texto con AJAX,
function loadDoc() 
{
  limpiarDocumento();
  let contadorParticipantes = 0; 
  let arrayParticipantes=[]; 
  let bandera = false;
  let contadorLugarDiv = 1; 
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) 
    { 
      textoLeido = xhttp.responseText;
      let contador=0; 
      //let contadorGrupos=0; 
      let nombre="";
      let cedula="";
      let tel=""; 
      let nickName = "Desconocido";
      //let inicialGrupo = 1; 
      
      for ( let i in textoLeido)
      {
        if(textoLeido[i] == '|'){
          contador++; 
          if(contador==3){
            contador=0;       
            /*console.log(nombre);
            console.log(cedula);
            console.log(tel);
            console.log(contador);*/
            arrayParticipantes[contadorParticipantes] = new participante(nombre,tel,cedula,nickName);
            contadorParticipantes++; 
            nombre="";
            cedula="";
            tel=""; 
            //contadorGrupos++;
            /*if(contadorGrupos==4 ){
              inicialGrupo++;   
              contadorGrupos=0;
            }*/
            
          }
          continue;
        }
        else{
          if(contador==0){
            nombre+=textoLeido[i];
          }
          else if(contador==1){
            cedula+=textoLeido[i];
          }
          else if(contador==2){
            tel += textoLeido[i];
          }
        }
      }
      /*console.log(nombre);
      console.log(cedula);
      console.log(tel);*/
      arrayParticipantes[contadorParticipantes] = new participante(nombre,tel,cedula,nickName); 
      bandera = false;
      for(let i in arrayParticipantes){
        if(arrayParticipantes[i].cc == ced.value){
            bandera = true;
            /*contenido.innerHTML = `Nombre:   <b>${arrayParticipantes[i].nombre}</b> <br>
            Grupo: <b>${arrayParticipantes[i].grupo}</b><br>
            ID en el Juego: <b>${arrayParticipantes[i].id}</b><br>`;*/
            resulNombre.textContent = arrayParticipantes[i].nombre;
            resulGrupo.textContent = arrayParticipantes[i].grupo;
            resulId.textContent = arrayParticipantes[i].id; //este va a ser el nombre dentro del juego
            break
        }
        }
      for(let i in arrayParticipantes){
        if((arrayParticipantes[i].grupo == resulGrupo.textContent) && (contadorLugarDiv==1)){
          resultParticipante1.textContent  = arrayParticipantes[i].nombre;
          resultNick1.textContent = arrayParticipantes[i].id;
          contadorLugarDiv++;
          continue;
        }
        if((arrayParticipantes[i].grupo == resulGrupo.textContent) && (contadorLugarDiv==2)){
          resultParticipante2.textContent  = arrayParticipantes[i].nombre;
          resultNick2.textContent = arrayParticipantes[i].id;
          contadorLugarDiv++;
          continue;
        }
        if((arrayParticipantes[i].grupo == resulGrupo.textContent) && (contadorLugarDiv==3)){
          resultParticipante3.textContent  = arrayParticipantes[i].nombre;
          resultNick3.textContent = arrayParticipantes[i].id;
          contadorLugarDiv++;
          continue;
        }
        if((arrayParticipantes[i].grupo == resulGrupo.textContent) && (contadorLugarDiv==4)){
          resultParticipante4.textContent  = arrayParticipantes[i].nombre;
          resultNick4.textContent = arrayParticipantes[i].id;
          contadorLugarDiv++;
          continue
        }
      }
      if(bandera==false){
        resulNombre.textContent = "NA";
        resulGrupo.textContent = "NA";
        resulId.textContent = "NA";
        alert(`No se encontró un participante con CC: ${ced.value}`); 
        limpiarDocumento();
      }
    }
  };
  xhttp.open("GET", "js/ajax_info.txt", true);
  xhttp.send();
}
btnSend.addEventListener("click" , () =>
{
  loadDoc();
});


