/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@/components/theme-provider'
import Header from "@/components/ui/header";
import { questions as dummydata } from '@/assets/data';
import { setQuestions } from '@/store/quizzes';


export const GlobalLayout = ({ children }) => {

    // Dummy questions
    //const dispatch = useDispatch();
    //dispatch(setQuestions(dummydata));

    return (
        <div
            className='flex flex-col font-sans antialiased bg-transparent'
        >
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <div className='absolute inset-0 -z-10 h-[100%] bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]'>
                    <div className='absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]'></div>
                </div>
                <Header />
                {children}
            </ThemeProvider>
        </div>
    )
}