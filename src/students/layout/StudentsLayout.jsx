/* eslint-disable react/prop-types */
import Navbar from "../../ui/components/Navbar/Navbar"

export const StudentsLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}