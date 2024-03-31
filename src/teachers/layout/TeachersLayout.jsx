/* eslint-disable react/prop-types */
import TeacherSideNav from "@/components/ui/teacher-side-nav"

export const TeachersLayout = ({ children }) => {

    console.log("You are in TeachersLayout.jsx")

    return (
        <>
            <div className='flex'>
                <div className='flex-1 grid grid-cols-[minmax(4rem,_10rem)_minmax(39rem,_1fr)]'>
                    <TeacherSideNav />
                    {children}
                </div>
            </div>
        </>
    )
}