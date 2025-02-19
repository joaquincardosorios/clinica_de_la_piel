import api from '@/lib/axios'
import { handleErrorsAxios } from '@/utils/handleErrors'
import { dashboardPatientSchema } from '@/types/index'

export async function getPatients(searchParams: { rut?: string, last_name?: string}) {
    try {
       const { data } = await api.get('/patient', {params: searchParams})
       const result = dashboardPatientSchema.safeParse(data)
       if(!result.success) throw new Error(result.error.message)
       return result.data
    } catch (error) {
        handleErrorsAxios(error)
    }
}