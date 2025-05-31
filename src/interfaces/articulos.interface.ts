export interface Articulo {
    id?: number;
    nombre:string;
    fecha_modificacion?: Date;
    marca: string;
    activo: "0" | "1";
}

export interface CreateArticuloDTO {
    nombre: string;
    marca: string;
    activo?: "0" | "1";
}