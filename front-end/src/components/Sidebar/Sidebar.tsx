import {
  HomeIcon,
  ChartPieIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import SidebarItem, { SidebarItemProps } from "../SidebarItem/SidebarItem";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../public/logo.svg";

function Sidebar() {
  const actualPath = useLocation().pathname;
  const selectedItemValue: { [key: string]: number } = {
    "/": 1,
    "/simulacao": 2,
    "/metricas": 3,
  };
  const [selectedItem, setSelectedItem] = useState<number>();

  useEffect(() => {
    setSelectedItem(selectedItemValue[actualPath]);
    // eslint-disable-next-line
  }, [actualPath]);

  const sidebarTopItems: Array<SidebarItemProps> = [
    {
      itemId: 1,
      link: "/",
      tooltipText: "Home",
      defaultIcon: <HomeIcon className="h-6 w-6" />,
      selectedIcon: <HomeIcon className="h-6 w-6 stroke-black" />,
    },
    {
      itemId: 2,
      link: "/simulacao",
      tooltipText: "Simulação",
      defaultIcon: <ArrowRightCircleIcon className="h-6 w-6" />,
      selectedIcon: <ArrowRightCircleIcon className="h-6 w-6 stroke-black" />,
    },
    {
      itemId: 3,
      link: "/metricas",
      tooltipText: "Métricas",
      defaultIcon: <ChartPieIcon className="h-6 w-6" />,
      selectedIcon: <ChartPieIcon className="h-6 w-6 stroke-black" />,
    },
  ];

  return (
    <aside className="h-screen sticky top-0 w-32 pt-8 flex flex-col items-center z-20">
      <div className="h-16 w-16 pl-0.25 flex items-center justify-center bg-[#dedede] rounded-full">
        <img
          src={Logo}
          alt="Mobilitas"
          className="h-10 w-10"
          draggable="false"
        />
      </div>
      <div className="pt-12 flex flex-col gap-y-7">
        {sidebarTopItems.map((sidebarItem) => {
          return (
            <SidebarItem
              key={sidebarItem.itemId}
              itemId={sidebarItem.itemId}
              link={sidebarItem.link}
              selectedIcon={sidebarItem.selectedIcon}
              defaultIcon={sidebarItem.defaultIcon}
              tooltipText={sidebarItem.tooltipText}
              selectedItem={selectedItem}
            />
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
