export const getImageUrl = (url: string): string => {
	return url.startsWith("/uploads/") ? `http://localhost:3000${url}` : url;
};
