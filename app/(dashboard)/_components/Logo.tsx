import Image from "next/image";

const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <Image width={110} height={10} src="/logo.svg" alt="Website logo" />
        </div>
    )
}

export default Logo;