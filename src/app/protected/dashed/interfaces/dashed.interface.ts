export interface AsideEstado {
 flotar: boolean;
 open: boolean;
 minimizado: boolean; 
 aside?: any
}

export interface AsideModel {
    asideTitulo: string,
    asideFooter: string;
    asideEstado: boolean;
    asideSeccion: AsideSeccion[]

}

export interface AsideItems {
    texto: string,
    href: string,
    icon: string,
}

export interface AsideSeccion {
    titulo: string,
    icon: string,
    items: AsideItems[]
}