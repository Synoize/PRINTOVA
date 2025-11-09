import upload_area from './upload_area.png'
import razorpay_logo from './razorpay_logo.png'
import logo from './logo.svg'
import paperprinter from './paperprinter.png'
import stationary_print from './stationary_print.png'
import business_card from './business_card.png'
import poster_flex_n_more from './poster_flex_n_more.png'
import labels_stickers_n_packaging from './labels_stickers_n_packaging.png'
import custom_t_shirts from './custom_t_shirts.png'
import goodies from './goodies.png'
import booklet from './booklet.png'
import report_prints from './report_prints.png'
import wedding_card from './wedding_card.png'

export const assets = {
    upload_area,
    razorpay_logo,
    logo,
    paperprinter,
    stationary_print,
    business_card,
    poster_flex_n_more,
    labels_stickers_n_packaging,
    custom_t_shirts,
    goodies,
    booklet,
    report_prints,
    wedding_card,
}

export const users = [
    {
        _id: 'user1',
        name: 'Richard James',
        image: upload_area,
        categories: "",
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 500,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        isProvider: false
    },
]

export const featuredProduct = [
    {
        id: 1,
        image: paperprinter,
        title: "Unparalleled Sound",
        description: "Experience crystal-clear audio with premium headphones.",
        more: "Bulk Order",
    },
    {
        id: 2,
        image: paperprinter,
        title: "Stay Connected",
        description: "Compact and stylish earphones for every occasion.",
        more: "Get Now",
    },
    {
        id: 3,
        image: paperprinter,
        title: "Power in Every Pixel",
        description: "Shop the latest laptops for work, gaming, and more.",
        more: "Order Now",
    },
];

export const premiumItems = [
    { name: 'Project Thesis printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Stationary Print", image: paperprinter },
    { name: 'Custom Cap printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Poster, flex & more", image: paperprinter },
    { name: 'Custom Button Badges', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Custom t-shirts", image: paperprinter },
    { name: 'Booklets Printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Goodies", image: paperprinter },
    { name: 'Awards printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Visiting card", image: paperprinter },
    { name: 'Project Thesis printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Labels, Stickers & Packaging", image: paperprinter },
    { name: 'Custom Cap printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Business card", image: paperprinter },
    { name: 'Custom Button Badges', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Stationary Print", image: paperprinter },
    { name: 'Booklets Printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Poster, flex & more", image: paperprinter },
    { name: 'Awards printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Poster, flex & more", image: paperprinter },
];

export const bestsellerProduct = [
    { name: 'Project Thesis printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Stationary Print", image: paperprinter },
    { name: 'Custom Cap printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Poster, flex & more", image: paperprinter },
    { name: 'Custom Button Badges', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Custom t-shirts", image: paperprinter },
    { name: 'Booklets Printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Goodies", image: paperprinter },
    { name: 'Awards printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Visiting card", image: paperprinter },
    { name: 'Project Thesis printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Labels, Stickers & Packaging", image: paperprinter },
    { name: 'Custom Cap printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Business card", image: paperprinter },
    { name: 'Custom Button Badges', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Stationary Print", image: paperprinter },
    { name: 'Booklets Printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Poster, flex & more", image: paperprinter },
    { name: 'Awards printing', rating: 4.5, price: 30.99, description: "Bosch hammer drill like the GBH 2-28 DV", category: "Poster, flex & more", image: paperprinter },
];

export const categories = [
    {
        id: 1,
        name: "Stationary Print",
        img: stationary_print,
    },
    {
        id: 2,
        name: "Poster, flex & more",
        img: poster_flex_n_more,
    },
    {
        id: 3,
        name: "Custom t-shirts",
        img: custom_t_shirts
    },
    {
        id: 4,
        name: "Goodies",
        img: goodies
    },
    {
        id: 5,
        name: "Visiting card",
        img: business_card
    },
    {
        id: 6,
        name: "Labels, Stickers & Packaging",
        img: labels_stickers_n_packaging
    },
    {
        id: 7,
        name: "Business card",
        img: business_card
    },
    {
        id: 8,
        name: "Booklet",
        img: booklet
    },
    {
        id: 9,
        name: "Report Prints",
        img: report_prints
    },
    {
        id: 10,
        name: "Wedding Card",
        img: wedding_card
    }
    
];
