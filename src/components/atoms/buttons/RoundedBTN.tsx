type BtnProps = {
    text: string;
    className: string;
    onClick: () => void;
};

const RoundedBTN = ({ text, className, onClick }: BtnProps) => {
    return (
        <button
            onClick={onClick}
            className={`border px-8 rounded-[50px] py-1 text-[20px] font-bold ${className}`}
        >
            {text}
        </button>
    );
};

export default RoundedBTN;
