// types/owl-carousel.d.ts
import "jquery";
declare module "owl.carousel";
declare module "jquery" {
  interface JQuery {
    owlCarousel(options?: any): JQuery;
  }
}

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}
