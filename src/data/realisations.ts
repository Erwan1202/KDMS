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
    { id: "all", label: "Tout Voir" },
    { id: "evenementiel", label: "Événementiel", featured: true, gridClass: "lg:col-span-1 h-[280px] lg:h-[400px]" },
    { id: "meubles", label: "Meubles", featured: true, gridClass: "lg:col-span-1 h-[280px] lg:h-[400px]" },
    { id: "audiovisuel", label: "Audiovisuel", featured: true, gridClass: "lg:col-span-1 h-[280px] lg:h-[400px]" },
    { id: "valise-resine", label: "Valise résine", featured: true, gridClass: "lg:col-span-1 h-[280px] lg:h-[400px]" },
    { id: "industrie", label: "Industrie", featured: true, gridClass: "lg:col-span-1 h-[280px] lg:h-[400px]" },
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
import ampegLogo from "../assets/brands/ampeg.png";
import moogLogo from "../assets/brands/moog.png";
import godoxLogo from "../assets/brands/godox.png";
import malightingLogo from "../assets/brands/ma-lighting.png";
import laneyLogo from "../assets/brands/laney.png";
import gkLogo from "../assets/brands/gallien-krueger.png";

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
    { id: 15, name: "Ampeg", logo: ampegLogo },
    { id: 16, name: "Moog", logo: moogLogo },
    { id: 17, name: "Godox", logo: godoxLogo },
    { id: 18, name: "MA Lighting", logo: malightingLogo },
    { id: 19, name: "Laney", logo: laneyLogo },
    { id: 20, name: "Gallien Krueger", logo: gkLogo },
];
