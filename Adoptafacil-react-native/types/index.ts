// Tipos compartidos de la aplicación

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  imagenes: string[];
  propietario?: {
    nombre: string;
    email: string;
  };
  // Campos adicionales del formulario (opcionales para compatibilidad)
  sexo?: string;
  ciudad?: string;
  descripcion?: string;
  fechaNacimiento?: string;
}
