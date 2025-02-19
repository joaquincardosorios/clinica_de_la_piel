import { getPatients } from '@/api/patientsAPI'
import PatientsList from '@/components/patients/PatientsList'
import SearchPatientByLastnameForm from '@/components/patients/SearchPatientByLastnameForm'
import SearchPatientsByRutForm from '@/components/patients/SearchPatientsByRutForm'
import { PatientSearchForm } from '@/types/index'
import { Button } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type TableParams = {
    page: number
    limit: number,
}

export default function PatientListView() {
    const initialValues : PatientSearchForm & TableParams = {
        rut: '',
        last_names: '',
        page: 1,
        limit: 10

    }
    const [searchParams, setSearchParams] = useState<PatientSearchForm & TableParams>(initialValues)


    const { data, isLoading } = useQuery({
        queryKey: ['patients', searchParams],
        queryFn: () => getPatients(searchParams),
        retry: false
        
    })

    const handleSearchByRut = (rut: string) => {
        setSearchParams(prev => ({ ...prev, rut, page:1 }))
    }

    const handleSearchByLastName = (last_names: string) => {
        setSearchParams(prev => ({ ...prev, last_names, page:1 }))
    }

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => ({ ...prev, page: newPage }))
    };
    console.log(data)
    // if(isLoading) return 'Loading...'
    return (
    <div className="m-8 text-text overflow-y-auto">
        <h1 className="text-2xl font-bold text-center md:text-left">Pacientes</h1>
        <div className='flex flex-col md:flex-row gap-8 mt-8'>
            <SearchPatientsByRutForm 
                searchParams={searchParams}
                handleSearchByRut={handleSearchByRut}
            />
            <SearchPatientByLastnameForm 
                searchParams={searchParams}
                handleSearchByLastName={handleSearchByLastName}
            />
        </div>

        {isLoading ? (
        <p>Cargando</p>
        ) : (
        data ? 
        <>
            <PatientsList data={data}/>
            <div className='flex justify-center items-center gap-4 mt-4'>
                <Button
                    onClick={() => handlePageChange(searchParams.page - 1)}
                    className={`px-4 py-2 rounded-md  ${searchParams.page === 1 ? 'bg-gray-300 text-text ' : 'bg-primary text-white hover:bg-primary-hover'}`}
                    disabled={searchParams.page === 1}
                >
                    Anterior
                </Button>
                <span>{searchParams.page} / {data?.totalPages}</span>
                <Button
                    onClick={() => handlePageChange(searchParams.page + 1)}
                    className={`px-4 py-2 rounded-md  ${searchParams.page === data?.totalPages ? 'bg-gray-300 text-text ' : 'bg-primary text-white hover:bg-primary-hover'}`}
                    disabled={searchParams.page === data?.totalPages}
                >
                Siguiente
                </Button>
            </div>
        </> : <p className='p-5 text-center'>No hay datos</p>
        )}
            </div>
        )
}
