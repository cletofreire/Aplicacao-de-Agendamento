import { NextRequest, NextResponse } from "next/server";
import { DateTime, Interval } from "luxon";

type Metadata = {
    end: string;
    token: string;
    start: string;
    state: string;
};

type GenerateArrayOfYears = (arg0: {
    end: string;
    start: string;
}) => string[];

export type Holiday = {
    date?: string;
    law?: string;
    level?: string;
    name?: string;
    type?: string;
};

export const revalidate = 0;

export async function GET(request: Request) {
    const metadata: Metadata = {
        end: DateTime.now().toISO() ?? "1970-01-01",
        token: process.env.HOLIDAY_API_KEY ?? "",
        start: DateTime.now().toISO() ?? "1970-01-01",
        state: "RN"
    };

    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);

    metadata.end = params.get("end") ?? "1970-01-01";
    metadata.start = params.get("start") ?? "1970-01-01";

    const holidays: Holiday[] = [];
    const years = generateArrayOfYears({ end: metadata.end, start: metadata.start });

    for (const year in years) {
        const res = await fetch(`https://api.invertexto.com/v1/holidays/${years[year]}?token=${metadata.token}&state=${metadata.state}`);

        if (res.status === 200) holidays.push(...await res.json());
    };

    return NextResponse.json({
        holidays: holidays
    });
};

const generateArrayOfYears: GenerateArrayOfYears = ({
    end,
    start
}) => {
    const date0 = DateTime.fromISO(start);
    const date1 = DateTime.fromISO(end);

    const intervals = Interval.
        fromDateTimes(
            date0.startOf("year"),
            date1.endOf("year")
        ).
        splitBy({ year: 1 }).
        map(year => String(year.start).split("-")[0]);

    return intervals;
};