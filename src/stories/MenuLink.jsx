import { action } from '@storybook/addon-actions';
import MenuLink from '../components/Links/MenuLink'; // Update the path if needed

export default {
	title: 'Components/MenuLink',
	component: MenuLink,
};

export const Default = {
	args: {
		NavText: 'Home',
		Param: '/home',
		Icon: <span>🏠</span>,
		SubMenu: [
			{ label: 'SubLink 1', path: '/home/sublink1' },
			{ label: 'SubLink 2', path: '/home/sublink2' },
		],
	},
};

export const WithoutIcon = {
	args: {
		NavText: 'Profile',
		Param: '/profile',
		SubMenu: [
			{ label: 'Settings', path: '/profile/settings' },
			{ label: 'Logout', path: '/profile/logout' },
		],
	},
};

export const NoSubMenu = {
	args: {
		NavText: 'Dashboard',
		Param: '/dashboard',
		Icon: <span>📊</span>,
	},
};

export const EmptySubMenu = {
	args: {
		NavText: 'Notifications',
		Param: '/notifications',
		Icon: <span>🔔</span>,
		SubMenu: [],
	},
};
