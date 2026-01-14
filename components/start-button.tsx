import { Button } from "./ui/button";
import Link from "next/link";

const StartButton = () => {
    return (
        <Link href="/problems">
            <Button
                className="mb-12 relative px-5 py-5 bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:shadow-2xl hover:shadow-green-500/50"
            >
                <span className="relative z-10">Start Coding Today</span>
            </Button>
        </Link>
    )
}

export default StartButton;