
    const url = "https://8910-181-231-122-56.ngrok-free.app/student"
    
    

    window.onload = function() {
        obtenerEstudiantes();
      }
      
     function cargarEstudiantes() {
        return new Promise(function(resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('GET', url + '/getAll');
          request.responseType = 'json';
          request.onload = function() {
            if (request.status == 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          }
          request.onerror = function() {
            alert("Error de red");
          }
          request.send();
        });
      }
      
      function agregarEstudiante() {
        return new Promise(function(resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', url);
          request.setRequestHeader('Content-Type', 'application/json');
          var student = JSON.stringify({
            'firstName': document.getElementById('firstName').value,
            'lastName': document.getElementById('lastName').value,
            'email': document.getElementById('email').value,
            'dni': document.getElementById('dni').value,
            'cohort': '0',
            'status': 'activo',
            'gender': 'masculino',
            'address': 'abc123',
            'phone': '000'
          });
          request.onload = function() {
            if (request.status == 201) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          }
          request.onerror = function() {
            reject(Error('Error: error de red'));
          }
          request.send(student);
        });
      }
      
      function removerEstudiante(id) {
        return new Promise(function(resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', url + `/${id}/delete`);
          request.setRequestHeader('Content-Type', 'application/json');
          request.onload = function() {
            if (request.status == 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          }
          request.onerror = function() {
            reject(Error('Error: error de red'));
          }
          request.send();
        });
      }
      
      function modificarEstudiante() {
        return new Promise(function(resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', url + `/${document.getElementsByName('id2')[0].value}/update`);
          request.setRequestHeader('Content-Type', 'application/json');
          var student = JSON.stringify({
            'dni': document.getElementsByName('dni2')[0].value,
            'firstName': document.getElementsByName('firstName2')[0].value,
            'lastName': document.getElementsByName('lastName2')[0].value,
            'email': document.getElementsByName('email2')[0].value,
            'cohort': '0',
            'status': 'activo',
            'gender': 'masculino',
            'address': 'abc123',
            'phone': '000'
          });
      
          request.onload = function() {
            if (request.status == 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          }
      
          request.onerror = function() {
            reject(Error('Error de red'));
          }
          request.send(student);
        });
      }
      
      //--------------------------------------------------------------------------------------------------------------------------//
      function obtenerEstudiantes() {
        cargarEstudiantes().then(response => {
          var tBody = document.getElementById('tbody');
          tBody.innerHTML = '';
          response.forEach(e => {
            var fila = tBody.insertRow();
      
            var id = fila.insertCell();
            id.innerHTML = e.id;
      
            var firstName = fila.insertCell();
            firstName.innerHTML = e.firstName;
      
            var lastName = fila.insertCell();
            lastName.innerHTML = e.lastName;
      
            var email = fila.insertCell();
            email.innerHTML = e.email;
      
            var dni = fila.insertCell();
            dni.innerHTML = e.dni;
      
            var student = JSON.stringify({
              'id': e.id,
              'firstName': e.firstName,
              'lastName': e.lastName,
              'email': e.email,
              'dni': e.dni
            });
            var view = fila.insertCell();
            view.innerHTML = `<button onclick='verEstudiante(${student})'>view</button>`;
            var del = fila.insertCell();
            del.innerHTML = `<button onclick='borrarEstudiante(${e.id})'>del</button>`;
          });
      
          document.getElementById('dni').value = '';
          document.getElementById('lastName').value = '';
          document.getElementById('firstName').value = '';
          document.getElementById('email').value = '';
        }).catch(reason => {
          console.error(reason);
        });
      }
      
      function guardarEstudiante() {
        agregarEstudiante().then(() => {
          obtenerEstudiantes();
        }).catch(reason => {
          console.error(reason);
        });
      }
      
      function verEstudiante(student) {
        var div = document.getElementById('verInfo').style.display = 'block';
        document.getElementsByName('id2')[0].value = student.id;
        document.getElementsByName('dni2')[0].value = student.dni;
        document.getElementsByName('firstName2')[0].value = student.firstName;
        document.getElementsByName('lastName2')[0].value = student.lastName;
        document.getElementsByName('email2')[0].value = student.email;
      }

      function borrarEstudiante(id) {
        removerEstudiante(id).then(() => {
            obtenerEstudiantes()
        }).catch(reason => {
            console.error(reason)
        })
        var div = document.getElementById('verInfo').style.display = 'none';
      }

     function actualizarEstudiante(){
        modificarEstudiante().then(() => {
            obtenerEstudiantes()
        }).catch(reason => {
            console.error(reason)
        })
        var div = document.getElementById('verInfo').style.display = 'none';
     }

     function totalEstudiantes(){
      var tbody = document.getElementById('tbody')
      var filas = tbody.getElementsByTagName('tr')
      alert(`hay actualmete ${filas.length} estudiantes registrados`)
      }