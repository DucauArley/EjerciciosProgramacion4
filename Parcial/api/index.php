<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
	header("Content-Type: application/json");

	use \Firebase\JWT\JWT;
	require "vendor/autoload.php";
	include_once "./Pelicula.php";
	include_once "./AccesoDatos.php";
	include_once "./rutas.php";

	$config["displayErrorDetails"] = true;
	$config["addContentLengthHeader"] = false;
	$app = new \Slim\App(["settings" => $config]);


	$app->get('/peliculas', \rutas::class . ':traerPeliculas')->add(\rutas::class . ':HabilitarCORSTodos');

	$app->post('/login', \rutas::class . ':login');

	$app->post('/materia', \rutas::class . ':crearMateria');

	$app->post('/usuario/{legajo}', \rutas::class . ':usuarioLegajo');

	$app->post('/inscripcion/{materia}', \rutas::class . ':inscripcion');

	$app->get('/materias', \rutas::class . ':mostrarMaterias');

	$app->run();

?>