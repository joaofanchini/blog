import React from "react";

interface TagProps {
  label: string;
  href?: string;
  bgColorClass?: string;
  icon?: React.ReactNode
}

export default function Tag(props: TagProps) {
  const defaultColorClass = "bg-teal-700 hover:bg-teal-600";
  const defaultClasses = `${
    !!props.bgColorClass ? props.bgColorClass : defaultColorClass
  } flex justify-center items-center gap-1 px-2 py-1 cursor-pointer rounded-md transition-colors`;

  if (!!props.href) {
    return (
      <a className={defaultClasses} href={props.href}>
        {props.icon}
        {props.label}
      </a>
    );
  }

  return <span className={defaultClasses}>#{props.icon}{props.label}</span>;
}
