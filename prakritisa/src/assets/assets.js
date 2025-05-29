


// import soap1 from '../assets/Image/productImg/soap1-1.png'
// import soap2 from '../assets/Image/productImg/soap1-2.jpg'
// import soap3 from '../assets/Image/productImg/soap1-3.jpg'
// import soap4 from '../assets/Image/productImg/soap1-4.png'






// import soap1 from '../assets/Image/productImg/01.jpg'
import soap1 from '../assets/Image/productImg/soap-1.jpg'

import soap2 from '../assets/Image/productImg/02.jpg'
import soap3 from '../assets/Image/productImg/03.jpg'
import soap4 from '../assets/Image/productImg/04.jpg'

import grains1 from '../assets/Image/productImg/grains1-1.jpg'
import grains2 from '../assets/Image/productImg/grains1-2.jpg'
import grains3 from '../assets/Image/productImg/grains1-3.jpg'
import grains4 from '../assets/Image/productImg/grains1-4.jpg'


import subcategoryImg from '../assets/Image/insta-post1.jpg';


import darkcircle from '../assets/Image/shopbyconcern/dark-circles.jpg'
import dryskin from '../assets/Image/shopbyconcern/Dry-skin.jpg'
import hairthinning from '../assets/Image/shopbyconcern/hair-thinning.jpg'
import stretchmarks from '../assets/Image/shopbyconcern/stretch-mark.jpg'
import sunprotection from '../assets/Image/shopbyconcern/sun-protection.jpg'



import ShopByConcern from '../assets/Image/shopbyconcern.jpg'


export const category = [{
    id: 1,
    name: "Soap",
    slug: "soap",
},
{
    id: 2,
    name: "Grains",
    slug: "grains",
}

];

export const subcategory = [{
    id: 1,
    name: "rose",
    productType: 'simple',
    slug: "rose",
    category: "soap",
    img: subcategoryImg ,
},
{
    id: 2,
    name: "sandal",
    productType: 'simple',
    slug: "sandal",
    category: "soap",
    img:  subcategoryImg ,
},
{
    id: 3,
    name: "herbal",
    productType: 'simple',
    slug: "herbal",
    category: "soap",
    img:  subcategoryImg ,
},
{
    id: 4,
    name: "rice",
    productType: 'variable',
    slug: "rice",
    category: "grains",
    img:  subcategoryImg ,
},
{
    id: 5,
    name: "wheat",
    productType: 'variable',
    slug: "wheat",
    category: "grains",
    img:  subcategoryImg ,
},

{
    id: 6,
    name: "arhar",
    slug: "arhar",
    productType: 'variable',
    category: "grains",
    img:  subcategoryImg,
},

];


export const shopbyconcern = [{
    id: 1,
  
    slug: "soap",
    img: sunprotection,
    name: 'Sun Protection',
},
{
    id: 2,
    
    slug: "soap",
    img:darkcircle,
    name: 'Dark Circle',
},
{
    id: 3,
  
    slug: "soap",
    img: dryskin,
    name: 'Dry Skin',
},

{
    id: 4,
   
    slug: "soap",
    img: stretchmarks,
    name: 'Stretchmarks',
},
{
    id: 5,
    
    slug: "soap",
    img: hairthinning,
    name: 'Hair Thinning',
},

{
    id: 6,
    
    slug: "soap",
    img: ShopByConcern,
    name: 'Dandruff',

},


];

export const products = [{

    id: '1',
    name: 'handmade rose soap',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Facilis, molestias. amet, consectetur adipisicing elit. Facilis, molestias. ',
    description: " put product descriptio  Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Facilis, molestias. amet, consectetur adipisicing elit. Facilis, molestias. Lorem ipsum dolor sit  amet, consectetur adipisicing elit. Facilis, molestias. amet, consectetur adipisicing elit. Facilis, molestias.  ",
    additionalInformation: " show additinal information ",
    thumbImg: soap1,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    shopbyconcern: "soap",
    subcategory: ["rose"],
    sku: 'dlkfj123',
    price: '150',
    discountPrice: '200',
    shopConcern: [ "Stretchmarks", "Hair Thinning"],


}, {

    id: '2',
    name: 'Mixed herbal soap',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: " put product descriptio  ",
    additionalInformation: " show additinal information ",
    thumbImg: soap2,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: [ "sandal", "herbal"],
    sku: 'dlkfj123',
    price: '100',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 



},

{

    id: '3',
    name: 'Mixed herbal soap',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",

    thumbImg: soap3,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal"],
    sku: 'dlkfj123',
    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 

},

{
    id: '4',
    name: 'soap4',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap4,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose",  "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 




},

{
    id: '5',
    name: 'soap 5',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap1,
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Sun Protection" ], 
},
{
    id: '6',
    name: 'soap 6',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap2,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Hair Thinning"], 
},
{
    id: '7',
    name: 'soap 7',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap3,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',
    bestseller: true,
    price: '140',
    discountPrice: '150',
    shopConcern: [ "Hair Thinning", "Dry Skin"], 
},
{
    id: '8',
    name: 'soap 8',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap4,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 
},
{
    id: '9',
    name: 'soap 9',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap1,
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 
},
{
    id: '10',
    name: 'soap 10',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap1,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 
},

{
    id: '11',
    name: 'soap 11',
    slug: "nnbhjkvh",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap1,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Dandruff", "Dry Skin"], 
},
{
    id: '12',
    name: 'soap 12',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap1,
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 
    price: '140',
    discountPrice: '150',
},
{
    id: '13',
    name: 'soap 13',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap1,
    galleryImg: [soap2, soap3, soap4],
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],
    sku: 'grains123',
    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 
},
{
    id: '14',
    name: 'soap 14',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: soap1,
    galleryImg: [soap2, soap3, soap4],
    stock: '8',
    section: 'newarrival',
    productType: 'simple',
    productImg: [soap1, soap2, soap3, soap4],
    category: "soap",
    subcategory: ["rose", "sandal", "herbal"],

    price: '140',
    discountPrice: '150',
    shopConcern: [ "Stretchmarks", "Dry Skin"], 
},

{
    id: '15',
    name: 'grains 15',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",


    thumbImg: grains1,
    galleryImg: [grains2, grains3, grains4],
    stock: '8',
    section: 'newarrival',
    productType: 'variable',
    category: "grains",
    subcategory: ["rice", "wheat", "arhar"],
    sku: 'grains123',
    shopConcern: [], 

    variant: [
        { size: '500g', price: '100', discountPrice: "150" },
        { size: '1kg', price: '150', discountPrice: "200" },
        { size: '2kg', price: '200', discountPrice: "300" },
        { size: '3kg', price: '175', discountPrice: "400" },
    ],

},
{
    id: '16',
    name: 'grains 16',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: grains1,
    galleryImg: [grains2, grains3, grains4],
    productType: 'variable',
    category: "grains",
    subcategory: ["rice", "wheat", "arhar"],
    sku: 'grains123',
    bestseller: true,
    shopConcern: [ ], 
    variant: [
        { size: '500g', price: '100', discountPrice: "150" },
        { size: '1kg', price: '150', discountPrice: "200" },
        { size: '2kg', price: '200', discountPrice: "300" },
        { size: '3kg', price: '175', discountPrice: "400" },
    ],

},
{
    id: '17',
    name: 'grains 17',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: grains1,
    galleryImg: [grains2, grains3, grains4],
    category: "grains",
    productType: 'variable',
    subcategory: ["rice", "wheat", "arhar"],
    sku: 'grains123',
    shopConcern: [ ], 


    variant: [
        { size: '500g', price: '100', discountPrice: "150" },
        { size: '1kg', price: '150', discountPrice: "200" },
        { size: '2kg', price: '200', discountPrice: "300" },
        { size: '3kg', price: '175', discountPrice: "400" },
    ],

},
{
    id: '18',
    name: 'grains 18',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    additionalInformation: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
    thumbImg: grains1,
    galleryImg: [grains2, grains3, grains4],
    category: "grains",
    productType: 'variable',
    subcategory: ["rice", "wheat", "arhar"],
    sku: 'grains123',
    shopConcern: [ ], 
    variant: [
        { size: '500g', price: '100', discountPrice: "150" },
        { size: '1kg', price: '150', discountPrice: "200" },
        { size: '2kg', price: '200', discountPrice: "300" },
        { size: '3kg', price: '175', discountPrice: "400" },
    ],


},
{
    id: '19',
    name: 'grains 19',
    slug: "nnbhjkvh",
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
    description: " put product descriptio  ",
    additionalInformation: " show additinal information ",

    thumbImg: grains1,
    galleryImg: [grains2, grains3, grains4],
    category: "grains",
    productType: 'variable',
    subcategory: ["rice", "wheat", "arhar"],
    sku: 'grains123',
    shopConcern: [ ], 
    variant: [
        { size: '500g', price: '100', discountPrice: "150" },
        { size: '1kg', price: '150', discountPrice: "200" },
        { size: '2kg', price: '200', discountPrice: "300" },
        { size: '3kg', price: '175', discountPrice: "400" },
    ],

}


]