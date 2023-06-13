//ACTUALIZAR USUARIO------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Consultar datos del usuario.
function consultarDatosUsuario(id_usuario){
  var requestOptions ={
    method:'GET',
    redirect: 'follow'
  };
  fetch("http://159.223.103.211/api/usuario/"+id_usuario, requestOptions)
  .then (response => response.json())
  .then ((json)=> json.forEach(completarFormulario))
  .catch (error => console.log('error',error));
}

//Completar formulario.
function completarFormulario(element){
  var dv = element.dv;
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  var email = element.email;
  var celular = element.celular;
  var username = element.username;
  var password = element.password;


  document.getElementById("txt_nombres").value = nombres;
  document.getElementById("txt_dv").value = dv;
  document.getElementById("txt_apellidos").value = apellidos;
  document.getElementById("txt_email").value = email;
  document.getElementById("txt_celular").value = celular;
  document.getElementById("txt_username").value = username;
  document.getElementById("txt_password").value = password;
}


//ACTUALIZAR USUARIO------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Consultar datos de usuario.
function consultarDatosUsuario(id_usuario) {
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };
  fetch("http://159.223.103.211/api/usuario/" + id_usuario, requestOptions)
      .then(response => response.json())
      .then((json) => json.forEach(completarFormulario))
      .catch(error => console.log('error', error));

//Completar formulario.
  function completarFormulario(element) {

      var id_usuario = element.id_usuario;
      var dv = element.dv;
      var nombres = element.nombres;
      var apellidos = element.apellidos;
      var email = element.email;
      var celular = element.celular;
      var username = element.username;
      var password = element.password;

      document.getElementById("txt_id_usuario").value = id_usuario;
      document.getElementById("txt_dv").value = dv;
      document.getElementById("txt_nombres").value = nombres;
      document.getElementById("txt_apellidos").value = apellidos;
      document.getElementById("txt_email").value = email;
      document.getElementById("txt_celular").value = celular;
      document.getElementById("txt_username").value = username;
      document.getElementById("txt_password").value = password;

  }

}

//Obtenemos los datos del usuario a actualizar.
function obtenerIDUsuarioActualizar() {
  var queryString = window.location.search;
  var urlParametros = new URLSearchParams(queryString);
  var id_usuario_url = urlParametros.get('id');

  document.getElementById("txt_id_usuario").value = id_usuario_url;
  consultarDatosUsuario(id_usuario_url);
}

//Actualizamos los datos de usuario con el método patch.
function actualizarUsuario(event) {
  event.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var txt_id_usuario = document.getElementById("txt_id_usuario").value;
  var txt_dv = document.getElementById("txt_dv").value;
  var txt_nombres = document.getElementById("txt_nombres").value;
  var txt_apellidos = document.getElementById("txt_apellidos").value;
  var txt_email = document.getElementById("txt_email").value;
  var txt_celular = document.getElementById("txt_celular").value;
  var txt_username = document.getElementById("txt_username").value;
  var txt_password = document.getElementById("txt_password").value;

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

//Validamos los campos del usuario a actualizar.
  if (txt_id_usuario.trim().length === 0 || txt_id_usuario.trim().length > 8) {
    alert("El campo RUT está vacío o es invalido. No se creará el usuario.");
    return;
}

if (txt_dv.trim().length > 1) {
    alert("El campo DV está vacío o no tiene la numerificacion válida. No se creará el usuario.");
    return;
}

if (txt_nombres.trim().length === 0) {
    alert("El campo Nombres está vacío. No se creará el usuario.");
    return;
}

if (txt_apellidos.trim().length === 0) {
    alert("El campo Apellidos está vacío. No se creará el usuario.");
    return;
}

if (txt_email.trim().length === 0) {
    alert("El campo Email está vacío. No se creará el usuario.");
    return;
}
var emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(txt_email)) {
      alert("El campo Email no contiene un correo electrónico válido. No se creará el usuario.");
      return;
  }

if (txt_celular.trim().length !== 8) {
    alert("El campo Celular está vacío o no tiene la numerificacion válida. No se creará el usuario.");
    return;
}

var usernameRegex = /^[a-zA-Z0-9]{8,}$/;
if (!usernameRegex.test(txt_username)) {
alert("El usuario no debe contener espacios y debe tener al menos 8 caracteres.");
return;
}

var passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
if (!passwordRegex.test(txt_password)) {
alert("La contraseña debe contener al menos un carácter en mayúscula, un número y tener una longitud de al menos 6 caracteres.");
return;
}

  var raw = JSON.stringify({
      "id_usuario": txt_id_usuario,
      "dv": txt_dv,
      "nombres": txt_nombres,
      "apellidos": txt_apellidos,
      "email": txt_email,
      "celular": txt_celular,
      "username": txt_username,
      "password": txt_password,
      "fecha_registro": fechaActual
  });

  var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/usuario/" + txt_id_usuario, requestOptions)
      .then(response => {
          if (response.ok) {
              alert("Usuario actualizado");
              window.location.href = "listar-usuarios.html";
          }

      })
}


//ELIMINAR USUARIO--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Obtenemos id del usuario a eliminar.
function obtenerIDUsuarioEliminar() {
//Utilizamos search para acceder a las variables recibidas mediante URL.
  var queryString = window.location.search;
//Extraemos los parámetros.
  var urlParametros = new URLSearchParams(queryString);
//Creamos variable con el id del usuario.
  var id_usuario_url = urlParametros.get('id');
  var nombres_url = urlParametros.get('nombres');
  var apellidos_url = urlParametros.get('apellidos');
//Agregamos ID a campo oculto.
  document.getElementById('hdn_id_usuario').value = id_usuario_url;
//Mostramos mensaje de confirmación.
  var mensaje = "¿" + "Desea eliminar al usuario " + nombres_url + " " + apellidos_url + " ?";
  document.getElementById("alt_eliminacion").innerHTML = mensaje;
}

//Creamos funcion para eliminar usuario.
function eliminarUsuario() {
//Obtenemos id a eliminar.
  var id_usuario_eliminar = document.getElementById('hdn_id_usuario').value;

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/usuario/" + id_usuario_eliminar, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("Usuario eliminado");
        window.location.href = "listar-usuarios.html";
      }

})}



//LISTAR USUARIOS---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Creamos función para listar usuarios.
  function listarUsuarios() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/usuario?_size=200", requestOptions)
      .then(response => response.json())
      .then((json) => {
        json.forEach(completarFila);
        return json;
      } )
      .then((json) => {
        $("#tbl_usuarios").DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

//Completar fila.
  function completarFila(element, index, arr) {
    //Ocultar la contraseña
    const password = element.password.replace(/./g, '*');
    arr[index] = document.querySelector('#tbl_usuarios tbody').innerHTML +=
      `<tr>
        <td>${element.id_usuario}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.username}</td>
        <td>${password}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-usuario.html?id=${element.id_usuario}&nombres=${element.nombres}&apellidos=${element.apellidos}'>   <img width="24px"src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-usuario.html?id=${element.id_usuario}'> <img width="24px" src='../img/actualizar_24x24.png'></a> 
  </td>
    </tr>`
}


//AGREGAR USUARIO---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Creamos funcion para agregar usuario.
  function crearUsuario(event) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
//Variables con los datos de formulario para crear usuario
    var txt_id_usuario = document.getElementById("txt_id_usuario").value;
    var txt_dv = document.getElementById("txt_dv").value;
    var txt_nombres = document.getElementById("txt_nombres").value;
    var txt_apellidos = document.getElementById("txt_apellidos").value;
    var txt_email = document.getElementById("txt_email").value;
    var txt_celular = document.getElementById("txt_celular").value;
    var txt_username = document.getElementById("txt_username").value;
    var txt_password = document.getElementById("txt_password").value;
    
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


//Validamos los campos de agregar usuario.
    if (txt_id_usuario.trim().length === 0 || txt_id_usuario.trim().length > 8) {
      alert("El campo RUT está vacío o es invalido. No se creará el usuario.");
      return;
  }

  if (txt_dv.trim().length > 1) {
      alert("El campo DV está vacío o no tiene la numerificacion válida. No se creará el usuario.");
      return;
  }

  if (txt_nombres.trim().length === 0) {
      alert("El campo Nombres está vacío. No se creará el usuario.");
      return;
  }

  if (txt_apellidos.trim().length === 0) {
      alert("El campo Apellidos está vacío. No se creará el usuario.");
      return;
  }

  if (txt_email.trim().length === 0) {
      alert("El campo Email está vacío. No se creará el usuario.");
      return;
  }
  var emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(txt_email)) {
        alert("El campo Email no contiene un correo electrónico válido. No se creará el usuario.");
        return;
    }

  if (txt_celular.trim().length !== 8) {
      alert("El campo Celular está vacío o no tiene la numerificacion válida. No se creará el usuario.");
      return;
  }
  
  var usernameRegex = /^[a-zA-Z0-9]{8,}$/;
if (!usernameRegex.test(txt_username)) {
  alert("El usuario no debe contener espacios y debe tener al menos 8 caracteres.");
  return;
}

var passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
if (!passwordRegex.test(txt_password)) {
  alert("La contraseña debe contener al menos un carácter en mayúscula, un número y tener una longitud de al menos 6 caracteres.");
  return;
}

    var raw = JSON.stringify({
      "id_usuario": txt_id_usuario,
      "dv": txt_dv,
      "nombres": txt_nombres,
      "apellidos": txt_apellidos,
      "email": txt_email,
      "celular": txt_celular,
      "username": txt_username,
      "password": txt_password,
      "fecha_registro": fechaActual

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/usuario", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        alert("Recibido");
        window.history.back();
      })
      .catch(error => console.log('error', error));
  }