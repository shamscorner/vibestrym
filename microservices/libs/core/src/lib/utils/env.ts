export const getEnv = <T, K extends keyof T>(key: K, fallback?: T[K]): T[K] => {
	const value = process.env[String(key)] as T[K] | undefined;

	if (value === undefined) {
		// handle fallback falsy cases that should still be used as value
		if (fallback === false || fallback === '' || fallback === 0) {
			return fallback;
		}
		if (fallback) {
			return fallback;
		}
		throw new Error(`Missing environment variable: ${String(key)}.`);
	}

	return value;
};
