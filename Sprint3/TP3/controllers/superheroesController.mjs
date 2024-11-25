//gestionar las solicitudes HTTP , llamando a los servidores correspondientes y utilizando las vistas para presentar los datos 


import { obtenerSuperheroePorId, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, obtenerTodosLosSuperheroes, crearSuperheroe, actualizarSuperheroe, eliminarSuperheroe, eliminarSuperheroePorNombre } from "../services/superheroesService.mjs";

import { renderizarListaSuperheroes, renderizarSuperheroe } from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req,res){
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje:"Superheroe no encontrado"});
    }
}

export async function obtenerTodosLosSuperheroesController(req,res){
    try {
        const superheroes = await obtenerTodosLosSuperheroes(); // Obtiene los superhéroes de la base de datos o servicio
        console.log(superheroes.length)
        // Usamos res.render para renderizar la vista 'dashboard.ejs' y pasar los datos de los superheroes
        res.render('dashboard', { title: 'Dashboard', superheroes }); // Renderiza la vista y pasa los datos
        // res.send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        console.error("Error al obtener los superhéroes:", error);
        res.status(500).send({ mensaje: "Error al cargar el dashboard" });
    }
}

export async function buscarSuperheroesPorAtributoController(req,res){
    const {atributo, valor} = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo,valor);

    if(superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes));
    }else{
        res.status(404).send({mensaje: "No se encontraron superheroes con ese atributo"})
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req,res) {
    console.log("entramos al controlador de mayores de 30")
    const superheroes = await obtenerSuperheroesMayoresDe30();
    console.log(superheroes)
    res.send(renderizarListaSuperheroes(superheroes));
}

export async function crearSuperheroeController(req,res){
    try {
        const nuevoSuperheroe = await crearSuperheroe(req.body);
        res.status(201).send(renderizarSuperheroe(nuevoSuperheroe));
    } catch (error) {
        res.status(500).send({ mensaje: "Error al crear el superhéroe", error });
    }

    
}

export async function actualizarSuperheroeController(req,res){
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

        if (superheroeActualizado) {
            res.send(renderizarSuperheroe(superheroeActualizado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error });
    }
}

export async function eliminarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroe(id);

        if (superheroeEliminado) {
            res.send(renderizarSuperheroe(superheroeEliminado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);

        if (superheroeEliminado) {
            res.send(renderizarSuperheroe(superheroeEliminado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el superhéroe", error });
    }
}


//-----------------------------------------------------------------------------------------------------------------
export async function agregarSuperheroeController(req, res) {
    try {
        const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poder, aliado, enemigo } = req.body;

        // Convierte los campos de poderes, aliados y enemigos en arrays si están definidos
        const poderes = poder ? poder.split(',').map(p => p.trim()) : [];
        const aliados = aliado ? aliado.split(',').map(a => a.trim()) : [];
        const enemigos = enemigo ? enemigo.split(',').map(e => e.trim()) : [];

        // Asegúrate de que todos los campos obligatorios estén presentes
        if (!nombreSuperHeroe || !nombreReal || !edad || !planetaOrigen) {
            return res.status(400).send({ mensaje: "Faltan campos obligatorios" });
        }

        // Crea el superhéroe en la base de datos
        const nuevoSuperheroe = await crearSuperheroe({
            nombreSuperHeroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poder: poderes,
            aliado: aliados,
            enemigo: enemigos
        });

        // Redirige al dashboard o muestra la lista de superhéroes actualizada
        res.redirect('/api/heroes'); // Redirige al dashboard donde se puede ver el superhéroe agregado
    } catch (error) {
        console.error('Error al crear el superhéroe:', error);
        res.status(500).send({ mensaje: "Error al crear el superhéroe", error });
    }
}