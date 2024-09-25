import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {Card, CardContent} from "@mui/material";
import styles from "../Styling/HighlightedProduct.module.css";


interface Product {
    id: number;
    title: string
    imgUrl?: string;
    price: number;
    dateTime: string
}

interface HighlightedProductsListProps {
    products: Product[];
}

const HighlightedProduct: React.FC<HighlightedProductsListProps> = ({products}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState("");
    const [imageSrc, setImageSrc] = useState("");

    const calculateTimeLeft = useCallback(() => {
        const now = new Date();
        const deadline = new Date(products[currentIndex].dateTime);
        const difference = deadline.getTime() - now.getTime();


        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);


            if (days > 0) return `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            if (hours > 0) return `Time left: ${hours}h ${minutes}m ${seconds}s`;
            if (minutes > 0) return `Time left: ${minutes}m ${seconds}s`;
            return `${seconds}s`;
        } else {
            return "Expired";
        }
    }, [currentIndex, products])


    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex, products, calculateTimeLeft])

    useEffect(() => {
        const img = new Image();
        img.src = products[currentIndex].imgUrl || "";
        img.onload = () => setImageSrc(img.src);
        img.onerror = () => setImageSrc("src/assets/placeholderImage.png");
    }, [currentIndex, products]);


    const nextProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    const currentProduct = products[currentIndex];


    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <CardContent className={"p-0"}>
                    <div className={styles.imageContainer}>
                        <img
                            src={imageSrc}
                            alt={currentProduct.title}
                            className={styles.image}
                        />
                        <div className={styles.timer}>
                            {timeLeft}
                        </div>
                        <div className={styles.indicator}>
                            {products.map((_, index) => (
                                <span
                                    key={index}
                                    className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{currentProduct.title}</h2>
                        <p className={styles.price}>{currentProduct.price.toFixed(2)}</p>
                    </div>
                </CardContent>
            </Card>
            <button
                onClick={prevProduct}
                className={`${styles.navButton} ${styles.prevButton}`}
            >
                <ChevronLeft className={"w-6 h-6"}/>
            </button>
            <button
                onClick={nextProduct}
                className={`${styles.navButton} ${styles.nextButton}`}
            >
                <ChevronRight className={"w-6 h-6"}/>
            </button>
        </div>
    )
}


export default HighlightedProduct;