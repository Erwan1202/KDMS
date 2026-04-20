import type { ImageMetadata } from "astro";

export interface Category {
    id: string;
    label: string;
    featured?: boolean;
    gridClass?: string;
}


export interface BrandLogo {
    id: number;
    name: string;
    logo: ImageMetadata;
}

export const categories: Category[] = [
    { id: "evenementiel", label: "Événementiel", featured: true, gridClass: "xl:col-span-1 h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[400px]" },
    { id: "audiovisuel", label: "Audiovisuel", featured: true, gridClass: "xl:col-span-1 h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[400px]" },
    { id: "industrie", label: "Industrie", featured: true, gridClass: "xl:col-span-1 h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[400px]" },
    { id: "meubles", label: "Meubles", featured: true, gridClass: "xl:col-span-1 h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[400px]" },
    { id: "valise-resine", label: "Valise résine", featured: true, gridClass: "xl:col-span-1 h-[260px] sm:h-[300px] lg:h-[340px] xl:h-[400px]" },
    { id: "all", label: "Tout Voir" },
];

// Brand Logos
import sonyLogo from "../assets/brands/sony.png";
import yamahaLogo from "../assets/brands/yamaha.png";
import pioneerLogo from "../assets/brands/pioneer.png";
import fordLogo from "../assets/brands/ford.png";
import lgLogo from "../assets/brands/lg.png";
import fenderLogo from "../assets/brands/fender.png";
import midasLogo from "../assets/brands/midas.png";
import allenHeathLogo from "../assets/brands/allen-heath.png";
import uniluminLogo from "../assets/brands/unilumin.png";
import redbullLogo from "../assets/brands/redbull.png";
import mieleLogo from "../assets/brands/miele.png";
import lacousticsLogo from "../assets/brands/l-acoustics.png";
import abletonLogo from "../assets/brands/ableton.png";
import samsungLogo from "../assets/brands/samsung.png";
import moogLogo from "../assets/brands/moog.png";
import godoxLogo from "../assets/brands/godox.png";
import malightingLogo from "../assets/brands/ma-lighting.png";
import laneyLogo from "../assets/brands/laney.png";
import gkLogo from "../assets/brands/gallien-krueger.png";
import aputureLogo from "../assets/brands/aputure.png";
import arriLogo from "../assets/brands/ARRI.png";
import cameoLogo from "../assets/brands/Cameo.png";
import chauvetLogo from "../assets/brands/Chauvet.png";
import codaLogo from "../assets/brands/Coda.png";
import marshallLogo from "../assets/brands/Marshall.png";
import nordLogo from "../assets/brands/nord-keyboards-logo-vector.svg";
import robeLogo from "../assets/brands/robe-lighting-seeklogo.png";
import rolandLogo from "../assets/brands/Roland_Corporation.png";
import starwayLogo from "../assets/brands/starway.png";

export const brandLogos: BrandLogo[] = [
    { id: 1, name: "Sony", logo: sonyLogo },
    { id: 2, name: "Yamaha", logo: yamahaLogo },
    { id: 3, name: "Pioneer", logo: pioneerLogo },
    { id: 4, name: "Ford", logo: fordLogo },
    { id: 5, name: "LG", logo: lgLogo },
    { id: 6, name: "Fender", logo: fenderLogo },
    { id: 7, name: "Midas", logo: midasLogo },
    { id: 8, name: "Allen & Heath", logo: allenHeathLogo },
    { id: 9, name: "Unilumin", logo: uniluminLogo },
    { id: 10, name: "Red Bull", logo: redbullLogo },
    { id: 11, name: "Miele", logo: mieleLogo },
    { id: 12, name: "L-Acoustics", logo: lacousticsLogo },
    { id: 13, name: "Ableton", logo: abletonLogo },
    { id: 14, name: "Samsung", logo: samsungLogo },
    { id: 16, name: "Moog", logo: moogLogo },
    { id: 17, name: "Godox", logo: godoxLogo },
    { id: 18, name: "MA Lighting", logo: malightingLogo },
    { id: 19, name: "Laney", logo: laneyLogo },
    { id: 20, name: "Gallien Krueger", logo: gkLogo },
    { id: 21, name: "Aputure", logo: aputureLogo },
    { id: 22, name: "ARRI", logo: arriLogo },
    { id: 23, name: "Cameo", logo: cameoLogo },
    { id: 24, name: "Chauvet", logo: chauvetLogo },
    { id: 25, name: "Coda", logo: codaLogo },
    { id: 26, name: "Marshall", logo: marshallLogo },
    { id: 27, name: "Nord", logo: nordLogo as any },
    { id: 28, name: "Robe Lighting", logo: robeLogo },
    { id: 29, name: "Roland", logo: rolandLogo },
    { id: 30, name: "Starway", logo: starwayLogo },
];
