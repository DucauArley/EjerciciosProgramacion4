<?php
	
	use \Firebase\JWT\JWT;
	require "vendor/autoload.php";
	include_once "./Pelicula.php";
	include_once "./AccesoDatos.php";

	class rutas
	{
		public static function traerPeliculas($request, $response) 
		{
			try
			{

				$pelicula = new Pelicula();
				$peliculas = $pelicula->TraerTodos();

				return $response->withJson($peliculas, 200);

				

			}
			catch(Exception $e)
			{
				throw new Exception($e);
			}
		}

		public function HabilitarCORSTodos($request, $response, $next) {
			/*
			al ingresar no hago nada
		  */
		  $response = $next($request, $response);
			//solo afecto la salida con los header
			// $response->getBody()->write('<p>habilitado HabilitarCORSTodos</p>');
			
				return $response
				->withHeader('Access-Control-Allow-Origin', '*')
				->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
				->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		}

		public static function login($request, $response) 
		{
		    $datos = $request->getParsedBody();

		    $usuario = new Usuario();

		    $usuario->clave = $datos["clave"];
		    $usuario->legajo = $datos["legajo"];

		    $aux = $usuario->Buscar();

			if($aux[1] == $usuario->clave && $aux[3] == $usuario->legajo)
			{
				$usuario->nombre = $aux[0];
				$usuario->tipo = $aux[2];

				$now = time();
				$playload = array(
				"iat" => $now,
				"exp" => $now + (60*60),
				"data" => $usuario,
				);

				try
				{
				 	$token = JWT::encode($playload,"claveloide");
				   	return $response->withJson($token,200);	
				}
				catch(Exception $e)
				{
					throw new Exception($e);
				}
			}
		    else
		    {
		    	echo "La clave o el legajo son incorrectas";
		    }
		}

		public static function crearMateria($request, $response)
		{
			try
			{
				$arrayToken = $request->getHeader('token');
			    $token = $arrayToken[0];
		    
			    if(empty($token) || $token === "")
			    {
			    	echo "Error";
			    }
				    
		    	$tokenDeco = JWT::decode($token, "claveloide",['HS256'])->data;

				$datos = $request->getParsedBody();

				if($tokenDeco->tipo == "admin")
				{
				    $materia = new Materia();
				    $materia->nombre = $datos["nombre"];
				    $materia->cuatrimestre = $datos["cuatrimestre"];
				    $materia->cupos = $datos["cupos"];

				    $materia->AltaMateria();

				    echo "Insercion exitosa!";
				}
				else
				{
					echo "No es administrador";
				}
			}
			catch(Exception $e)
			{
				throw new Exception($e);
			}
		}

			public static function usuarioLegajo($request, $response, $arg)
			{
				$arrayToken = $request->getHeader('token');
				$token = $arrayToken[0];
		    
				if(empty($token) || $token === "")
				{
				  	echo "Error";
				}
				    
			    $tokenDeco = JWT::decode($token, "claveloide",['HS256'])->data;

			    $datos = $request->getParsedBody();

			    $usuario = new Usuario();

			    $usuario->legajo = $arg["legajo"];

			    $aux = $usuario->BuscarLegajo();

			    if($aux[2] == "admin")
			    {
			    	
			    	if(!is_null($datos["email"]) && !is_null($datos["datos"]))
			    	{
			    		$usuario->ModificarUsuario($datos["email"], $datos["datos"]);
			    		echo "Modificacion exitosa!";
			    	}
			    }
			    else
			    {
			    	if($aux[2] == "profesor")
			    	{
			    		if(!is_null($datos["email"]) && !is_null($datos["materias"]))
			    		{
				    		$usuario->ModificarUsuario($datos["email"], $datos["materias"]);
				    		echo "Modificacion exitosa!";
			    		}
			    	}
			    	else
			    	{
			    		if(!is_null($datos["email"]) && !is_null($datos["foto"]))
			    		{
				    		$usuario->ModificarUsuario($datos["email"], $datos["foto"]);
				    		echo "Modificacion exitosa!";
			    		}
			    	}
			    }
			}

		public static function inscripcion($request, $response, $arg)
		{
			$arrayToken = $request->getHeader('token');
			$token = $arrayToken[0];
		    
			if(empty($token) || $token === "")
			{
			  	echo "Error";
			}
			    
		    $tokenDeco = JWT::decode($token, "claveloide",['HS256'])->data;

		    $materia = new Materia();
			$materia->nombre = $arg["materia"];

		    $aux = $materia->Buscar();

		    $materia->cupos = $aux[2];

			if($tokenDeco->tipo == "alumno" && !is_null($aux[0]) && $aux[2] > 0)
			{
				$inscripcion = new Inscripcion();
				$inscripcion->materia = $arg["materia"];
				$inscripcion->alumno = $tokenDeco->nombre;

				$inscripcion->AltaInscripcion();
				$materia->ModificarMateria();

				echo "Inscripcion exitosa";

			}
			else
			{
				echo "solo los alumnos pueden inscribirse en materias";
			}
			    
		}

		public static function mostrarMaterias($request, $response)
		{
			$arrayToken = $request->getHeader('token');
			$token = $arrayToken[0];
		    
			if(empty($token) || $token === "")
			{
			  	echo "Error";
			}
			    
		    $tokenDeco = JWT::decode($token, "claveloide",['HS256'])->data;

		 	$inscripcion = new Inscripcion();
		    $inscripcion->alumno = $tokenDeco->tipo;

		    $usuario = new Usuario();
		    $usuario->legajo = $tokenDeco->legajo;

		    if($tokenDeco->tipo == "alumno")
		    {
		    	$inscripcion->Listar();
		    }
		    else
		    {
		    	if($tokenDeco->tipo == "profesor")
		    	{
		    		$aux = $usuario->BuscarLegajo();

		    		echo "Materias: " . $aux["datos"];
		    	}
		    	else
		    	{
		    		$materia = new Materia();

		    		$materia->ListarTodas();
		    	}
		    }
		}

	}

?>