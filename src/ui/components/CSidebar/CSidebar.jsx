import { useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';
import { Divider } from '@tremor/react';
import { HiInbox, HiTable, HiUser } from 'react-icons/hi';

export const CSideBar = () => {

    const { accountType } = useSelector(state => state.auth);

    if (accountType === 'student') {
        return (
            <Sidebar>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="/" icon={HiUser} >
                            <span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Principal</span>
                        </Sidebar.Item>
                        <Divider></Divider>
                        <Sidebar.Item href="#" icon={HiTable}>
                            <span className='text-center text-tremor-subtitle font-semibold text-tremor-content-strong'>Grupos</span>
                        </Sidebar.Item>
                        <Divider></Divider>
                        <Sidebar.Item href="#" icon={HiInbox}>
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
                        <Sidebar.Item href="/" icon={HiUser} >
                            <span className='text-center text-tremor-title font-semibold text-tremor-content-strong'>Principal</span>
                        </Sidebar.Item>
                        <Divider></Divider>
                        <Sidebar.Collapse icon={HiTable} label={"Grupos"} className='text-center text-tremor-title font-semibold text-tremor-content-strong'>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-subtitle font-semibold text-tremor-content-strong'>Crear</span></Sidebar.Item>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-subtitle font-semibold text-tremor-content-strong'>Modificar</span></Sidebar.Item>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-subtitle font-semibold text-tremor-content-strong'>Eliminar</span></Sidebar.Item>
                        </Sidebar.Collapse>
                        <Divider></Divider>
                        <Sidebar.Collapse icon={HiInbox} label={"Cuestionarios"} className='text-center text-tremor-title font-semibold text-tremor-content-strong'>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-subtitle font-semibold text-tremor-content-strong'>Crear</span></Sidebar.Item>
                            <Sidebar.Item href="#"><span className='text-center text-tremor-subtitle font-semibold text-tremor-content-strong'>Eliminar</span></Sidebar.Item>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        )
    }
}