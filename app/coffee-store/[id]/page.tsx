import React from "react";
import Link from "next/link";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/lib/coffee-stores";
import Image from "next/image";
import { CoffeeStoreType } from "@/types";

async function getData(id: string) {
  return await fetchCoffeeStore(id);
}

export async function generateStaticParams() {
  const coffeeStores = await fetchCoffeeStores();

  return coffeeStores.map((coffeeStore: CoffeeStoreType) => {
    id: coffeeStore.id;
  });
}

const Page = async (props: { params: { id: string } }) => {
  const {
    params: { id },
  } = props;

  const coffeeStore = await getData(id);

  const { name, address, image } = coffeeStore;

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="mb-2 mt-24 text-lg font-bold">
          <Link href="/">Return Home</Link>
        </div>
        <div className="my-4">
          <h1 className="text-4xl">{name}</h1>
        </div>
        <Image
          src={image}
          width={740}
          height={360}
          alt={name}
          className="max-h-[420px] min-w-full rounded-lg border-2 sepia lg:max-w-[470px]"
        />
        <div className="glass mt-12 flex-col roudned-lg p-4 lg:mt-48">
          <p className="pl-2">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
