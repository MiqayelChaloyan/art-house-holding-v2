import { ComposeIcon, RocketIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';

const lessonsSchemaEducationCenter = {
    name: 'educational-lessons-select-option',
    type: 'document',
    title: 'Request form options',
    description: 'Lesson names shown in the Educational Center request form.',
    icon: ComposeIcon,
    id: 'educational-lessons-select-option',
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
                                    title: 'Հայերեն',
                                    name: 'am',
                                    type: 'string'
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string'
                                },
                                {
                                    title: 'Русский',
                                    name: 'ru',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: "Must be unique.",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: 'course_name.en',
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
                title: 'Request form options',
                subtitle: 'Educational Center · Դասընթացներ',
            };
        },
    }
};

export default lessonsSchemaEducationCenter;
