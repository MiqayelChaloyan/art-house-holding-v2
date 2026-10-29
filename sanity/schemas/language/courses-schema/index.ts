import { EarthGlobeIcon, CalendarIcon, ClockIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';

const coursesSchemaLanguage = {
    name: 'languages-select-option',
    type: 'document',
    title: 'Courses',
    id: 'languages-select-option',
    fields: [
        {
            name: 'course_name',
            type: 'array',
            title: 'Lessons Names (Դասընթացների անվանումները)',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: EarthGlobeIcon,
                    fields: [
                        {
                            title: 'Course Name (Դասընթացի անվանումը)',
                            name: 'course_name',
                            type: 'object',
                            validation: (Rule: any) => Rule.required(),
                            fields: [
                                {
                                    title: 'Armenian',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Russian',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: "Must be unique",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'course_name.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                }
            ]
        },
        {
            name: 'week_number_of_lessons',
            type: 'array',
            title: 'Quantity of lessons per week (Դասերի քանակը շաբաթական)',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CalendarIcon,
                    fields: [
                        {
                            title: 'Quantity of lessons per week (Դասերի քանակը շաբաթական)',
                            name: 'week_number_of_lessons',
                            type: 'object',
                            validation: (Rule: any) => Rule.required(),
                            fields: [
                                {
                                    title: 'Armenian',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Russian',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: "Number of classes in weekly numbers (Դասերի քանակը շաբաթական' թվերով)",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'week_number_of_lessons.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                }
            ]
        },
        {
            name: 'course_type',
            type: 'array',
            title: 'Course type (Դասընթացի տեսակը)',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClockIcon,
                    fields: [
                        {
                            title: 'Course type (Դասընթացի տեսակը)',
                            name: 'course_type',
                            type: 'object',
                            validation: (Rule: any) => Rule.required(),
                            fields: [
                                {
                                    title: 'Armenian',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Russian',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: "96֊խմբային, 98֊անհատական, 146-ընտանեկան փաթեթ, 150-անհատական լեզվակիր մասնագետ",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'course_type.en'
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    },
                }
            ]
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Դասընթացներ',
            };
        },
    }
};

export default coursesSchemaLanguage;
