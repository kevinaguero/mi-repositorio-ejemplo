import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    id: {type: Number},
    nombreSuperHeroe: { type: String, required: true }, 
    nombreReal: { type: String, required: true }, 
    edad: { type: Number, min: 0 }, 
    planetaOrigen: {type: String, default: 'Desconocido' }, 
    debilidad: String,
    poderes: [String], 
    aliados: [String], 
    enemigos: [String],
    creador: { type: String, default: 'Kevin Aguero' },
    createdAt: { type: Date, default: Date.now } 
}, { collection: 'Grupo-04' }); 

export default mongoose.model('SuperHero', superheroSchema); 