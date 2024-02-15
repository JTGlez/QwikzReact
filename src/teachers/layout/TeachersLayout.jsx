/* eslint-disable react/prop-types */
import { Card } from "@tremor/react"
import Navbar from "../../ui/components/Navbar/Navbar"
import { CSideBar } from "../../ui/components/CSidebar/CSidebar"

export const TeachersLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="md:grid grid-cols-7 grid-rows-3 gap-0">
                <div className="Sidebar hidden md:grid col-span-0 md:col-span-2 xl:col-span-1">
                    <Card className="rounded-none h-[100vh]">
                        <CSideBar />
                    </Card>
                </div>
                <div className="Views col-span-1 md:col-span-5 row-span-3">
                    {children}
                </div>
            </div>
        </>
    )
}