import { PatientSearchForm } from "@/types/index"
import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react"


interface SearchPatientByLastnameFormProps {
    searchParams: PatientSearchForm
    handleSearchByLastName: (last_names: string) => void
}

export default function SearchPatientByLastnameForm({searchParams, handleSearchByLastName} : SearchPatientByLastnameFormProps) {
  return (
    <Fieldset className="space-y-3">
        <Legend className="text-lg font-bold text-center md:text-left">Buscar Paciente por Apellido</Legend>
        <Field className='flex flex-col md:flex-row items-center gap-3'>
            <Label className="block mr-3 font-bold">Apellido:</Label>
            <div className='flex flex-row items-center gap-3'>
                <Input 
                    className="py-1 p-3 block rounded-md border-dark" 
                    name="apellido" 
                    value={searchParams.last_names}
                    onChange={e => handleSearchByLastName(e.target.value)}
                    placeholder='Perez Gonzalez'
                />
            </div>
        </Field>
    </Fieldset>
  )
}
