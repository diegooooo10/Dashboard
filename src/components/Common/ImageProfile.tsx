import { NavLink } from "react-router-dom";

type ImageProfileProps = {
  src?: string | File;
  fullName: string;
  className: string;
};

export const ImageProfile = ({
  src,
  fullName,
  className,
}: ImageProfileProps) => {
  const initial = fullName.charAt(0).toUpperCase();
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const color = colors[fullName.charCodeAt(0) % colors.length];

  return (
    <NavLink to={"/home/profile"}>
      {src && typeof src === "string" ? (
        <img
          src={src}
          className={`rounded-full object-cover border border-border dark:border-border-dark ${className}`}
          alt="profile image"
        />
      ) : (
        <div
          className={`${color} text-bg font-bold text-xl w-fit py-2 px-4 rounded-full`}
        >
          {initial}
        </div>
      )}
    </NavLink>
  );
};
