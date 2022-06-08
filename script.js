var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        let formData = readFormData(); //[respuesta booleana, objeto]
        if(formData[0]){
            if (selectedRow == null){
                insertNewRecord(formData[1]);
            }
            else{
                updateRecord(formData[1]);
            }
            resetForm();
        }   
}


function validaFormulario(rut, nombre, depto, sueldo){
    var respuesta = ["", true];
    //rut, nombre son txt, sueldo number
    if(rut.length == 0){
        respuesta[0]+="Debe ingresar RUT!\n";
        respuesta[1] = false;
    }
    if(nombre.length == 0){
        respuesta[0]+="Debe ingresar NOMBRE!\n";
        respuesta[1] = false;
    }
    if(depto.length == 0){
        respuesta[0]+="Debe ingresar DEPARTAMENTO!\n";
        respuesta[1] = false;
    }


    sueldo = parseInt(sueldo);
    if(isNaN(sueldo)){
        respuesta[0]+="Debe ingresar SUELDO!\n";
        respuesta[1] = false;
    }
    return respuesta;

}

//Retrieve the data
function readFormData() {
    var formData = [false,{},""];
    rut = document.getElementById("idRut").value;
    nombre = document.getElementById("idNombre").value;
    depto = document.getElementById("idDepartamento").value;
    sueldo = document.getElementById("idSueldo").value;
    
    let resultado_validacion = validaFormulario(rut,nombre,depto,sueldo);
    if(resultado_validacion[1]){
        formData[1]["rut"] = rut;
        formData[1]["nombre"] = nombre;
        formData[1]["departamento"] = depto;
        formData[1]["sueldo"] = sueldo;
        formData[0] = true;
        return formData;
    }else{
        alert(resultado_validacion[0]);
        formData[0] = false;
        return formData;
    }
    
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.rut;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.nombre;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.departamento;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.sueldo;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Editar</button> <button onClick="onDelete(this)">Eliminar</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("idRut").value = selectedRow.cells[0].innerHTML;
    document.getElementById("idNombre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("idDepartamento").value = selectedRow.cells[2].innerHTML;
    document.getElementById("idSueldo").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.rut;
    selectedRow.cells[1].innerHTML = formData.nombre;
    selectedRow.cells[2].innerHTML = formData.departamento;
    selectedRow.cells[3].innerHTML = formData.sueldo;
}

//Delete the data
function onDelete(td) {
    if (confirm('¿Está seguro que desea eliminar al empleado?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("idRut").value = '';
    document.getElementById("idNombre").value = '';
    document.getElementById("idDepartamento").value = '';
    document.getElementById("idSueldo").value = '';
    selectedRow = null;
}
