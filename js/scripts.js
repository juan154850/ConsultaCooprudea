
const btnSend = document.getElementById('btnSend');
const ced = document.getElementById('fname');
const resulNombre = document.getElementById('resulNombre');
const resulGrupo = document.getElementById('resulGrupo');
const resulId = document.getElementById('resulID');
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
  let contadorParticipantes = 0; 
  let arrayParticipantes=[]; 
  let bandera = false;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) 
    { 
      textoLeido = xhttp.responseText;
      let contador=0; 
      let nombre="";
      let cedula="";
      let tel=""; 
      
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
            arrayParticipantes[contadorParticipantes] = new participante(nombre,"A",cedula,tel);
            contadorParticipantes++; 
            nombre="";
            cedula="";
            tel=""; 
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
      arrayParticipantes[contadorParticipantes] = new participante(nombre,"A",cedula,tel); 
      bandera = false;
      for(let i in arrayParticipantes){
        if(arrayParticipantes[i].cc == ced.value){
            bandera = true;
            /*contenido.innerHTML = `Nombre:   <b>${arrayParticipantes[i].nombre}</b> <br>
            Grupo: <b>${arrayParticipantes[i].grupo}</b><br>
            ID en el Juego: <b>${arrayParticipantes[i].id}</b><br>`;*/
            resulNombre.textContent = arrayParticipantes[i].nombre;
            resulGrupo.textContent = arrayParticipantes[i].grupo;
            resulId.textContent = arrayParticipantes[i].id;
            break
        }
        }
      if(bandera==false){
        resulNombre.textContent = "NA";
        resulGrupo.textContent = "NA";
        resulId.textContent = "NA";
        alert(`No se encontró un participante con CC: ${ced.value}`); 
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


