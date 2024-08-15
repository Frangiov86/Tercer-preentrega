document.addEventListener("DOMContentLoaded", function () {
    // Selección de elementos del DOM por ID
    const formularioLogin = document.getElementById("login-form"); // Selecciona el formulario de inicio de sesión
    const estadoLogin = document.getElementById("login-status"); // Selecciona el elemento para mostrar el estado del login
    const entradaUsuario = document.getElementById("username"); // Selecciona el campo de entrada para el nombre de usuario
    const entradaContraseña = document.getElementById("password"); // Selecciona el campo de entrada para la contraseña
    const successModal = document.getElementById("success-modal"); // Selecciona el modal de éxito
    const closeModal = successModal.querySelector(".close"); // Selecciona el botón de cerrar del modal

    //!    Con desestructuración aplicada a nombre de usuario y clave, llamando alias

    async function validarUsuario(usuario, contraseña) {
        try {
            const respuesta = await fetch('./json/usuarios.json');
            const datos = await respuesta.text();
            const usuarios = JSON.parse(datos);
            console.log([...usuarios]); //! Aquí se utiliza el spread para mostrar todos los usuarios
    
            return usuarios.some(({ username: nombreUsuario, password: clave }) => // Aquí se utiliza la desestructuración
                nombreUsuario === usuario && clave === contraseña
            );
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            return false;
        }
    }

    //! Evento de envío del formulario de inicio de sesión
    document.getElementById("login").addEventListener("submit", async function (evento) {
        evento.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const usuario = entradaUsuario.value; // Obtener el valor del campo de entrada de usuario
        const contraseña = entradaContraseña.value; // Obtener el valor del campo de entrada de contraseña
        
        //! Aplicar el operador lógico AND para simplificar el código
        (usuario && contraseña) && 
        (await validarUsuario(usuario, contraseña) ? 
            (localStorage.setItem("loggedIn", "true"),
             localStorage.setItem("username", usuario),
             successModal.style.display = "block", // Mostrar el modal
             setTimeout(() => window.location.href = "./pages/logueado.html", 2000)) : // Redirigir después de cerrar el modal
            estadoLogin.textContent = "Nombre de usuario o contraseña incorrectos."
        ) 
    });

    // Evento para cerrar el modal cuando se hace clic en el botón de cerrar
    closeModal.addEventListener("click", function () {
        successModal.style.display = "none"; // Ocultar el modal
    });

    // Evento para cerrar el modal cuando se hace clic fuera del modal
    window.addEventListener("click", function (event) {
        if (event.target === successModal) {
            successModal.style.display = "none"; // Ocultar el modal
        }
    });
});


