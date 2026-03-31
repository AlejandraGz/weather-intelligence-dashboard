export interface Weather {
    name: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        pressure: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    visibility: number;
    snow?: {
        '1h'?: number;
    };
}
export interface Forecast {
    list: ForecastItem[];
    city: {
        name: string;
        country: string;
        timezone: number;

        sunrise: number;
        sunset: number;
    };
}
export interface ForecastItem {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    visibility: number;
    pop: number;
    rain?: {
        '3h'?: number;
    };
}