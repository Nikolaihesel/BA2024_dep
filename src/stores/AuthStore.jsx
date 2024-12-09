import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create(
	persist(
		(set) => ({
			user: null,

			isAuthenticated: false,
			login: (user, token) => {
				let decodedToken;
				try {
					decodedToken = jwtDecode(token);
				} catch (error) {
					console.error('Invalid token:', error);
				}

				set({
					user: { ...user, ...decodedToken },

					isAuthenticated: true,
				});
			},
			logout: () => set({ user: null, token: null, isAuthenticated: false }),
		}),
		{
			name: 'auth-storage',
		}
	)
);

export default useAuthStore;
