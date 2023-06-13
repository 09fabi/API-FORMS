//ACTUALIZAR RESULTADO--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Consultar datos del resultado a actualizar.
function consultarDatosResultado(id_resultado){
  var requestOptions ={
    method:'GET',
    redirect: 'follow'
  };
  fetch("http://159.223.103.211/api/resultado/"+id_resultado, requestOptions)
  .then (response => response.json())
  .then ((json)=> json.forEach(completarFormulario))
  .catch (error => console.log('error',error));
}

//Completar formulario.
function completarFormulario(element){
  var nombre_resultado = element.nombre_resultado;

  document.getElementById("txt_nombre_resultado").value = nombre_resultado;
}

//Obtenemos los datos del resultado a actualizar.
function obtenerIDResultadoActualizar() {
  var queryString = window.location.search;
  var urlParametros = new URLSearchParams(queryString);
  var id_resultado_url = urlParametros.get('id');

  document.getElementById("txt_id_resultado").value = id_resultado_url;
  consultarDatosResultado(id_resultado_url);
}

//Actualizamos los datos de resultado con el método patch.
function actualizarResultado(event) {
  event.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var txt_id_resultado = document.getElementById("txt_id_resultado").value;
  var txt_nombre_resultado = document.getElementById("txt_nombre_resultado").value;

//Obtenemos la fecha actual.
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


//Validamos los datos del resultado a actualizar.


if (txt_nombre_resultado.trim().length === 0) {
    alert("Debe agregar un nombre al resultado o no se creará.");
    return;
}

  var raw = JSON.stringify({
      "id_resultado": txt_id_resultado,
      "nombre_resultado": txt_nombre_resultado,
      "fecha_registro": fechaActual
  });

  var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/resultado/" + txt_id_resultado, requestOptions)
      .then(response => {
          if (response.ok) {
              alert("Resultado Actualizado");
              window.location.href = "listar-resultados.html";
          }

      })
}


//ELIMINAR RESULTADO------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Obtenemos id del resultado a eliminar.
function obtenerIDResultadoEliminar() {
  //Utilizamos search para acceder a las variables recibidas mediante URL.
  var queryString = window.location.search;
  //Extraemos los parámetros.
  var urlParametros = new URLSearchParams(queryString);
  //Creamos variable con el id del resultado.
  var id_resultado_url = urlParametros.get('id');
  var nombre_resultado_url = urlParametros.get('nombre_resultado');
  //Agregamos ID a campo oculto.
  document.getElementById('hdn_id_resultado').value = id_resultado_url;
  //Mostramos mensaje de confirmación.
  var mensaje = "¿" + "Desea eliminar el resultado " + nombre_resultado_url + " " + " ?";
  document.getElementById("alt_eliminacion").innerHTML = mensaje;
}

//Creamos función para eliminar el resultado.
function eliminarResultado() {
//Obtenemos id a eliminar
  var id_resultado_eliminar = document.getElementById('hdn_id_resultado').value;
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  fetch("http://159.223.103.211/api/resultado/" + id_resultado_eliminar, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("Resultado eliminado");
        window.location.href = "listar-resultados.html";
      }
})}


//LISTAR RESULTADOS-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Creamos funcion para listar resultados.
  function listarResultados() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/resultado?_size=200", requestOptions)
      .then(response => response.json())
      .then((json) => {
        json.forEach(completarFila);
        return json;
      } )
      .then((json) => {
        $("#tbl_resultados").DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

//Completar fila.
  function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_resultados tbody').innerHTML +=
      `<tr>
        <td>${element.id_resultado}</td>
        <td>${element.nombre_resultado}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-resultado.html?id=${element.id_resultado}&nombre_resultado=${element.nombre_resultado}'>   <img width="24px"src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-resultado.html?id=${element.id_resultado}'> <img width="24px" src='../img/actualizar_24x24.png'></a> 
  </td>

    </tr>`
  }

  
//AGREGAR RESULTADOS------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Creamos funcion para agregar resultados.
  function crearResultado(event) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Variables con los datos de formulario para crear resultados.
    var txt_id_resultado = document.getElementById("txt_id_resultado").value;
    var txt_nombre_resultado = document.getElementById("txt_nombre_resultado").value;

    //Obtenemos la fecha actual.
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

//Validamos los resultados a agregar.
    if (txt_id_resultado.trim().length !== 8) {
      alert("La ID debe tener 8 caracteres o no se creará.");
      return;
  }

  if (txt_nombre_resultado.trim().length === 0) {
      alert("Debe agregar un nombre al resultado o no se creará.");
      return;
  }

    var raw = JSON.stringify({
      "id_resultado": txt_id_resultado,
      "nombre_resultado": txt_nombre_resultado,
      "fecha_registro": fechaActual
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/resultado", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        alert("Recibido");
        window.history.back();
      })
      .catch(error => console.log('error', error));
  }