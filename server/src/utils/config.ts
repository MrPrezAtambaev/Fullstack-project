export const getJWTConfig = () => {
	const accessSecret = process.env.JWT_ACCESS_SECRET;

	if (!accessSecret) {
		throw new Error("JWT_ACCESS_SECRET not found");
	}

	const refreshSecret = process.env.JWT_REFRESH_SECRET;

	if (!refreshSecret) {
		throw new Error("Освежитель токена не работает");
	}

	return {
		accessSecret,
		refreshSecret,
	};
};

export const config = {
	jwt: getJWTConfig(),
};
