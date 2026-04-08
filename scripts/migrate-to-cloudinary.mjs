import { v2 as cloudinary } from 'cloudinary';
import { readFileSync } from 'fs'; // eslint-disable-line no-unused-vars
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync as readEnv } from 'fs';
// Charger .env manuellement
try {
  const env = readEnv(resolve(dirname(fileURLToPath(import.meta.url)), '../.env'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
} catch {}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Toutes les images statiques avec leur titre et catégorie
const images = [
  // Meubles
  { path: 'src/assets/realisations/meubles/dressing-racing-sport-auto.png', title: 'Dressing racing sport auto', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/borne-integration-console-arcade.png', title: 'Borne intégration console arcade', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/comptoir-merchandising-redbull-vue-interne.jpg', title: 'Comptoir merchandising RedBull vue interne', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/comptoir-merchandising-redbull-vue-visiteur-stand.jpg', title: 'Comptoir merchandising RedBull vue visiteur stand', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/flight-trophee-competition-sport-auto.png', title: 'Flight Trophée compétition sport auto', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/flight-trophee-competition-sport-equestres.png', title: 'Flight Trophée compétition sport équestres', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/mobilier-stand-salon-merchadising.png', title: 'Mobilier stand salon merchandising', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/rack-support-racing-sport-moto.png', title: 'Rack support racing sport moto', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/mobilier-salon-stand.png', title: 'Mobilier salon stand', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/meuble-11.jpg', title: 'Meuble 11', category: 'meubles' },
  { path: 'src/assets/realisations/meubles/meuble-12.jpg', title: 'Meuble 12', category: 'meubles' },

  // Audiovisuel
  { path: 'src/assets/realisations/audiovisuel/flight-eclairage-led-tv-cine-godox.png', title: 'Flight éclairage LED TV Ciné - GODOX', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/flight-console-grandma.png', title: 'Flight console GrandMa', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/rack-ableton.png', title: 'Rack / Ableton', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/console-custom-tv-broadcast-sony.png', title: 'Console custom TV Broadcast – SONY', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/flight-lcd-samsung.png', title: 'Flight LCD – Samsung', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/rack-console-son-yamaha.png', title: 'Rack console son Yamaha', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-8.jpg', title: 'Audiovisuel 8', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-9.jpg', title: 'Audiovisuel 9', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-10.jpg', title: 'Audiovisuel 10', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-11.jpg', title: 'Audiovisuel 11', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-12.jpg', title: 'Audiovisuel 12', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-13.jpg', title: 'Audiovisuel 13', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-14.jpg', title: 'Audiovisuel 14', category: 'audiovisuel' },
  { path: 'src/assets/realisations/audiovisuel/audiovisuel-15.jpg', title: 'Audiovisuel 15', category: 'audiovisuel' },

  // Événementiel
  { path: 'src/assets/realisations/evenementiel/kit-enceintes-lacoustic-wide.jpeg', title: 'Kit enceintes L-Acoustics Wide', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/kit-platine-pioneer-dj-set-artiste.jpg', title: 'Kit Platine Pioneer DJ Set Artiste', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/rack-dj-tool-modulaire.jpeg', title: 'Rack DJ Tool modulaire', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/rack-rangement-cymbale-pour-showroom-et-backline.jpeg', title: 'Rack rangement cymbale showroom et backline', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/kit-enceintes-lacoustic.png', title: 'Kit enceintes L-Acoustics', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/trolley-pour-clavier-moog.png', title: 'Trolley pour clavier Moog', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/flight-ampli-ampeg-basse-on-stage.png', title: 'Flight ampli AMPEG Basse on stage', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/flihgt-ampli-head-laney.png', title: 'Flight ampli Head LANEY', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/rack-console-dt-case-ableton-deploye.png', title: 'Rack console DT Case / ABLETON déployé', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/rack-ampli-micro-avalon.png', title: 'Rack ampli micro Avalon', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/flight-ampli-aguilar-basse-on-stage.png', title: 'Flight ampli AGUILAR Basse on stage', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/rack-ampli-audio-db.png', title: 'Rack ampli audio D&B', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/kit-structure-scenique-rig.png', title: 'Kit structure scénique & RIG', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/flight-piano-nord-stage-3-zones.png', title: 'Flight piano Nord Stage 3', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/kit-enceintes-lacoustic-wide-2.png', title: 'Kit enceintes L-Acoustics Wide 2', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/flight-ampli-gallien-krueger-basse-on-stage.png', title: 'Flight ampli Gallien Krueger Basse on stage', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/flight-ampli-basse-on-stage-vue-connectique.png', title: 'Flight ampli Basse on stage vue Connectique', category: 'evenementiel' },
  { path: 'src/assets/realisations/evenementiel/kit-instrument-grosse-caisse-adams.png', title: 'Kit Instrument Grosse caisse Adams', category: 'evenementiel' },

  // Industrie
  { path: 'src/assets/realisations/industrie/mobilier-showroom-industrie-miele.png', title: 'Mobilier showroom industrie MIELE', category: 'industrie' },
  { path: 'src/assets/realisations/industrie/meuble-industriel-multi-layers.png', title: 'Meuble industriel multi layers', category: 'industrie' },
  { path: 'src/assets/realisations/industrie/industriel-3.jpg', title: 'Industriel 3', category: 'industrie' },
  { path: 'src/assets/realisations/industrie/industriel-4.jpg', title: 'Industriel 4', category: 'industrie' },
  { path: 'src/assets/realisations/industrie/industriel-5.jpg', title: 'Industriel 5', category: 'industrie' },
  { path: 'src/assets/realisations/autres/jsp1.jpg', title: 'Réalisation sur mesure pour besoins spécifiques', category: 'industrie' },
  { path: 'src/assets/realisations/autres/image.png', title: 'Solution de protection personnalisée', category: 'industrie' },

  // Valise Résine
  { path: 'src/assets/realisations/valiseResine/image.png', title: 'Valise résine ultra-résistante', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/image copy.png', title: 'Valise résine protection étanche antichoc', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/jsp.png', title: 'Valise résine pour matériel sensible', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/valise-resine-4.jpg', title: 'Valise Résine 4', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/valise-resine-5.jpg', title: 'Valise Résine 5', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/valise-resine-6.jpg', title: 'Valise Résine 6', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/valise-resine-7.jpg', title: 'Valise Résine 7', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/valise-resine-8.JPG', title: 'Valise Résine 8', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/valise-resine-9.jpg', title: 'Valise Résine 9', category: 'valise-resine' },
  { path: 'src/assets/realisations/valiseResine/valise-resine-10.jpg', title: 'Valise Résine 10', category: 'valise-resine' },
];

let success = 0;
let failed = 0;

for (const img of images) {
  const fullPath = resolve(ROOT, img.path);
  const publicId = `kdms/gallery/${img.category}/${img.path.split('/').pop().replace(/\.[^.]+$/, '')}`;

  try {
    const result = await cloudinary.uploader.upload(fullPath, {
      public_id: publicId,
      overwrite: false,
      context: `title=${img.title}|category=${img.category}`,
    });
    console.log(`✅ ${img.title}`);
    success++;
  } catch (err) {
    if (err.message?.includes('already exists')) {
      console.log(`⏭  ${img.title} (déjà uploadée)`);
      success++;
    } else {
      console.error(`❌ ${img.title} — ${err.message}`);
      failed++;
    }
  }
}

console.log(`\n${success} uploadées, ${failed} erreurs`);
