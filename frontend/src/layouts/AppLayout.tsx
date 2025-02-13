import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";


export default function AppLayout() {
  return (
    <div
      className=""
    >
      <header
        className="bg-primary py-3 text-center text-text font-bold text-xl"
      >
        Clinica de la Piel
      </header>
      <Sidebar>
        <Outlet />
      </Sidebar>
      <footer
        className="bg-dark text-white text-xs p-2 text-center"
      >
        Sitio creado por Joaquin Cardoso
      </footer>
    </div>
  )
}
