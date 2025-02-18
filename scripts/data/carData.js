// Import all brand data
import { Aiways } from './brands/aiways.js';
import { AstonMartin } from './brands/aston-martin.js';
import { Audi } from './brands/audi.js';
import { BMW } from './brands/bmw.js';
import { Byd } from './brands/byd.js';
import { Citroen } from './brands/citroen.js';
import { Fiat } from './brands/fiat.js';
import { Ford } from './brands/ford.js';
import { Hyundai } from './brands/hyundai.js';
import { Kia } from './brands/kia.js';
import { Maxus } from './brands/maxus.js';
import { MercedesBenz } from './brands/mercedes.js';
import { Mitsubishi } from './brands/mitsubishi.js';
import { Nissan } from './brands/nissan.js';
import { Opel } from './brands/opel.js';
import { Peugeot } from './brands/peugeot.js';
import { Polestar } from './brands/polestar.js';
import { Porsche } from './brands/porsche.js';
import { Skoda } from './brands/skoda.js';
import { Tesla } from './brands/tesla.js';
import { Toyota } from './brands/toyota.js';
import { Volkswagen } from './brands/volkswagen.js';
import { Volvo } from './brands/volvo.js';
import { XPeng } from './brands/xpeng.js';

// Combine all brand data
export const carData = {
  ...Aiways,
  ...AstonMartin,
  ...Audi,
  ...BMW,
  ...Byd,
  ...Citroen,
  ...Fiat,
  ...Ford,
  ...Hyundai,
  ...Kia,
  ...Maxus,
  ...MercedesBenz,
  ...Mitsubishi,
  ...Nissan,
  ...Opel,
  ...Peugeot,
  ...Polestar,
  ...Porsche,
  ...Skoda,
  ...Tesla,
  ...Toyota,
  ...Volkswagen,
  ...Volvo,
  ...XPeng
};