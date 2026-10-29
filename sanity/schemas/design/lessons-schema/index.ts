import { RocketIcon, ComposeIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';

const lessonsSchemaDesign = {
    name: 'design-lessons-select-option',
    type: 'document',
    title: 'Lessons & Orders',
    id: 'design-lessons-select-option',
    fields: [
        {
            name: 'course_name',
            type: 'array',
            title: 'Lessons Names (Դասընթացների անվանումները)',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: RocketIcon,
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
                            description: "Պիտի եզակի լինի",
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
            name: 'order_name',
            type: 'array',
            title: 'Orders Names (Պատվերների անվանումները)',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ComposeIcon,
                    fields: [
                        {
                            title: 'Order (Պատվերի անվանումը)',
                            name: 'order_name',
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
                            description: "Պիտի եզակի լինի",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'order_name.en'
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
                title: 'Դասընթացներ և պատվերներ',
            };
        },
    }
};

export default lessonsSchemaDesign;
