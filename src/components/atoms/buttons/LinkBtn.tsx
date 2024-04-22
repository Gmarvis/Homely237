import React from "react";
export enum LinkBtnTheme {
  dark = "gray-800",
  themeColor = "primarytheme",
}

type PropTypes = { title: string; path: string; theme: LinkBtnTheme };

export const LinkBtn = ({ title, path, theme }: PropTypes) => {
  return (
    <a
      href={path}
      className={`inline-block py-2 px-4 text-white font-medium bg-${theme} duration-150  hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none`}
    >
      {title}
    </a>
  );
};
