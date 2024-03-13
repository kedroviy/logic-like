export const fetchMainPageContentAPI = async () => {
    try {
        const response = await fetch('https://logiclike.com/docs/courses.json')
        if (!response.ok) {
            throw new Error('Network error');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
