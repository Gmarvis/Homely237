import React from "react";
import Spinner from "../Spinner";

interface PropTypes {
    loading: boolean;
    onClick: () => void;
    title: string;
}

export const ActionBtn = ({ ...props }: PropTypes) => {
    return (
        <div className="flex gap-2 items-center">
            {props.loading && <Spinner />}
            <button
                disabled={props.loading}
                onClick={props.onClick}
                className=" bg-primarytheme px-4 p-2 text-white text-xs"
            >
                {props.title}
            </button>
        </div>
    );
};
