import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { HomeIcon, PlusIcon, ExitIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import { startLogout } from '@/store/auth'
import { cleanActiveGroup } from '@/store/students'

// Side navigation for students
export default function SideNav() {

	const dispatch = useDispatch();

	const onCleanGroup = () => {
		dispatch(cleanActiveGroup())
	}

	const onJoinGroup = () => {
		console.log("Joining a group for students")
	}

	const onSignOut = () => {
		dispatch(startLogout());
	}

	return (
		<aside className='space-y-1 flex flex-col col-start-1 col-end-2 py-5 px-1 sticky left-0 z-40 border-r border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<Button asChild variant='ghost' className='md:justify-start'>
				<Link onClick={onCleanGroup}>
					<HomeIcon className='h-6 w-6 md:mr-2 md:h-5 md:w-5' />
					<span className='hidden md:block'>Home</span>
				</Link>
			</Button>
			<Button asChild variant='ghost' className='md:justify-start'>
				<Link onClick={onJoinGroup}>
					<PlusIcon className='h-6 w-6 md:mr-2 md:h5 md:w-5' />
					<span className='hidden md:block'>Join Group</span>
				</Link>
			</Button>
			<Button asChild variant='ghost' className='md:justify-start'>
				<Link onClick={onSignOut}>
					<ExitIcon className='h-6 w-6 md:mr-2 md:h-5 md:w-5' />
					<span className='hidden md:block'>Logout</span>
				</Link>
			</Button>
		</aside>
	)
}