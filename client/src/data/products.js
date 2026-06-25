// Hardcoded dummy data for the static frontend (Week 1 — no backend yet).

import headphone from "../assets/headphone.jpeg";
import gamingHeadphones from "../assets/gaming-headphones.jpeg";
import watch from "../assets/watch.jpeg";
import laptop from "../assets/laptop.jpeg";
import camera from "../assets/camera.jpeg";
import iphone from "../assets/iphone.jpeg";
import iphone2 from "../assets/iphone2.jpeg";
import ipad from "../assets/ipad.jpeg";
import android from "../assets/android.jpeg";
import bag from "../assets/bag.jpeg";
import purse from "../assets/purse.jpeg";
import jacket from "../assets/jacket.jpeg";
import coat from "../assets/coat.jpeg";
import shirt from "../assets/shirt.jpeg";
import shirt1 from "../assets/shirt1.jpeg";
import shorts from "../assets/shorts.jpeg";
import sofa from "../assets/sofa.jpeg";
import smallChair from "../assets/small-chair.jpeg";
import pot from "../assets/pot.jpeg";
import jug from "../assets/jug.jpeg";
import dryer from "../assets/dryer.jpeg";
import coffeeMaker from "../assets/coffee-maker.jpeg";
import juiceMaker from "../assets/juice-maker.jpeg";
import book1 from "../assets/book1.jpeg";
import service1 from "../assets/img2.jpeg";
import service2 from "../assets/img3.jpeg";
import service3 from "../assets/img4.jpeg";
import service4 from "../assets/img5.jpeg";

// Re-export a couple of images that pages use directly (gallery, etc.)
export const images = { shirt, shirt1, coat, jacket, shorts, watch };

// Generic placeholder description reused across listing/detail pages.
export const sampleDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

// ---- Home left sidebar + listing filter categories ----
export const sidebarCategories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "More category",
];

// ---- Top navbar quick categories (icon row) ----
export const categories = [
  { name: "Electronics", image: laptop },
  { name: "Audio", image: headphone },
  { name: "Phones", image: iphone },
  { name: "Cameras", image: camera },
  { name: "Watches", image: watch },
  { name: "Fashion", image: jacket },
  { name: "Home & Living", image: sofa },
  { name: "Books", image: book1 },
];

// ---- Listing filters ----
export const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
export const features = [
  "Metallic",
  "Plastic cover",
  "8GB Ram",
  "Super power",
  "Large Memory",
];
export const conditions = ["Any", "Refurbished", "Brand new", "Old items"];

// ---- Hot "Deals and offers" row ----
export const deals = [
  { title: "Smart watches", discount: 25, image: watch },
  { title: "Laptops", discount: 15, image: laptop },
  { title: "GoPro cameras", discount: 40, image: camera },
  { title: "Headphones", discount: 25, image: headphone },
  { title: "Smart phones", discount: 25, image: iphone },
];

// ---- "Home and outdoor" mini grid ----
export const homeOutdoor = [
  { title: "Soft chairs", from: 19, image: smallChair },
  { title: "Sofa & chair", from: 19, image: sofa },
  { title: "Kitchen dishes", from: 19, image: pot },
  { title: "Smart watches", from: 19, image: watch },
  { title: "Kitchen mixer", from: 100, image: juiceMaker },
  { title: "Blenders", from: 39, image: jug },
  { title: "Home appliance", from: 19, image: dryer },
  { title: "Coffee maker", from: 10, image: coffeeMaker },
];

// ---- "Consumer electronics and gadgets" mini grid ----
export const consumerElectronics = [
  { title: "Smart watches", from: 19, image: watch },
  { title: "Cameras", from: 89, image: camera },
  { title: "Headphones", from: 10, image: headphone },
  { title: "Smart watches", from: 90, image: ipad },
  { title: "Gaming set", from: 35, image: gamingHeadphones },
  { title: "Laptops & PC", from: 340, image: laptop },
  { title: "Smartphones", from: 19, image: android },
  { title: "Electric kettle", from: 240, image: jug },
];

// ---- "Our extra services" ----
export const services = [
  { title: "Source from Industry Hubs", image: service1 },
  { title: "Customize Your Products", image: service2 },
  { title: "Fast, reliable shipping by ocean or air", image: service3 },
  { title: "Product monitoring and inspection", image: service4 },
];

// ---- "Suppliers by region" ----
export const regions = [
  { flag: "🇦🇪", name: "Arabic Emirates", domain: "shopname.ae" },
  { flag: "🇦🇺", name: "Australia", domain: "shopname.au" },
  { flag: "🇺🇸", name: "United States", domain: "shopname.us" },
  { flag: "🇷🇺", name: "Russia", domain: "shopname.ru" },
  { flag: "🇮🇹", name: "Italy", domain: "shopname.it" },
  { flag: "🇩🇰", name: "Denmark", domain: "denmark.com.dk" },
  { flag: "🇫🇷", name: "France", domain: "shopname.com.fr" },
  { flag: "🇨🇳", name: "China", domain: "shopname.cn" },
  { flag: "🇬🇧", name: "Great Britain", domain: "shopname.co.uk" },
  { flag: "🇮🇳", name: "India", domain: "shopname.in" },
];

// ---- Main product list — reused across pages ----
export const products = [
  {
    id: 1,
    title: "GoPro HERO9 4K Action Camera - Black",
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.5,
    reviews: 154,
    orders: 154,
    image: camera,
    category: "Cameras",
    brand: "Samsung",
    freeShipping: true,
  },
  {
    id: 2,
    title: "Canon Camera EOS 90D, Black 10x zoom",
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.0,
    reviews: 154,
    orders: 154,
    image: gamingHeadphones,
    category: "Cameras",
    brand: "Apple",
    freeShipping: true,
  },
  {
    id: 3,
    title: "Smartphone Pro Max 256GB Memory",
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.5,
    reviews: 154,
    orders: 154,
    image: iphone,
    category: "Phones",
    brand: "Apple",
    freeShipping: true,
  },
  {
    id: 4,
    title: "Smartphone Lite 128GB - Dual SIM",
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.0,
    reviews: 154,
    orders: 154,
    image: iphone2,
    category: "Phones",
    brand: "Huawei",
    freeShipping: true,
  },
  {
    id: 5,
    title: 'Ultrabook Laptop 15.6" Core i7',
    price: 998.0,
    oldPrice: 1128.0,
    rating: 5.0,
    reviews: 154,
    orders: 154,
    image: laptop,
    category: "Electronics",
    brand: "Lenovo",
    freeShipping: true,
  },
  {
    id: 6,
    title: "Smart Watch Series 6 - Silver",
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.5,
    reviews: 154,
    orders: 154,
    image: watch,
    category: "Watches",
    brand: "Apple",
    freeShipping: true,
  },
  {
    id: 7,
    title: "Wireless Over-Ear Headphones",
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.5,
    reviews: 154,
    orders: 154,
    image: headphone,
    category: "Audio",
    brand: "Samsung",
    freeShipping: true,
  },
  {
    id: 8,
    title: 'Tablet Air 10.9" Wi-Fi 64GB',
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.0,
    reviews: 154,
    orders: 154,
    image: ipad,
    category: "Electronics",
    brand: "Pocco",
    freeShipping: true,
  },
  {
    id: 9,
    title: "Android Phone 5G - 6.5 inch",
    price: 998.0,
    oldPrice: 1128.0,
    rating: 4.0,
    reviews: 154,
    orders: 154,
    image: android,
    category: "Phones",
    brand: "Samsung",
    freeShipping: false,
  },
];

// ---- "Recommended items" grid ----
export const recommendedProducts = [
  {
    id: 10,
    title: "T-shirts with multiple colors, for men",
    price: 10.3,
    rating: 4.5,
    reviews: 120,
    image: shirt,
    category: "Fashion",
  },
  {
    id: 11,
    title: "Jeans shorts for men blue color",
    price: 10.3,
    rating: 4.0,
    reviews: 88,
    image: shorts,
    category: "Fashion",
  },
  {
    id: 12,
    title: "Brown winter coat medium size",
    price: 12.5,
    rating: 4.5,
    reviews: 64,
    image: coat,
    category: "Fashion",
  },
  {
    id: 13,
    title: "Jeans bag for travel for men",
    price: 80.95,
    rating: 4.5,
    reviews: 51,
    image: bag,
    category: "Fashion",
  },
  {
    id: 14,
    title: "Leather wallet purse, hand size",
    price: 9.99,
    rating: 4.0,
    reviews: 40,
    image: purse,
    category: "Fashion",
  },
  {
    id: 15,
    title: "Canon camera black, 100x zoom",
    price: 9.99,
    rating: 4.5,
    reviews: 210,
    image: camera,
    category: "Cameras",
  },
  {
    id: 16,
    title: "Headset for gaming with mic",
    price: 8.99,
    rating: 4.0,
    reviews: 152,
    image: gamingHeadphones,
    category: "Audio",
  },
  {
    id: 17,
    title: "Smart watch silver edition",
    price: 10.3,
    rating: 4.5,
    reviews: 99,
    image: watch,
    category: "Watches",
  },
  {
    id: 18,
    title: "Jeans bag for travel, blue",
    price: 10.3,
    rating: 4.0,
    reviews: 33,
    image: bag,
    category: "Fashion",
  },
  {
    id: 19,
    title: "Headphones, noise cancelling",
    price: 80.95,
    rating: 4.5,
    reviews: 410,
    image: headphone,
    category: "Audio",
  },
  {
    id: 20,
    title: "Ceramic pot for kitchen use",
    price: 10.3,
    rating: 4.0,
    reviews: 27,
    image: pot,
    category: "Home & Living",
  },
  {
    id: 21,
    title: "Electric kettle, stainless steel",
    price: 10.3,
    rating: 4.5,
    reviews: 76,
    image: jug,
    category: "Home & Living",
  },
];

// ---- Cart items (dummy) ----
export const cartItems = [
  {
    id: 101,
    title: "T-shirts with multiple colors, for men",
    size: "medium",
    color: "blue",
    material: "Cotton",
    seller: "Artel Market",
    price: 78.0,
    qty: 9,
    image: shirt,
  },
  {
    id: 102,
    title: "Jeans shorts for men, blue color",
    size: "medium",
    color: "blue",
    material: "Cotton",
    seller: "Best Factory LLC",
    price: 39.0,
    qty: 3,
    image: shorts,
  },
  {
    id: 103,
    title: "Brown winter coat, medium size",
    size: "XL",
    color: "brown",
    material: "Wool",
    seller: "React Shop",
    price: 170.0,
    qty: 1,
    image: coat,
  },
];

// ---- "Saved for later" (dummy) ----
export const savedItems = [
  {
    id: 201,
    title: "GoPro HERO9 4K Action Camera",
    price: 99.5,
    image: camera,
  },
  {
    id: 202,
    title: "Smartphone Pro Max, 256GB",
    price: 69.99,
    image: iphone,
  },
  {
    id: 203,
    title: "Smart watch, silver edition",
    price: 80.95,
    image: watch,
  },
  {
    id: 204,
    title: "Ultrabook laptop 15.6 inch",
    price: 86.0,
    image: laptop,
  },
];
