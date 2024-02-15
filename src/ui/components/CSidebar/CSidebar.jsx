import { useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';
import { UserIcon, GraduationCapIcon, FileQuestionIcon } from 'lucide-react';

export const CSideBar = () => {

    const { accountType } = useSelector(state => state.auth);

    console.log(accountType)

    if (accountType === 'student') {
        return (
            <Sidebar>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={UserIcon} >
                            <span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Principal</span>
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={GraduationCapIcon}>
                            <span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Grupos</span>
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={FileQuestionIcon}>
                            <span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Cuestionarios</span>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        )
    }

    if (accountType === 'teacher') {

        return (
            <Sidebar>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={UserIcon} >
                            <span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Principal</span>
                        </Sidebar.Item>
                        <Sidebar.Collapse icon={GraduationCapIcon} label={"Grupos"} className='text-center text-tremor-title font-semibold text-tremor-content-strong'>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Crear Grupos</span></Sidebar.Item>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Modificar Grupos</span></Sidebar.Item>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Eliminar Grupos</span></Sidebar.Item>
                        </Sidebar.Collapse>
                        <Sidebar.Collapse icon={FileQuestionIcon} label={"Cuestionarios"} className='text-center text-tremor-title font-semibold text-tremor-content-strong'>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Crear Cuestionario</span></Sidebar.Item>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Eliminar Cuestionario</span></Sidebar.Item>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        )
    }
}