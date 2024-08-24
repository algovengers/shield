"use client";

import Map from "@/map";
import { SetStateAction, useEffect, useState } from "react";

interface ICardProps {
  text: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  setPosition: React.Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

interface ICardForFooter {
  name: string;
  address: string;
  description: string;
}

const Card = (props: ICardProps) => {
  const { address, name, lat, lng, setPosition } = props;

  return (
    <div
      className=" flex gap-2 items-center shadow-[inset_0_0_0_2px] rounded-lg shadow-border py-2 px-4 cursor-pointer select-none hover:bg-border transition-all duration-150 "
      onClick={() => setPosition({ lat, lng })}
    >
      <div className=" flex-1 ">
        <p>{name}</p>
        <p className=" font-extralight ">{address}</p>
      </div>
      <button className=" bg-red-600 py-2 px-4 rounded-lg cursor-pointer hover:bg-red-700 disabled:bg-slate-600 ">
        Send Help
      </button>
    </div>
  );
};

const DashboardPage = () => {
  const [position, setPosition] = useState({
    lat: 22.58436,
    lng: 88.44294,
  });

  return (
    <div className=" h-full flex gap-4 ">
      <div className=" flex-1 h-full ">
        <Map position={position} setPosition={setPosition} />
      </div>
      <aside className=" w-[400px]  flex flex-col gap-2 overflow-auto scroll ">
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
        <Card
          text="this is a new card"
          name="Affef uddin"
          address="kolkata"
          lat={55.52}
          lng={20}
          setPosition={setPosition}
        />
      </aside>
    </div>
  );
};

export default DashboardPage;
