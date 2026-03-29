import { Avatar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'

const HeaderHome = () => {
	return (
		<header className='sticky py-2.5 px-4 flex justify-between items-center bg-white text-black'>
			<div aria-label='Menu / Not work' title='Menu / Not work' className=''>
					<MenuIcon aria-label='Example' />
			</div>

			<div className='flex flex-row items-center bg-gray-200 w-3xl rounded-md'>
				<IconButton>
					<SearchIcon aria-label='Example' />
				</IconButton>
				<input
					type='text'
					className='w-full h-full ml-0.5 bg-transparent outline-none border-none text-sm'
					placeholder='search'
				/>
			</div>

			<div aria-label='Avatar' title='Avatar' className=''>
				<Avatar>H</Avatar>
			</div>
		</header>
	)
}

export default HeaderHome
