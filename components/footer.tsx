import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex items-center text-white py-5 font-sans">
            <p>Made with ❤️ by {""}
                <Link href="https://kushalxcoder.vercel.app" target="_blank" className="font-semibold text-primary">TheCodster</Link>
            </p>
        </footer>
    )
}

export default Footer;