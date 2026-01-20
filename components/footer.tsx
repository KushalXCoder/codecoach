import { Link2, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
    return (
        <footer className="w-full py-5 font-sans text-white mt-15">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-lg text-primary">CodeCoach</h1>
                        <p className="max-w-md text-gray-400 text-sm mt-2">An <span className="text-blue-500">open source</span> platform for improving your coding skills. Why solve random, irrelevant problems when you can focus on what matters?</p>
                        <div className="flex items-center gap-5 mt-2">
                            <Link href="https://github.com/KushalXCoder/codecoach" target="_blank">
                                <Button className="bg-gray-500 text-white w-fit group cursor-pointer">
                                    <Star className="group-hover:fill-white" /> Give us a star
                                </Button>
                            </Link>
                            <a href="https://www.producthunt.com/products/codecoach-3?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-codecoach-3" target="_blank" rel="noopener noreferrer">
                                <img alt="CodeCoach - Practice personal curated codeforces questions | Product Hunt" width="180" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1063902&amp;theme=light&amp;t=1768919030689" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg">Product</h1>
                        <div className="flex flex-col text-gray-500 mt-1">
                            <Link href="https://github.com/KushalXCoder/codecoach" target="_blank" className="hover:underline">GitHub</Link>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg">Useful Links</h1>
                        <div className="flex flex-col text-gray-500 mt-1">
                            <Link href="/" className="hover:underline">Home</Link>
                            <Link href="/problems" className="hover:underline">Problems</Link>
                            <Link href="/profile" className="hover:underline">Profile</Link>
                        </div>
                    </div>
                </div>
                <div className="h-[0.5px] w-full bg-gray-500 my-3" />
                <div className="flex justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2026 CodeCoach. All rights reserved.</p>
                    <p>Created by {""}
                        <Link href="https://kushalxcoder.vercel.app" className="text-primary underline">TheCodster</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;