"use client";

interface ICardProps {
  address: string;
  description: string;
}

interface ICardForFooter {
  name: string;
  address: string;
  description: string;
}

const Card = (props: ICardProps) => {
  const { address, description } = props;

  return (
    <div className=" flex gap-2 items-center shadow-[inset_0_0_0_2px] rounded-lg shadow-border py-2 px-4 cursor-pointer select-none hover:bg-border transition-all duration-150 ">
      <div className=" flex-1 ">
        <p>{address}</p>
        <p className=" font-extralight ">{description}</p>
      </div>
    </div>
  );
};

const cardForFooter = (props: ICardForFooter) => {
  const { address, description } = props;
  return (
    <div className=" flex gap-2 items-center shadow-[inset_0_0_0_2px] rounded-lg shadow-border py-2 px-4 cursor-pointer select-none ">
      <div className=" flex-1 ">
        <p>{address}</p>
        <p className=" font-extralight ">{description}</p>
      </div>
      <button className=" bg-red-600 py-2 px-4 rounded-lg cursor-pointer hover:bg-red-700 disabled:bg-slate-600 ">
        Send Help
      </button>
    </div>
  );
};

const Reports = () => {
  return (
    <div className=" h-full flex-1 flex gap-4 ">
      <main className=" flex-1 h-full ">this is the main view</main>
      <aside className=" w-[400px] flex flex-col gap-2 overflow-auto scroll ">
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
        <Card address="kolkata" description="this is the new description" />
      </aside>
    </div>
  );
};

export default Reports;
