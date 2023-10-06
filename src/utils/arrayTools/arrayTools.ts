import {
    DateTime,
    Interval
} from "luxon";
import { Holiday } from "@/app/api/holiday/route";

type CreateDateArray = (arg0: {
    end: DateTime | null;
    start: DateTime | null;
}) => Promise<Date[]>;

type Date = {
    binary: number;
    date: DateTime;
    string: string;
};

type Holidays = {
    holidays: Holiday[];
};

export const arrayOffset = (array: any[], offset: number) => {
    if (
        offset <= array.length ||
        offset === 0
    ) return [...array.slice(offset), ...array.slice(0, offset)];

    const mod = offset % array.length;

    return [...array.slice(mod), ...array.slice(0, mod)];
};

export const createDateArray: CreateDateArray = async ({
    end,
    start
}) => {
    if (
        end === null ||
        start === null
    ) return [];

    if (start.toMillis() > end.toMillis()) return [];

    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/holiday?end=${end.toISODate()}&start=${start.toISODate()}`);
    // const holidays: Holidays = await response.json();

    const interval: Date[] = Interval.
        fromDateTimes(
            start.startOf("day"),
            end.endOf("day")
        ).
        splitBy({ day: 1 }).
        map((dayProp) => {
            const day = dayProp.start ?? DateTime.now();

            // const holidayIndex = holidays.holidays.findIndex((holiday) => holiday.date === day.toISODate());

            return ({
                // binary: holidayIndex === -1 ?
                //     1 :
                //     0,
                // date: day,
                // string: holidayIndex === -1 ?
                //     day.setLocale("pt-BR").toLocaleString(DateTime.DATE_SHORT) :
                //     holidays.holidays[holidayIndex].name ?? "Feriado"
                binary: 1,
                date: day,
                string: day.setLocale("pt-BR").toLocaleString(DateTime.DATE_SHORT)
            });
        });

    return interval;
};

export const patternArray = (pattern: any[], length: number, offset: number) => {
    if (pattern.length === 0) return [];

    const blocks: number = Math.floor(length / pattern.length);
    const remainder: number = length % pattern.length;

    const arrayBlocks = new Array(
        remainder === 0 ?
            blocks :
            blocks + 1
    ).fill(0).reduce((previousValue) => {
        return [...previousValue, ...pattern];
    }, []);

    return arrayOffset(arrayBlocks, offset).slice(0, length);
};