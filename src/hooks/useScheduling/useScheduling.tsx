import React from "react";
import {
    Control,
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFieldArrayUpdate,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    useFieldArray,
    useForm
} from "react-hook-form";
import {
    DateTime,
    Interval
} from "luxon";
import {
    utils,
    writeFile,
} from "xlsx";
import { Holiday } from "@/app/api/holiday/route";
import { patternArray } from "@/utils/arrayTools/arrayTools";

type Form = {
    date: {
        end: DateTime;
        start: DateTime;
    };
    drag: number[];
    holidays?: [];
    name?: string;
    names: {
        name: string;
        woman: boolean;
    }[];
    range: number[];
    schedulingPattern: {
        value: number;
    }[];
    table: any[][];
};

type DragRowFunction = (arg0: {
    direction: "left" | "right";
    getValues: UseSchedulingObject['getValues'];
    row: number;
    setValue: UseSchedulingObject['setValue'];
}) => Promise<void>;

type FetchHolidays = (arg0: {
    end: string;
    start: string;
}) => Promise<Holiday[]>;

type GenerateSchedulingFunction = (arg0: {
    generateNewDrag: boolean;
    getValues: UseSchedulingObject['getValues'];
    setValue: UseSchedulingObject['setValue'];
}) => Promise<string[][]>;

type GenerateSheetFunction = (form: Form) => Promise<void>;

type Sundays = {
    [key: string]: DateTime[];
};

type SundaysPattern = {
    [key: string]: {
        dates: DateTime[];
        pattern: number[];
    };
};

type UpdateTableFunction = (arg0: {
    generateNewDrag: boolean;
    getValues: UseSchedulingObject['getValues'];
    setValue: UseSchedulingObject['setValue'];
}) => Promise<void>;

export type UseScheduling = () => UseSchedulingObject;

export type UseSchedulingObject = {
    control: Control<Form, any>;
    dragRow: DragRowFunction;
    generateSheet: GenerateSheetFunction;
    getValues: UseFormGetValues<Form>;
    handleSubmit: UseFormHandleSubmit<Form, undefined>;
    namesFieldArray: {
        append: UseFieldArrayAppend<Form, "names">;
        fields: FieldArrayWithId<Form, "names", "id">[];
        remove: UseFieldArrayRemove;
        update: UseFieldArrayUpdate<Form, "names">;
    };
    patternFieldArray: {
        append: UseFieldArrayAppend<Form, "schedulingPattern">;
        fields: FieldArrayWithId<Form, "schedulingPattern", "id">[];
        remove: UseFieldArrayRemove;
        update: UseFieldArrayUpdate<Form, "schedulingPattern">;
    },
    register: UseFormRegister<Form>;
    setValue: UseFormSetValue<Form>;
    updateTable: UpdateTableFunction;
    watch: UseFormWatch<Form>;
};

export const useScheduling: UseScheduling = () => {
    const {
        control,
        getValues,
        handleSubmit,
        register,
        setValue,
        watch
    } = useForm<Form>({
        defaultValues: {
            date: {
                end: DateTime.now(),
                start: DateTime.now()
            },
            drag: [],
            names: [],
            range: [2, 4],
            schedulingPattern: [{ value: 0 }],
            table: []
        }
    });

    const {
        append: namesAppend,
        fields: namesFields,
        remove: namesRemove,
        update: namesUpdate
    } = useFieldArray({
        control: control,
        name: "names"
    });

    const {
        append: patternAppend,
        fields: patternFields,
        remove: patternRemove,
        update: patternUpdate
    } = useFieldArray({
        control: control,
        name: "schedulingPattern"
    });

    const dragRow = React.useCallback(dragRowFunction, []);
    const generateSheet = React.useCallback(generateSheetFunction, []);
    const updateTable = React.useCallback(updateTableFunction, []);

    React.useEffect(() => {
        updateTableFunction({
            generateNewDrag: false,
            getValues: getValues,
            setValue: setValue
        });
    }, [watch("drag")]);

    return {
        control,
        dragRow,
        generateSheet,
        getValues,
        handleSubmit,
        namesFieldArray: {
            append: namesAppend,
            fields: namesFields,
            remove: namesRemove,
            update: namesUpdate
        },
        patternFieldArray: {
            append: patternAppend,
            fields: patternFields,
            remove: patternRemove,
            update: patternUpdate
        },
        register,
        setValue,
        updateTable,
        watch
    };
};

const dragRowFunction: DragRowFunction = async ({
    direction,
    getValues,
    row,
    setValue
}) => {
    const drag = getValues("drag");

    const newDrag = drag.map((item, index) => {
        switch (direction) {
            case "left":
                if (index === row - 1) return item <= 0 ? 0 : item - 1;
                else return item;
            default:
                if (index === row - 1) return item + 1;
                else return item;
        }
    });

    setValue("drag", newDrag);
};

const fetchHolidays: FetchHolidays = async ({
    end,
    start
}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/holiday?end=${end}&start=${start}`).
        then(response => response.json()).
        then((data: { holidays: Holiday[] }) => data.holidays).
        catch(error => [] as Holiday[]);

    return response;
};

const generateSchedulingFunction: GenerateSchedulingFunction = async ({
    generateNewDrag,
    getValues,
    setValue
}) => {
    const date = getValues("date");
    const drag = getValues("drag");
    const names = getValues("names");
    const range = getValues("range");
    const schedulingPattern = getValues("schedulingPattern");

    const holidays = await fetchHolidays({
        end: date.end.toISODate() ?? "1970-01-01",
        start: date.start.toISODate() ?? "1970-01-01"
    });

    if (names.length === 0) return [];

    const days: DateTime[] = Interval.
        fromDateTimes(
            date.start.startOf("day"),
            date.end.endOf("day")
        ).
        splitBy({ day: 1 }).
        map(day => day.start ?? DateTime.now());

    const sundays: Sundays = {};
    const sundaysPattern: SundaysPattern = {};

    days.forEach((day) => {
        if (day.weekday !== 7) return;

        const month = day.month;

        sundays[month] = sundays[month] === undefined ?
            [day] :
            [...sundays[month], day]
    });

    for (const key in sundays) {
        const index01: number = 0;
        const index02: number = Math.ceil(sundays[key].length / 2);
        const pattern: number[] = sundays[key].map((sunday, jindex) => {
            if (
                jindex === index01 ||
                jindex === index02)
                return 1;

            return 0;
        });

        sundaysPattern[key] = {
            dates: sundays[key],
            pattern: pattern
        };
    };

    const patternBinary: number[] = schedulingPattern.map(item => item.value);

    const daysOff: number = patternBinary.reduce((previousValue, currentValue) => {
        if (currentValue === 0) return previousValue + 1;

        return previousValue;
    }, 0);

    const scheduling: any[][] = names.map((name, index) => {
        const pattern: number[] = patternArray(
            patternBinary,
            days.length,
            generateNewDrag === true ?
                Math.ceil(daysOff / 2) * index :
                drag[index] + (Math.ceil(daysOff / 2) * index)
        );

        const sundays: DateTime[] = [];

        for (const key in sundaysPattern) {
            const sundaysOffset: number[] = patternArray(
                sundaysPattern[key].pattern,
                sundaysPattern[key].pattern.length,
                index
            );

            let counter: number = 0;

            sundaysOffset.every((item, index) => {
                if (name.woman === true && counter === 2) return false;
                if (name.woman === false && counter === 1) return false;
                if (item === 0) return true;

                sundays.push(sundaysPattern[key].dates[index]);

                counter = counter + 1;

                return true;
            });
        };

        const patternWithSundays: number[] = days.map((day, index) => {
            const exist: boolean = sundays.some((item) => item.equals(day));

            if (!exist) return pattern[index];

            return 0;
        });

        const patternWithHolidays: number[] = days.map((day, index) => {
            const holiday: boolean = holidays.some((item) => item.date === day.toISODate());

            if (!holiday) return patternWithSundays[index];

            return 0;
        });

        return [name.name, ...patternWithHolidays];
    });

    const sumOfColumns: number[] = scheduling.
        reduce((previousValue, currentValue) => {
            return previousValue.map((row, index) => currentValue[index] + row);
        }).
        slice(1);

    const violations: boolean[] = sumOfColumns.map((sum) => {
        if (
            sum >= range[0] &&
            sum <= range[1]
        ) return false;

        return true;
    });

    const sheet: any[][] = [
        ["", ...days.map((day) => {
            const holiday: number = holidays.findIndex((item) => item.date === day.toISODate());

            if (holiday === -1) return day.setLocale("pt-BR").toLocaleString(DateTime.DATE_HUGE);

            return holidays[holiday].name;
        })],
        ...scheduling,
        ["", ...violations]
    ];

    if (generateNewDrag === true) setValue("drag", new Array(scheduling.length).fill(0));

    return sheet;
};

const generateSheetFunction: GenerateSheetFunction = async ({
    table
}) => {
    const violations = table.
        slice(-1).
        map((row) => {
            return row.map((column) => column === true ? "Violação" : "");
        });

    const sheet = [
        ...table.slice(0, table.length - 1),
        ...violations
    ];

    const worksheet = utils.aoa_to_sheet(sheet);
    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "Scheduling");

    writeFile(workbook, "Scheduling.xlsx");
};

const updateTableFunction: UpdateTableFunction = async ({
    generateNewDrag,
    getValues,
    setValue
}) => {
    const sheet = await generateSchedulingFunction({
        generateNewDrag: generateNewDrag,
        getValues: getValues,
        setValue: setValue
    });

    setValue("table", sheet);
};