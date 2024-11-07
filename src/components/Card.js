import React from "react";
import Image from "next/image";

const Card = ({
    imageUrl,
    title,
    price,
    onClick,
    className = ''
}) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
            onClick={onClick}
        >
            <div className="relative aspect-square w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority={false}
                    quality={75}
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 font-bold">{price}</p>
            </div>
        </div>
    )
}
export default Card;