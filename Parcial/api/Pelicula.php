<?php

	include_once "./AccesoDatos.php";

	class Pelicula
	{
		public $id;
		public $nombre;
		public $tipo;
		public $fechaEstreno;
		public $cantidadPublico;
		public $fotoPelicula;

		public function __construct()
		{
		}
	    
	    public static function TraerTodos()
	    {    
	        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	        
	        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT id, nombre, tipo, fechaEstreno, cantidadPublico, fotoPelicula FROM peliculas");	        
	        $consulta->execute();
	        
			$data = $consulta->fetchAll(PDO::FETCH_ASSOC);    
			
	        return $data;
	    }

	    public function Buscar()
	    {    
	        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	        
	        $consulta=$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE clave=:clave AND legajo=:legajo");

	        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
	        $consulta->bindValue(':legajo',$this->legajo, PDO::PARAM_INT);

	        $consulta->execute();

	        $data = $consulta->fetch();

	        return $data; 
	    }
	    
	    public function BuscarLegajo()
	    {    
	        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	        
	        $consulta=$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE legajo=:legajo");

	        $consulta->bindValue(':legajo',$this->legajo, PDO::PARAM_INT);

	        $consulta->execute();

	        $data = $consulta->fetch();

	        return $data; 
	    }


	    public function AltaPelicula()
	    {
	        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	        
	        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO peliculas (id, nombre, tipo, FechaEstreno, CantidadPublico, FotoPelicula)"
	                                                    . "VALUES(:id, :nombre, :tipo, :FechaEstreno, :CantidadPublico, :FotoPelicula)");
			
			$consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
	        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
	        $consulta->bindValue(':tipo', $this->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':FechaEstreno', $this->fechaEstreno, PDO::PARAM_STR);
			$consulta->bindValue(':CantidadPublico', $this->cantidadPublico, PDO::PARAM_INT);
			$consulta->bindValue(':FotoPelicula', $this->fotoPelicula, PDO::PARAM_STR);

	        $consulta->execute();

	    }

	    public function ModificarUsuario($email, $datos)
	    {
	        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	        
	        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET email = :email, datos = :datos 
	                                                         WHERE legajo = :legajo");
	        
	        $consulta->bindValue(':email', $email, PDO::PARAM_STR);
	        $consulta->bindValue(':datos', $datos, PDO::PARAM_STR);
	        $consulta->bindValue(':legajo', $this->legajo, PDO::PARAM_INT);

	        return $consulta->execute();
	    }

		public function EliminarPelicula()
	    {
	        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	        
	        $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM peliculas WHERE id = :id");
	        
	        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
	        return $consulta->execute();
	    }



	}



?>