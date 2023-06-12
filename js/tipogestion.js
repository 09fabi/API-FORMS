//--ACTUALIZAR TIPO DE GESTION--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Consultar datos del tipo gestion.
function consultarDatosTipoGestion(id_tipo_gestion){
  var requestOptions ={
    method:'GET',
    redirect: 'follow'
  };
  fetch("http://159.223.103.211/api/tipo_gestion/"+id_tipo_gestion, requestOptions)
  .then (response => response.json())
  .then ((json)=> json.forEach(completarFormulario))
  .catch (error => console.log('error',error));
}

//Completar formulario.
function completarFormulario(element){
  var nombre_tipo_gestion = element.nombre_tipo_gestion;

  document.getElementById("txt_nombre_tipo_gestion").value = nombre_tipo_gestion;
}


//Obtenemos los datos del tipo gestión a actualizar.
function obtenerIDTipoGestionActualizar() {
  var queryString = window.location.search;
  var urlParametros = new URLSearchParams(queryString);
  var id_tipo_gestion_url = urlParametros.get('id');

  document.getElementById("txt_id_tipo_gestion").value = id_tipo_gestion_url;
  consultarDatosUsuario(id_tipo_gestion_url);
}

//Actualizamos los datos del tipo gestión con el método patch.
function actualizarTipoGestion(event) {
  event.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var txt_id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
  var txt_nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

//Obtenemos la fecha actual 
  function obtenerFechaActual() {
      var fecha = new Date();
      var anio = fecha.getFullYear();
      var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      var dia = fecha.getDate().toString().padStart(2, '0');
      var horas = fecha.getHours().toString().padStart(2, '0');
      var minutos = fecha.getMinutes().toString().padStart(2, '0');
      var segundos = fecha.getSeconds().toString().padStart(2, '0');
      var fechaActual = anio + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;

      return fechaActual;
  }

  var fechaActual = obtenerFechaActual();

//Validamos las validaciones del tipo gestión a actualizar.
  if (txt_id_tipo_gestion.trim().length !== 8) {
    alert("La ID debe tener 8 caracteres o no se creará.");
    return;
}

if (txt_nombre_tipo_gestion.trim().length === 0) {
    alert("Debe agregar un nombre al tipo de gestión o no se creará.");
    return;
}

  var raw = JSON.stringify({
      "id_tipo_gestion": txt_id_tipo_gestion,
      "nombre_tipo_gestion": txt_nombre_tipo_gestion,
      "fecha_registro": fechaActual
  });

  var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/tipo_gestion/" + txt_id_tipo_gestion, requestOptions)
      .then(response => {
          if (response.ok) {
              alert("Tipo Gestion Actualizada");
              window.location.href = "listar-gestiones.html";
          }

      })
}


//--ELIMINAR TIPO GESTION-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Obtenemos id del tipo gestión a eliminar.
function obtenerIDTipoGestionEliminar() {
//Utilizamos search para acceder a las variables recibidas mediante URL.
  var queryString = window.location.search;
//Extraemos los parámetros.
  var urlParametros = new URLSearchParams(queryString);
//Creamos variable con el id del tipo gestión.
  var id_tipo_gestion_url = urlParametros.get('id');
  var nombre_tipo_gestion_url = urlParametros.get('nombre');
//Agregamos ID a campo oculto.
  document.getElementById('hdn_id_tipo_gestion').value = id_tipo_gestion_url;
//Mostramos mensaje de confirmación.
  var mensaje = "¿" + "Desea eliminar el tipo gestion " + nombre_tipo_gestion_url + " ?";
  document.getElementById("alt_eliminacion").innerHTML = mensaje;
}

//Creamos función para eliminar el tipo de gestión.
function eliminarTipoGestion() {
  
//Obtenemos id a eliminar
  var id_tipo_gestion_eliminar = document.getElementById('hdn_id_tipo_gestion').value;

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/tipo_gestion/" + id_tipo_gestion_eliminar, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("Tipo Gestion eliminado");
        window.location.href = "listar-gestiones.html";
      }

})}


//--LISTAR TIPO DE GESTIONES----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Creamos función para listar tipo de gestiones.
  function listarTipoGestiones() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/tipo_gestion?_size=200", requestOptions)
      .then(response => response.json())
      .then((json) => {
        json.forEach(completarFila);
        return json;
      } )
      .then((json) => {
        $("#tbl_gestiones").DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

//Completar fila.
  function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_gestiones tbody').innerHTML +=
      `<tr>
        <td>${element.id_tipo_gestion}-</td>
        <td>${element.nombre_tipo_gestion}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-tipogestion.html?id=${element.id_tipo_gestion}&nombre=${element.nombre_tipo_gestion}'>   <img width="24px"src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-tipogestion.html?id=${element.id_tipo_gestion}'> <img width="24px" src='../img/actualizar_24x24.png'></a> 
  </td>

    </tr>`
  }


//--AGREGAR TIPO GESTION--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Creamos función para agregar el tipo de gestión.
  function crearTipoGestion(event) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Variables con los datos de formulario para crear tipo gestión.
    var txt_id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
    var txt_nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

//Obtenemos la fecha actual 
  function obtenerFechaActual() {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');
    var horas = fecha.getHours().toString().padStart(2, '0');
    var minutos = fecha.getMinutes().toString().padStart(2, '0');
    var segundos = fecha.getSeconds().toString().padStart(2, '0');
    var fechaActual = anio + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;

    return fechaActual;
}

var fechaActual = obtenerFechaActual();

//Validamos el tipo gestión a agregar.
    if (txt_id_tipo_gestion.trim().length !== 8) {
      alert("La ID debe tener 8 caracteres o no se creará.");
      return;
  }

  if (txt_nombre_tipo_gestion.trim().length === 0) {
      alert("Debe agregar un nombre al tipo de gestión o no se creará.");
      return;
  }

    var raw = JSON.stringify({
      "id_tipo_gestion": txt_id_tipo_gestion,
      "nombre_tipo_gestion": txt_nombre_tipo_gestion,
      "fecha_registro": fechaActual
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/tipo_gestion", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        alert("Recibido");
        window.history.back();
      })
      .catch(error => console.log('error', error));
  }