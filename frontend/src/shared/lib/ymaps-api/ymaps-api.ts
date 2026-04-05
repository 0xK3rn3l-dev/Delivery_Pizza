let isLoading = false;
let loaded = false;
let pendingCallbacks: (() => void)[] = [];

export const loadYmapsApi = (apiKey: string = process.env.NEXT_PUBLIC_YMAPS_API_KEY || ''): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (loaded) {
            resolve();
            return;
        }

        if (isLoading) {
            pendingCallbacks.push(() => resolve());
            return;
        }

        isLoading = true;

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.onload = () => {
            loaded = true;
            isLoading = false;
            pendingCallbacks.forEach(cb => cb());
            pendingCallbacks = [];
            resolve();
        };
        script.onerror = () => {
            isLoading = false;
            reject(new Error('Failed to load Yandex Maps API'));
        };
        document.head.appendChild(script);
    });
};