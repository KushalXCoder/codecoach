import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full py-5 font-sans">
            <div className="max-w-5xl mx-auto flex items-center text-white">
                <p>Made with ❤️ by {""}
                    <Link href="https://kushalxcoder.vercel.app" target="_blank" className="font-semibold text-primary">TheCodster</Link>
                </p>
            </div>
        </footer>
    )
}

export default Footer;