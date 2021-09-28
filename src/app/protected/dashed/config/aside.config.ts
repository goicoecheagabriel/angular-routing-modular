import { AsideModel } from "../interfaces/dashed.interface";

export const asideConfig: AsideModel = {
    asideTitulo: 'dashboard',
    asideFooter: 'now sneakers',
    asideEstado: false,
    asideSeccion: [{
      titulo: 'Store',
      icon: 'las la-store-alt',
      items: [{
        texto:"products",
        href: "./main",
        icon: "lab la-product-hunt"
      },
      {
        texto:"sales",
        href: "./sales",
        icon: "las la-coins"
      },
      {
        texto:"customers",
        href: "./clientes",
        icon: "las la-user-tie"
      },
      {
        texto:"offers",
        href: "./descuentos",
        icon: "las la-tag"
      }]
    },
    {
      titulo: 'Users',
      icon: 'las la-user-friends',
      items: [{
        texto:"list",
        href: "./productos",
        icon: "las la-list"
      },
      {
        texto:"statics",
        href: "./ventas",
        icon: "las la-chart-line"
      }]
    }]
  }