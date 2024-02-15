/* eslint-disable react/prop-types */
import { Card } from "@tremor/react"
import Navbar from "../../ui/components/Navbar/Navbar"
import { CSideBar } from "../../ui/components/CSidebar/CSidebar"

export const TeachersLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="md:grid grid-cols-7 grid-rows-1 gap-0">
                <div className="Sidebar hidden md:grid col-span-0 md:col-span-2 xl:col-span-2">
                    <Card className="rounded-none h-[100vh]">
                        <CSideBar />
                    </Card>
                </div>
                <div className="Views col-span-1 md:col-span-5 ml-6 mb-2">
                    {children}
                </div>
            </div>
        </>
    )
}