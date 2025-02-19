import { PatientListInfo } from "@/types/index"
import { formatRut } from "@/utils/index"
import { Button } from "@headlessui/react"

type PatientListProps = {
    data: PatientListInfo
}

export default function PatientsList({data} : PatientListProps) {
  return (
    <table className="min-w-full mt-8 table-auto border-collapse border border-gray-200">
        <thead>
            <tr>
                <th className="px-4 py-2 text-left">RUT</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Apellido</th>
                <th className="px-4 py-2 text-center">Acción</th>
            </tr>
        </thead>
        <tbody>
            {data.patients?.map((patient: any) => (
                <tr key={patient._id} className="border-b border-gray-300">
                    <td className="px-4 py-2">{formatRut(patient.rut)}</td>
                    <td className="px-4 py-2">{patient.names}</td>
                    <td className="px-4 py-2">{patient.last_names}</td>
                    <td className="px-4 py-2 text-center">
                        <Button
                            onClick={() => {}}
                            className="bg-secondary hover:bg-secondary-hover text-white py-1 px-3 rounded-md"
                        >
                            Ver ficha
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}
