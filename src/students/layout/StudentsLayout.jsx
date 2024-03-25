/* eslint-disable react/prop-types */
import SideNav from "@/components/ui/side-nav"

export const StudentsLayout = ({ children }) => {

    console.log("You are in StudentsLayout.jsx")

    return (
        <>
            <div className='flex-1 flex'>
                <div className='flex-1 grid grid-cols-[minmax(4rem,_10rem)_minmax(39rem,_1fr)]'>
                    <SideNav />
                    {children}
                </div>
            </div>
        </>
    )
}