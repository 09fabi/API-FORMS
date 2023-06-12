//Carga de información en el evento onload de agregar gestión
function cargarInformacion() {
    this.cargarClientes();
    this.cargarUsuarios();
    this.cargarTipoGestion();
    this.cargarResultados();
}
//Carga de funciones en el evento onload de actualizar gestión.
function cargarMetodosActualizar() {
    this.obtenerIDGestionActualizar();
    this.obtenerTipoGestion();
    this.obtenerCliente();
    this.obtenerUsuario();
    this.obtenerResultado();
    this.obtenerComentario();
}

//Validación de campos.
function validarCampos() {
    var opcion_usuario_validar = document.getElementById("lista-id-usuario").value;
    var opcion_cliente_validar = document.getElementById("lista-id-cliente").value;
    var opcion_tipo_gestion_validar = document.getElementById("lista-id-tipo-gestion").value;
    var opcion_resultado_validar = document.getElementById("lista-id-resultado").value;
//var txt_comentario_validar = document.getElementById("txt_comentario").value;

    if (opcion_usuario_validar === "Seleccionar" ||
        opcion_cliente_validar === "Seleccionar" ||
        opcion_tipo_gestion_validar === "Seleccionar" ||
        opcion_resultado_validar === "Seleccionar") {
        alert("Seleccione una opción antes de enviar el formulario");
    } else {
        crearGestion();
    }
}

//FUNCION PARA CARGAR CLIENTES--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function cargarClientes() {
    var select_cliente = document.getElementById("lista-id-cliente");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "query": "SELECT c.id_cliente, CONCAT(c.nombres,' ',c.apellidos)as nombre FROM cliente c"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/dynamic", requestOptions)
        .then(response => response.json())
        .then(response => {
            response.forEach(cliente => {
                const option = document.createElement("option");
                option.value = cliente.id_cliente;
                option.innerHTML = cliente.nombre;
                select_cliente.appendChild(option);
            });
        })
        .catch(error => console.log('error', error));

}

//FUNCION PARA CARGAR USUARIOS--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function cargarUsuarios() {
    var select_usuario = document.getElementById("lista-id-usuario");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "query": "SELECT u.id_usuario, CONCAT(u.nombres,' ',u.apellidos)as nombre FROM usuario u"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/dynamic", requestOptions)
        .then(response => response.json())
        .then(response => {
            response.forEach(usuario => {
                const option = document.createElement("option");
                option.value = usuario.id_usuario;
                option.innerHTML = usuario.nombre;
                select_usuario.appendChild(option);
            });
        })
        .catch(error => console.log('error', error));
}

//FUNCION PARA CARGAR TIPO DE GESTIONES-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function cargarTipoGestion() {
    var select_tipo_gestion = document.getElementById("lista-id-tipo-gestion");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT tg.id_tipo_gestion, tg.nombre_tipo_gestion as nombre_tipo_gestion FROM tipo_gestion tg"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/dynamic", requestOptions)
        .then(response => response.json())
        .then(response => {
            response.forEach(tipo_gestion => {
                const option = document.createElement("option");
                option.value = tipo_gestion.id_tipo_gestion;
                option.innerHTML = tipo_gestion.nombre_tipo_gestion;
                select_tipo_gestion.appendChild(option);
            });
        })
        .catch(error => console.log('error', error));
}

//FUNCION PARA CARGAR RESULTADOS------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function cargarResultados() {
    var select_resultado = document.getElementById("lista-id-resultado");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT r.id_resultado, r.nombre_resultado as nombre_resultado FROM resultado r"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/dynamic", requestOptions)
        .then(response => response.json())
        .then(response => {
            response.forEach(resultado => {
                const option = document.createElement("option");
                option.value = resultado.id_resultado;
                option.innerHTML = resultado.nombre_resultado;
                select_resultado.appendChild(option);
            });
        })
        .catch(error => console.log('error', error));
}


//FUNCION PARA CREAR GESTIONES--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function crearGestion() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

//Variables con los datos de formulario para agregar gestion.
    var opcion_usuario = document.getElementById("lista-id-usuario").value;
    var opcion_cliente = document.getElementById("lista-id-cliente").value;
    var opcion_tipo_gestion = document.getElementById("lista-id-tipo-gestion").value;
    var opcion_resultado = document.getElementById("lista-id-resultado").value;
    var txt_comentario = document.getElementById("txt_comentario").value;

    var raw = JSON.stringify({
        "id_gestion": null,
        "id_usuario": opcion_usuario,
        "id_cliente": opcion_cliente,
        "id_tipo_gestion": opcion_tipo_gestion,
        "id_resultado": opcion_resultado,
        "comentarios": txt_comentario,
        "fecha_registro": this.obtenerFechaActual()
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/gestion", requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Nueva gestión agregada");
                window.location.href = "listar-gestiones.html";
            }

        })
}


//FUNCION PARA LISTAR GESTIONES-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function listarGestiones() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "query": "SELECT g.id_gestion, CONCAT(c.nombres,' ',c.apellidos)as cliente, CONCAT(u.nombres,' ', u.apellidos) as usuario, c.id_cliente as id_cliente, tg.nombre_tipo_gestion as nombre_tipo_gestion, tg.id_tipo_gestion as id_tipo_gestion, r.id_resultado as id_resultado, r.nombre_resultado as nombre_resultado, u.id_usuario as id_usuario, g.comentarios, g.fecha_registro FROM gestion g,cliente c, usuario u, tipo_gestion tg, resultado r where g.id_cliente = c.id_cliente AND g.id_usuario=u.id_usuario AND g.id_tipo_gestion= tg.id_tipo_gestion AND g.id_resultado= r.id_resultado"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/dynamic", requestOptions)
        .then(response => response.json())
        .then((json) => {
            json.forEach(completarFila);
            return json;
        })
        .then((json) => {
            $("#tbl_gestiones").DataTable();
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

//Completar fila
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_gestiones tbody').innerHTML +=
        `<tr>
        <td>${element.id_gestion}</td>
        <td>${element.usuario}</td>
        <td>${element.cliente}</td>
        <td>${element.nombre_tipo_gestion}</td>
        <td>${element.nombre_resultado}</td>
        <td>${element.comentarios}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-gestion.html?id=${element.id_gestion}'> <img width="24px" src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-gestion.html?id=${element.id_gestion}&id_cl=${element.id_cliente}&id_us=${element.id_usuario}&id_tg=${element.id_tipo_gestion}&id_res=${element.id_resultado}&
  '> <img width="24px" src='../img/actualizar_24x24.png'></a> 
  </td>
  
    </tr>`
}


//FUNCION PARA ELIMINAR GESTIONES-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function eliminarGestion() {
    var id_gestion_eliminar = document.getElementById('hdn_id_gestion').value;
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/gestion/" + id_gestion_eliminar, requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Gestión eliminada");
                window.location.href = "listar-gestiones.html";
            }

        })
}

//Obtener el id de la gestión a eliminar
function obtenerIDGestionEliminar() {
    var queryString = window.location.search;
    var urlParametros = new URLSearchParams(queryString);
    var id_gestion_url = urlParametros.get('id');

    document.getElementById('hdn_id_gestion').value = id_gestion_url;
//Mostramos mensaje de confirmación
    var mensaje = "¿" + "Desea eliminar la gestión número" + " " + id_gestion_url + " ?";
    document.getElementById("alt_eliminacion_gestion").innerHTML = mensaje;
}

//Método para obtener la fecha actual
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


//FUNCIONES PARA ACTUALIZAR GESTIONES-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Obtenemos los datos de la gestión a actualizar.
function obtenerIDGestionActualizar() {
    var queryString = window.location.search;
    var urlParametros = new URLSearchParams(queryString);
    var id_gestion_url = urlParametros.get('id');
    var id_cliente_url = urlParametros.get('id_cl');
    var id_usuario_url = urlParametros.get('id_us');
    var id_tipo_gestion_url = urlParametros.get('id_tg');
    var id_resultado_url = urlParametros.get('id_res');


    document.getElementById("txt_id_gestion").value = id_gestion_url;
    document.getElementById('hdn_id_cliente').value = id_cliente_url;
    document.getElementById('hdn_id_usuario').value = id_usuario_url
    document.getElementById('hdn_id_tipo_gestion').value = id_tipo_gestion_url;
    document.getElementById('hdn_id_resultado').value = id_resultado_url;

}

//Listar tipo gestiones desplegable.
function obtenerTipoGestion() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/tipo_gestion", requestOptions)
        .then(response => response.json())
        .then((json) => json.forEach(completarOption))
        .catch(error => console.log('error', error));

//Completar fila.
    function completarOption(element, index, arr) {
        var id_tg_buscar = parseInt(document.getElementById('hdn_id_tipo_gestion').value);
        if (element.id_tipo_gestion === id_tg_buscar) {
            arr[index] = document.querySelector('#lista-id-tipo-gestion').innerHTML +=
                `<option selected value="${element.id_tipo_gestion}"> ${element.nombre_tipo_gestion}</option>`
        } else {
            arr[index] = document.querySelector('#lista-id-tipo-gestion').innerHTML +=
                `<option value="${element.id_tipo_gestion}"> ${element.nombre_tipo_gestion}</option>`
        }
    }
}

function obtenerCliente() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/cliente", requestOptions)
        .then(response => response.json())
        .then((json) => json.forEach(completarOptionCliente))
        .catch(error => console.log('error', error));

    //Completar fila.
    function completarOptionCliente(element, index, arr) {
        var id_cliente_buscar = document.getElementById('hdn_id_cliente').value;
        var id_cliente_int = parseInt(id_cliente_buscar);
        if (element.id_cliente === id_cliente_int) {
            arr[index] = document.querySelector('#lista-id-cliente').innerHTML +=
                `<option selected value="${element.id_cliente}"> ${element.nombres} ${element.apellidos}</option>`
        } else {
            arr[index] = document.querySelector('#lista-id-cliente').innerHTML +=
                `<option value="${element.id_cliente}"> ${element.nombres} ${element.apellidos}</option>`
        }
    }
}
function obtenerUsuario() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/usuario", requestOptions)
        .then(response => response.json())
        .then((json) => json.forEach(completarOptionUsuario))
        .catch(error => console.log('error', error));

    //Completar fila.
    function completarOptionUsuario(element, index, arr) {
        var id_usuario_buscar = document.getElementById('hdn_id_usuario').value;
        var id_usuario_int = parseInt(id_usuario_buscar);
        if (element.id_usuario === id_usuario_int) {
            arr[index] = document.querySelector('#lista-id-usuario').innerHTML +=
                `<option selected value="${element.id_usuario}"> ${element.nombres} ${element.apellidos}</option>`
        } else {
            arr[index] = document.querySelector('#lista-id-usuario').innerHTML +=
                `<option value="${element.id_usuario}"> ${element.nombres} ${element.apellidos}</option>`
        }
    }
}
function obtenerResultado() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/resultado", requestOptions)
        .then(response => response.json())
        .then((json) => json.forEach(completarOptionResultado))
        .catch(error => console.log('error', error));

//Completar fila.
    function completarOptionResultado(element, index, arr) {
        var id_resultado_buscar = document.getElementById('hdn_id_resultado').value;
        var id_resultado_int = parseInt(id_resultado_buscar);
        if (element.id_resultado === id_resultado_int) {
            arr[index] = document.querySelector('#lista-id-resultado').innerHTML +=
                `<option selected value="${element.id_resultado}"> ${element.nombre_resultado}</option>`
        } else {
            arr[index] = document.querySelector('#lista-id-resultado').innerHTML +=
                `<option value="${element.id_resultado}"> ${element.nombre_resultado}</option>`
        }
    }
}
function obtenerComentario() {
    var txt_id_gestion = parseInt(document.getElementById("txt_id_gestion").value);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/gestion/" + txt_id_gestion, requestOptions)
        .then(response => response.json())
        .then((json) => json.forEach(completarComentarios))
        .catch(error => console.log('error', error));

//Completar fila.
    function completarComentarios(element) {
        document.getElementById("txt_comentario").value = element.comentarios;
    }
}


//FUNCION PARA ACTUALIZAR GESTIONES---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function actualizarGestion() {
    var txt_id_gestion = parseInt(document.getElementById("txt_id_gestion").value);
//Variables con los datos de formulario para agregar gestion.
    var opcion_usuario = document.getElementById("lista-id-usuario").value;
    var opcion_cliente = document.getElementById("lista-id-cliente").value;
    var opcion_tipo_gestion = document.getElementById("lista-id-tipo-gestion").value;
    var opcion_resultado = document.getElementById("lista-id-resultado").value;
    var txt_comentario = document.getElementById("txt_comentario").value;

    var raw = JSON.stringify({
        "id_gestion": txt_id_gestion,
        "id_usuario": opcion_usuario,
        "id_cliente": opcion_cliente,
        "id_tipo_gestion": opcion_tipo_gestion,
        "id_resultado": opcion_resultado,
        "comentarios": txt_comentario,
        "fecha_registro": this.obtenerFechaActual()
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/gestion/" + txt_id_gestion, requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Gestión actualizada");
                window.location.href = "listar-gestiones.html";
            }

        })
}