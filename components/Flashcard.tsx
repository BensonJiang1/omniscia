import { useState } from "react";
import { Card, CardContent } from "./ui/card";

interface FlashcardProps {
    term: string;
    definition: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ term, definition }) => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <>
            <Card onClick={handleClick} className={`transform transition-transform duration-500 ease-in-out ${flipped ? "rotate-x-180" : ""}`}>
                <CardContent className="rounded-lg flex aspect-video items-center justify-center p-6">
                    <div className={`absolute flex items-center justify-center transition-opacity duration-500 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
                        <span className="text-4xl font-semibold">{term}</span>
                    </div>
                    <div className={`absolute flex items-center justify-center  transition-opacity duration-500 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="text-4xl font-semibold rotate-x-180">{definition}</span>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Flashcard;