const socket = io();

socket.on("mensage_back", (data) => {
  console.log(data);
  render(data);
  socket.emit("message_client", "Gracias por la conexion soy el cliente");
});


//Funcion para renderizar los mensajes
const render = (data) => {
  let html = data.map((x) => {
    return ` 
        <p> <strong>${x.nombre}</strong> : ${x.msn} </p>
    `;
  }).join(" ");

  document.querySelector("#caja").innerHTML = html;
};


//Funcion para capturar los mensajes nuevos
const addInfo = () => {
  let dataObj = {
    nombre: document.querySelector("#nb").value,
    msn: document.querySelector("#msn").value,
  };

  socket.emit("dataMsn", dataObj);
  document.querySelector("#msn").value = "";
  return false;
};

//Escuchar lista de productos
socket.on("lista_productos", (dataObj) => {
  console.log(dataObj);
  updateTable(dataObj);
  socket.emit("updateConfirm", "Lista de productos actualizada");
});

//Funcion para renderizar la tabla de productos
const updateTable = (dataObj) => {
  let html = dataObj.map((x) => {
    return ` 
        <tr>
            <td>${x.id}</td>
            <td>${x.title}</td>
            <td>${x.price}</td>
            <td>
              <img src=${x.thumbnail} alt=${x.title}</img>
            </td>
        </tr>
    `;
  }).join(" ");
  document.querySelector("#tablaProductos").innerHTML = html;
}

//Funcion para capturar los productos nuevos
const addProd = () => {
  let dataObj = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };
  console.log(dataObj);
  socket.emit("newDataProd", dataObj);
  document.querySelector("#inputTitle").value = "";
  document.querySelector("#inputPrice").value = "";
  document.querySelector("#inputCover").value = "";
  return false;
}


