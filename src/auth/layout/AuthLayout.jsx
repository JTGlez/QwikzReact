/* eslint-disable react/prop-types */
import { Card } from "@tremor/react"
import { QwikzLogo } from "../../assets/img";

export const AuthLayout = ({ children }) => {
  return (
    <>
      <Card className='flex justify-center items-center min-h-screen bg-slate-100'>
        <section className='bg-gray-100 p-20 rounded shadow-md min-w-[320px] sm:min-w-[512px] lg:min-w-[620px]'>
          <div className="flex items-center flex-col justify-center lg:px-6 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                src={QwikzLogo}
                alt="Qwikz"
                className="w-40 h-40 mx-auto"
              />
              <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Log in to Qwikz!
              </h3>
              {children}
            </div>
          </div>
        </section>
      </Card>
    </>
  )
}