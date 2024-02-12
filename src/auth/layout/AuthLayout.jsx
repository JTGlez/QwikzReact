/* eslint-disable react/prop-types */
import { Card } from "@tremor/react"

export const AuthLayout = ({ children }) => {
  return (
    <>
      <Card className='flex justify-center items-center min-h-screen bg-slate-100'>
        <div className='bg-gray-100 p-8 rounded shadow-md min-w-[320px] sm:min-w-[512px] lg:min-w-[620px]'>
          <div className="flex items-centermin-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className='flex justify-center'>
                {/* <img className="w-28 h-28 items-center justify-center" src={CalendarLogo} />*/}
              </div>
              <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Log in to CalendarApp
              </h3>
              {children}
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}