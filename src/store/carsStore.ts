// import Ofada from '@/assets/images/ofada.jpeg'
import { computed, reactive } from "vue";
import audi1 from "../assets/cars/audi1.jpg";
import audi2 from "../assets/cars/audi2.jpg";
import audi3 from "../assets/cars/audi3.jpg";
// import audi4 from "../assets/cars/audi4.jpg";
// import audi5 from "../assets/cars/audi5.jpg";
import benz1 from "../assets/cars/benz1.jpg";
import benz2 from "../assets/cars/benz2.jpg";
import benz3 from "../assets/cars/benz3.jpg";
// import benz4 from "../assets/cars/benz4.jpg";
// import benz5 from "../assets/cars/benz5.jpg";
import bmw1 from "../assets/cars/bmw1.jpg";
import bmw2 from "../assets/cars/bmw2.jpg";
import bmw3 from "../assets/cars/bmw3.jpg";
// import bmw4 from "../assets/cars/bmw4.jpg";
import bugatti1 from "../assets/cars/bugatti1.jpg";
import bugatti2 from "../assets/cars/bugatti2.jpg";
import bugatti3 from "../assets/cars/bugatti3.jpg";
// import bugatti4 from "../assets/cars/bugatti4.jpg";
// import bugatti5 from "../assets/cars/bugatti5.jpg";
import ferrari1 from "../assets/cars/ferrari1.jpg";
import ferrari2 from "../assets/cars/ferrari2.jpg";
import ferrari3 from "../assets/cars/ferrari3.jpg";
import lambo1 from "../assets/cars/lambo1.jpg";
import lambo2 from "../assets/cars/lambo2.jpg";
import lambo3 from "../assets/cars/lambo3.jpg";
import lambo4 from "../assets/cars/lambo4.jpg";
// import lambo5 from "../assets/cars/lambo5.jpg";
// import lambo6 from "../assets/cars/lambo6.jpg";
import maserati1 from "../assets/cars/maserati1.jpg";
import maserati2 from "../assets/cars/maserati2.jpg";
import maserati3 from "../assets/cars/maserati3.jpg";
import mclauren1 from "../assets/cars/mclauren1.jpg";
import mclauren2 from "../assets/cars/mclauren2.jpg";
import mclauren3 from "../assets/cars/mclauren3.jpg";
import porche1 from "../assets/cars/porche1.jpg";
import porche2 from "../assets/cars/porche2.jpg";
import porche3 from "../assets/cars/porche3.jpg";
// import porche4 from "../assets/cars/porche4.jpg";
// import porche5 from "../assets/cars/porche5.jpg";
import rollsroyce1 from "../assets/cars/rollsroyce1.jpg";
import rollsroyce2 from "../assets/cars/rollsroyce2.jpg";
import rollsroyce3 from "../assets/cars/rollsroyce3.jpg";
// import rollsroyce4 from "../assets/cars/rollsroyce4.jpg";
import tesla1 from "../assets/cars/tesla1.jpg";
import tesla2 from "../assets/cars/tesla2.jpg";
import { Car } from "../models/Car";

interface ICarsStoreState {
  cars: Car[];
  trending: Car[];
  recommended: Car[];
}

const state = reactive<ICarsStoreState>({
  cars: [
    {
      id: 1,
      year: 2020,
      make: "Audi",
      model: "XC60",
      type: "SUV",
      img: audi1,
    },
    {
      id: 2,
      year: 2020,
      make: "Benz",
      model: "XC60",
      type: "SUV",
      img: benz1,
    },
    {
      id: 3,
      year: 2020,
      make: "BMW",
      model: "XC60",
      type: "SUV",
      img: bmw1,
    },
    {
      id: 4,
      year: 2020,
      make: "Bugatti",
      model: "XC60",
      type: "SUV",
      img: bugatti1,
    },
    {
      id: 5,
      year: 2020,
      make: "Ferrari",
      model: "XC60",
      type: "SUV",
      img: ferrari1,
    },
    {
      id: 6,
      year: 2020,
      make: "Lamboghini",
      model: "XC60",
      type: "SUV",
      img: lambo1,
    },
    {
      id: 7,
      year: 2020,
      make: "aserati",
      model: "XC60",
      type: "SUV",
      img: maserati1,
    },
    {
      id: 8,
      year: 2020,
      make: "McLauren",
      model: "XC60",
      type: "SUV",
      img: mclauren1,
    },
    {
      id: 9,
      year: 2020,
      make: "Porche",
      model: "XC60",
      type: "SUV",
      img: porche1,
    },
    {
      id: 10,
      year: 2020,
      make: "Rolls Royce",
      model: "XC60",
      type: "SUV",
      img: rollsroyce1,
    },
    {
      id: 11,
      year: 2020,
      make: "Tesla",
      model: "XC60",
      type: "SUV",
      img: tesla1,
    },
    {
      id: 12,
      year: 2020,
      make: "Audi",
      model: "XC60",
      type: "SUV",
      img: audi2,
    },
    {
      id: 13,
      year: 2020,
      make: "Benz",
      model: "XC60",
      type: "SUV",
      img: benz2,
    },
    {
      id: 14,
      year: 2020,
      make: "BMW",
      model: "XC60",
      type: "SUV",
      img: bmw2,
    },
    {
      id: 15,
      year: 2020,
      make: "Bugatti",
      model: "XC60",
      type: "SUV",
      img: bugatti2,
    },
    {
      id: 16,
      year: 2020,
      make: "Ferrari",
      model: "XC60",
      type: "SUV",
      img: ferrari2,
    },
    {
      id: 17,
      year: 2020,
      make: "Lamboghini",
      model: "XC60",
      type: "SUV",
      img: lambo2,
    },
    {
      id: 18,
      year: 2020,
      make: "Maserati",
      model: "XC60",
      type: "SUV",
      img: maserati2,
    },
    {
      id: 19,
      year: 2020,
      make: "McLauren",
      model: "XC60",
      type: "SUV",
      img: mclauren2,
    },
    {
      id: 20,
      year: 2020,
      make: "Porche",
      model: "XC60",
      type: "SUV",
      img: porche2,
    },
    {
      id: 21,
      year: 2020,
      make: "Rolls Royce",
      model: "XC60",
      type: "SUV",
      img: rollsroyce2,
    },
    {
      id: 22,
      year: 2020,
      make: "Tesla",
      model: "XC60",
      type: "SUV",
      img: tesla2,
    },
    {
      id: 23,
      year: 2020,
      make: "Audi",
      model: "XC60",
      type: "SUV",
      img: audi3,
    },
    {
      id: 24,
      year: 2020,
      make: "Benz",
      model: "XC60",
      type: "SUV",
      img: benz3,
    },
    {
      id: 25,
      year: 2020,
      make: "BMW",
      model: "XC60",
      type: "SUV",
      img: bmw3,
    },
    {
      id: 26,
      year: 2020,
      make: "Bugatti",
      model: "XC60",
      type: "SUV",
      img: bugatti3,
    },
    {
      id: 27,
      year: 2020,
      make: "Ferrari",
      model: "XC60",
      type: "SUV",
      img: ferrari3,
    },
    {
      id: 28,
      year: 2020,
      make: "Lamboghini",
      model: "XC60",
      type: "SUV",
      img: lambo3,
    },
    {
      id: 29,
      year: 2020,
      make: "Maserati",
      model: "XC60",
      type: "SUV",
      img: maserati3,
    },
    {
      id: 30,
      year: 2020,
      make: "McLauren",
      model: "XC60",
      type: "SUV",
      img: mclauren3,
    },
    {
      id: 31,
      year: 2020,
      make: "Porche",
      model: "XC60",
      type: "SUV",
      img: porche3,
    },
    {
      id: 32,
      year: 2020,
      make: "Rolls Royce",
      model: "XC60",
      type: "SUV",
      img: rollsroyce3,
    },
  ],
  trending: [
    {
      id: 1,
      year: 2020,
      make: "Lamboghini",
      model: "Aventendor",
      type: "luxury",
      img: lambo4,
    },
    {
      id: 2,
      year: 2020,
      make: "Maserati",
      model: "M1",
      type: "classic",
      img: maserati1,
    },
    {
      id: 3,
      year: 2020,
      make: "Ferrari",
      model: "La Ferrari",
      type: "luxury",
      img: ferrari2,
    },
  ],
  recommended: [
    {
      id: 1,
      year: 2021,
      make: "Tesla",
      model: "Roadster",
      type: "SUV",
      img: tesla2,
    },
    {
      id: 2,
      year: 2019,
      make: "Porche",
      model: "P3",
      type: "sports",
      img: porche3,
    },
    {
      id: 3,
      year: 2016,
      make: "Rolls Royce",
      model: "Ghost",
      type: "classic",
      img: rollsroyce2,
    },
    {
      id: 4,
      year: 2018,
      make: "McLauren",
      model: "ML",
      type: "sports",
      img: mclauren3,
    },
    {
      id: 5,
      year: 2010,
      make: "Audi",
      model: "AX",
      type: "classic",
      img: audi3,
    },
    {
      id: 6,
      year: 2019,
      make: "Bugatti",
      model: "Veron",
      type: "sports",
      img: bugatti3,
    },
    {
      id: 7,
      year: 2020,
      make: "Benz",
      model: "C-Class",
      type: "clasic",
      img: benz3,
    },
  ],
});

export default {
  getters: {
    cars: computed(() => state.cars),
    trending: computed(() => state.trending),
    recommended: computed(() => state.recommended),
  },
};
