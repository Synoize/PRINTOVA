import upload_area from './upload_area.png'
import razorpay_logo from './razorpay_logo.png'
import logo from './logo.svg'
import paperprinter from './paperprinter.png'

export const assets = {
    upload_area,
    razorpay_logo,
    logo,
    paperprinter,
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
        img: paperprinter,
    },
    {
        id: 2,
        name: "Poster, flex & more",
        img: paperprinter,
    },
    {
        id: 3,
        name: "Custom t-shirts",
        img: paperprinter
    },
    {
        id: 4,
        name: "Goodies",
        img: paperprinter
    },
    {
        id: 5,
        name: "Visiting card",
        img: paperprinter
    },
    {
        id: 6,
        name: "Labels, Stickers & Packaging",
        img: paperprinter
    },
    {
        id: 7,
        name: "Business card",
        img: paperprinter
    },
];
