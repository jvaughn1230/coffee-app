import React from "react";
import Image from "next/image";
import Link from "next/link";

type CardType = {
  name: string;
  imgUrl: string;
  href: string;
};

const Card = ({ name, imgUrl, href }: CardType) => {
  return (
    <Link href={href} className="m-auto rounded-xl broder-gray-400 shadow-2xl">
      <div
        className={`glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl`}
      >
        <div className="my-3">
          <h2>{name}</h2>
        </div>
        <div className="relative w-full h-48">
          <Image
            className="max-h-[200px] min-h-{200px} round-lg shad-lg"
            src={imgUrl}
            width={260}
            height={160}
            alt={name}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
