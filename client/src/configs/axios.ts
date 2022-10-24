import axios from 'axios';

import { ENV } from '../constants';
import { accessToken } from '../constants/storage';

export const httpClient = axios.create({
	baseURL: `${ENV.API}`,
});

httpClient.interceptors.request.use(
	successConfig => {
		const token = sessionStorage.getItem(accessToken);

		if (token) {
			(successConfig.headers as any)['Authorization'] = `Bearer ${token}`;
		}

		return successConfig;
	},
	errorConfig => {},
);
