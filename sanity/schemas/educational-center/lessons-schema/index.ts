import { RocketIcon } from '@sanity/icons';
import { RuleType } from '@/sanity/ruleType';

const lessonsSchemaEducationCenter = {
    name: 'educational-lessons-select-option',
    type: 'document',
    title: 'Courses',
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
                title: 'Դասընթացներ',
            };
        },
    }
};

export default lessonsSchemaEducationCenter;
