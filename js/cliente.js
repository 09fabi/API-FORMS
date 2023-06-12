//ACTUALIZAR EL CLIENTE---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Consultar datos del cliente.
function consultarDatosCliente(id_cliente){
  var requestOptions ={
    method:'GET',
    redirect: 'follow'
  };
  fetch("http://159.223.103.211/api/cliente/"+id_cliente, requestOptions)
  .then (response => response.json())
  .then ((json)=> json.forEach(completarFormulario))
  .catch (error => console.log('error',error));
}

//Completar formulario cliente.
function completarFormulario(element){
  var dv = element.dv;
  var nombres = element.nombres;
  var apellido = element.apellidos;
  var email = element.email;
  var celular = element.celular;

  document.getElementById("txt_nombres").value = nombres;
  document.getElementById("txt_dv").value = dv;
  document.getElementById("txt_apellidos").value = apellido;
  document.getElementById("txt_email").value = email;
  document.getElementById("txt_celular").value = celular;
}

//Obtenemos los datos del cliente a actualizar.
function obtenerIDClienteActualizar() {
  var queryString = window.location.search;
  var urlParametros = new URLSearchParams(queryString);
  var id_cliente_url = urlParametros.get('id');

  document.getElementById("txt_id_cliente").value = id_cliente_url;
  consultarDatosCliente(id_cliente_url);
}

//Actualizamos los datos del cliente con el método patch.
function actualizarCliente(event) {
  event.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

    var txt_id_cliente = document.getElementById("txt_id_cliente").value;
    var txt_dv = document.getElementById("txt_dv").value;
    var txt_nombres = document.getElementById("txt_nombres").value;
    var txt_apellidos = document.getElementById("txt_apellidos").value;
    var txt_email = document.getElementById("txt_email").value;
    var txt_celular = document.getElementById("txt_celular").value;

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

//Validamos los datos de cliente.
  if (txt_id_cliente.trim().length === 0 || txt_id_cliente.trim().length > 8) {
    alert("El campo RUT está vacío o es invalido. No se creará el cliente.");
    return;
}

if (txt_dv.trim().length > 1) {
    alert("El campo DV está vacío. No se creará el cliente.");
    return;
}

if (txt_nombres.trim().length === 0) {
    alert("El campo Nombres está vacío. No se creará el cliente.");
    return;
}

if (txt_apellidos.trim().length === 0) {
    alert("El campo Apellidos está vacío. No se creará el cliente.");
    return;
}

if (txt_email.trim().length === 0) {
    alert("El campo Email está vacío. No se creará el cliente.");
    return;
}
var emailRegex = /^\S+@\S+.\S+$/;
  if (!emailRegex.test(txt_email)) {
      alert("El campo Email no contiene un correo electrónico válido. No se creará el cliente.");
      return;
  }

if (txt_celular.trim().length !== 8) {
    alert("El campo Celular está vacío. No se creará el cliente.");
    return;
}

  var raw = JSON.stringify({
      "id_cliente": txt_id_cliente,
      "dv": txt_dv,
      "nombres": txt_nombres,
      "apellidos": txt_apellidos,
      "email": txt_email,
      "celular": txt_celular,
      "fecha_registro": fechaActual
  });

  var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/cliente/" + txt_id_cliente, requestOptions)
      .then(response => {
          if (response.ok) {
              alert("Cliente actualizado");
              window.location.href = "listar-clientes.html";
          }

      })
}


//ELIMINAR CLIENTE--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Obtenemos id del cliente a eliminar.
function obtenerIDClienteEliminar() {
//Utilizamos search para acceder a las variables recibidas mediante URL.
  var queryString = window.location.search;
//Extraemos los parámetros.
  var urlParametros = new URLSearchParams(queryString);
//Creamos variable con el id del cliente.
  var id_cliente_url = urlParametros.get('id');
  var nombre_url = urlParametros.get('nombre');
  var apellido_url = urlParametros.get('apellidos');
  //Agregamos ID a campo oculto
  document.getElementById('hdn_id_cliente').value = id_cliente_url;
//Mostramos mensaje de confirmación
  var mensaje = "¿" + "Desea eliminar al cliente " + nombre_url + " " + apellido_url + " ?";
  document.getElementById("alt_eliminacion").innerHTML = mensaje;
}

//Creamos la funcion para eliminar al cliente.
function eliminarCliente() {
//Obtenemos id a eliminar
  var id_cliente_eliminar = document.getElementById('hdn_id_cliente').value;

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/cliente/" + id_cliente_eliminar, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("Cliente eliminado");
        window.location.href = "listar-clientes.html";
      }

})}


//LISTAR CLIENTES---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Creamos función para listar clientes.
  function listarClientes() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/cliente?_size=200", requestOptions)
      .then(response => response.json())
      .then((json) => {
        json.forEach(completarFila);
        return json;
      } )
      .then((json) => {
        $("#tbl_clientes").DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

//Completar fila
  function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_clientes tbody').innerHTML +=
      `<tr>
        <td>${element.id_cliente}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-cliente.html?id=${element.id_cliente}&nombre=${element.nombres}&apellidos=${element.apellidos}'>   <img width="24px"src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-cliente.html?id=${element.id_cliente}'> <img width="24px" src='../img/actualizar_24x24.png'></a> 
  </td>

    </tr>`
  }

  
//AGREGAR CLIENTE-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Creamos función para agregar cliente.
  function crearCliente(event){
    event.preventDefault();
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Variables con los datos de formulario para crear cliente
    var txt_id_cliente = document.getElementById("txt_id_cliente").value;
    var txt_dv = document.getElementById("txt_dv").value;
    var txt_nombres = document.getElementById("txt_nombres").value;
    var txt_apellidos = document.getElementById("txt_apellidos").value;
    var txt_email = document.getElementById("txt_email").value;
    var txt_celular = document.getElementById("txt_celular").value;

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

//Validamos los datos del cliente a agregar.
    if (txt_id_cliente.trim().length === 0 || txt_id_cliente.trim().length > 8) {
      alert("El campo RUT está vacío o es invalido. No se creará el cliente.");
      return;
  }

  if (txt_dv.trim().length > 1) {
      alert("El campo DV está vacío. No se creará el cliente.");
      return;
  }

  if (txt_nombres.trim().length === 0) {
      alert("El campo Nombres está vacío. No se creará el cliente.");
      return;
  }

  if (txt_apellidos.trim().length === 0) {
      alert("El campo Apellidos está vacío. No se creará el cliente.");
      return;
  }

  if (txt_email.trim().length === 0) {
      alert("El campo Email está vacío. No se creará el cliente.");
      return;
  }
  var emailRegex = /^\S+@\S+.\S+$/;
    if (!emailRegex.test(txt_email)) {
        alert("El campo Email no contiene un correo electrónico válido. No se creará el cliente.");
        return;
    }

  if (txt_celular.trim().length !== 8) {
      alert("El campo Celular está vacío. No se creará el cliente.");
      return;
  }
  
    var raw = JSON.stringify({
      "id_cliente": txt_id_cliente,
      "dv": txt_dv,
      "nombres": txt_nombres,
      "apellidos": txt_apellidos,
      "email": txt_email,
      "celular": txt_celular,
      "fecha_registro": fechaActual

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/cliente", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        alert("Recibido");
        window.history.back();
      })
      .catch(error => console.log('error', error));
    
 
  }