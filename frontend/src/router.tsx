import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import PatientListView from './views/patients/PatientListView'

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index/>
                    <Route path='/citas/crear' element={<DashboardView />}/>
                    <Route path='/citas/:citaId' element={<DashboardView />}/>
                    <Route path='/citas/:citaId/edit' element={<DashboardView />}/>
                    <Route path='/pacientes/crear' element={<DashboardView />}/>
                    <Route path='/pacientes' element={<PatientListView />}/>
                    <Route path='/pacientes/:pacienteId' element={<DashboardView />}/>
                    <Route path='/pacientes/:pacienteId/edit' element={<DashboardView />}/>
                    <Route path='/ingresos' element={<DashboardView />}/>
                    <Route path='/opciones' element={<DashboardView />}/>
                    {/*
                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />}/>
                        <Route path='/profile/update-password' element={<ChangePasswordView />}/>
                    </Route> */}


                </Route>
                {/* <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginVIew />}/>
                    <Route path='/auth/register' element={<RegisterView />}/>
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />}/>
                    <Route path='/auth/request-code' element={<RequestNewCodeView />}/>
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />}/>
                    <Route path='/auth/reset-password' element={<ResetPasswordView />}/>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='*' element={<NotFound />}/>
                </Route> */}
            </Routes>
        </BrowserRouter>
    )
}