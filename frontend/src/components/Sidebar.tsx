import { useState } from "react";
import { 
  ChevronRightIcon, 
  ChartBarSquareIcon, 
  Cog6ToothIcon,
  UsersIcon,
  UserPlusIcon,
  CalendarDaysIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";

type SidebarProps = {
  children: React.ReactNode;
}

export default function Sidebar({children} : SidebarProps) {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Calendario", icon: <CalendarIcon className="w-7"/> , to: '/'},
    { title: "Agendar Hora ", icon: <CalendarDaysIcon className="w-7"/> , to: '/citas/crear'},
    { title: "Ver Pacientes", icon: <UsersIcon className="w-7"/>, gap: true, to:'/pacientes'},
    { title: "Crear Paciente", icon: <UserPlusIcon className="w-7"/> , to: '/pacientes/crear'},
    { title: "Ingresos", icon: <ChartBarSquareIcon className="w-7"/> , gap:true, to: '/ingresos'},
    { title: "Opciones", icon: <Cog6ToothIcon className="w-7"/> , gap: true, to: '/opciones'},
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark h-screen p-5  pt-8 relative duration-300`}
      >
        <ChevronRightIcon
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark bg-white
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Joaquin Cardoso
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              {Menu.icon}
              <Link to={Menu.to} className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        {children}
      </div>
    </div>
  );
};
