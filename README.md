<h1> Pasos para instalacion</h1>
-Restaurar la base de datos por medio del archivo .mdf y .ldf

<h2> Para correr el frontend</h2>
-Procurar tener actualizada la version de nodejs<br/>
-Abrir un cmd en modo administrador en el root del proyecto<br/>
-Ejecutar "npm install" en el root del proyecto<br/>
-Ejecutar "npm start" y acceder a la ruta que indica la ejecucion.<br/>

<h2> Para correr el backend</h2>
-Desde Visual Studio publicar el proyecto CreditApp.API, en la ruta deseada.
-Acceder a la ruta donde se publico el proyecto y cambiar en el appsettings.config, el connectionString con la BD que corresponde.<br/>
-En la misma ruta ejecutar un cmd en modo administrador.<br/>
-Definir la siguiente variable con el siguiente comando "-set ASPNETCORE_URLS=https://localhost:7081"<br/>
-Ejecutar el CreditApp.API.exe<br/>
Nota: En caso de que no funcionen las llamadas al backend desde el front, ejecutar "dotnet dev-certs https --trust" para los certificados SSL del navegador. Se puede ejecutar antes "dotnet dev-certs https --clean". Posteriormente reiniciar el navegador.<br/><br/>

<p><b>Aclaracion:</b> Solo se pueden crear usuarios en modo "Solicitante". Se puede modificar desde la BD el Rol del usuario una vez creado y luego acceder normal segun el rol.</p> 
