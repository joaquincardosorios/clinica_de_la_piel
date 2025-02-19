import { PatientSearchForm } from "@/types/index";
import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react";

interface SearchPatientsByRutFormProps {
    searchParams: PatientSearchForm
    handleSearchByRut: (rut: string) => void
}

export default function SearchPatientsByRutForm({searchParams, handleSearchByRut} : SearchPatientsByRutFormProps) {
  return (
    <Fieldset className="space-y-3">
        <Legend className="text-lg font-bold text-center md:text-left">Buscar Paciente por RUT</Legend>
        <Field className='flex flex-col md:flex-row items-center gap-3'>
            <Label className="block mr-3 font-bold">Rut:</Label>
            <div className='flex flex-row items-center gap-3'>
                <Input 
                    className="py-1 p-3 block rounded-md border-dark" 
                    name="rut" 
                    value={searchParams.rut}
                    onChange={e => handleSearchByRut(e.target.value)}
                    autoFocus
                    placeholder='12345678-9'
                />
            </div>
        </Field>
    </Fieldset>
  )
}
