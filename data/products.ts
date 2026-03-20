export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    freshnessSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
}
export const products: Product[] = [
    {
        id: "dietcoke",
        name: "Diet Coke",
        subName: "Crisp and refreshing.",
        price: "₹40",
        description: "Zero Calories - Maximum Taste - Perfectly Carbonated",
        folderPath: "/images/dietcoke",
        themeColor: "#BDBDBD",
        gradient: "linear-gradient(135deg, #9E9E9E 0%, #424242 100%)",
        features: ["Zero Calories", "No Sugar", "Crisp Taste"],
        stats: [{ label: "Calories", val: "0" }, { label: "Sugar", val: "0g" }, { label: "Caffeine", val: "46mg" }],
        section1: { title: "Diet Coke.", subtitle: "Just the right taste." },
        section2: { title: "Unmistakable refreshment.", subtitle: "The crisp, icy taste you know and love, now in a dynamic scrollytelling experience." },
        section3: { title: "Guilt-free satisfaction.", subtitle: "Zero calories, zero sugar, full flavor." },
        section4: { title: "Classic coolness.", subtitle: "" },
        detailsSection: {
            title: "The Iconic Taste",
            description: "Diet Coke brings you the ultimate refreshing experience. Whether poured over ice or straight from a chilled bottle, its effervescent bubbles and unique flavor profile lift your spirits instantly.",
            imageAlt: "Diet Coke Details"
        },
        freshnessSection: {
            title: "Perfectly Carbonated",
            description: "Our signature bottling process locks in the perfect amount of fizz, guaranteeing that snap, crackle, and pop of freshness every time you open a bottle."
        },
        buyNowSection: {
            price: "₹40",
            unit: "per 300ml can",
            processingParams: ["Zero Sugar", "Maximum Fizz", "Chilled Delivery"],
            deliveryPromise: "Delivered ice-cold in special insulated bags.",
            returnPolicy: "100% Refreshment Guarantee."
        }
    },
    {
        id: "redbull",
        name: "Red Bull",
        subName: "Vitalizes Body and Mind.",
        price: "₹125",
        description: "Energy Drink - With Taurine - Improves Performance",
        folderPath: "/images/redbull",
        themeColor: "#0F2B5B",
        gradient: "linear-gradient(135deg, #1C3F77 0%, #0A1B3A 100%)",
        features: ["Energy Boost", "Taurine", "B-Group Vitamins"],
        stats: [{ label: "Calories", val: "110" }, { label: "Sugar", val: "27g" }, { label: "Caffeine", val: "75mg" }],
        section1: { title: "Red Bull.", subtitle: "Gives You WINGS." },
        section2: { title: "Vitalizes Body and Mind.", subtitle: "Appreciated worldwide by top athletes, students, and in highly demanding professions." },
        section3: { title: "The iconic flavor.", subtitle: "Crisp, unique, and instantly recognizable." },
        section4: { title: "Unleash your potential.", subtitle: "" },
        detailsSection: {
            title: "Performance When You Need It",
            description: "Red Bull Energy Drink's special formula contains ingredients of high quality: Caffeine, Taurine, B-Group Vitamins, Sugars, Alpine Water. It gives you the legendary boost you need to get through a tough day.",
            imageAlt: "Red Bull Details"
        },
        freshnessSection: {
            title: "Premium Ingredients",
            description: "Made with Alpine water from springs nearby the production sites in Austria and Switzerland for the highest quality."
        },
        buyNowSection: {
            price: "₹125",
            unit: "per 250ml can",
            processingParams: ["Max Energy", "Chilled", "Fast Delivery"],
            deliveryPromise: "Delivered fast to keep you moving.",
            returnPolicy: "Satisfaction Assured."
        }
    },
    {
        id: "monster",
        name: "Monster Energy",
        subName: "Unleash The Beast!",
        price: "₹150",
        description: "Original Green - Mega Size - Ultimate Energy",
        folderPath: "/images/monster",
        themeColor: "#1a1a1a",
        gradient: "linear-gradient(135deg, #1a2f1a 0%, #0a0a0a 100%)",
        features: ["Mega Energy", "Bold Flavor", "Original Green"],
        stats: [{ label: "Calories", val: "240" }, { label: "Sugar", val: "55g" }, { label: "Caffeine", val: "160mg" }],
        section1: { title: "Monster Energy.", subtitle: "Unleash The Beast!" },
        section2: { title: "Tear into a can.", subtitle: "The meanest energy drink on the planet." },
        section3: { title: "Smooth & easy drinking.", subtitle: "Packed with a vicious punch." },
        section4: { title: "Go big.", subtitle: "" },
        detailsSection: {
            title: "The Ultimate Energy Rush",
            description: "Monster Energy packs a powerful punch but has a smooth easy drinking flavor. It's the ideal combo of the right ingredients in the right proportion to deliver the big bad buzz that only Monster can.",
            imageAlt: "Monster Energy Details"
        },
        freshnessSection: {
            title: "Bold and Vicious",
            description: "A double shot of our killer energy brew. It's a wicked mega hit that delivers twice the buzz of a regular energy drink."
        },
        buyNowSection: {
            price: "₹150",
            unit: "per 500ml can",
            processingParams: ["Huge Can", "Mega Energy", "Ice Cold"],
            deliveryPromise: "Brought directly to your door.",
            returnPolicy: "No Returns on Open Cans."
        }
    }
];
