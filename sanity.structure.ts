import {
    BillIcon,
    BookIcon,
    CaseIcon,
    CogIcon,
    ComposeIcon,
    DocumentTextIcon,
    DocumentsIcon,
    EarthGlobeIcon,
    EnvelopeIcon,
    HelpCircleIcon,
    HomeIcon,
    ImagesIcon,
    MasterDetailIcon,
    TagIcon,
    UsersIcon,
} from '@sanity/icons';
import { ComponentType } from 'react';

import { artHouseEnglish } from './sanity/i18n/art-house';

type Desk = any;

const singleton = (
    S: Desk,
    {
        id,
        title,
        type,
        documentId,
        icon,
    }: {
        id: string;
        title: string;
        type: string;
        documentId: string;
        icon: ComponentType;
    },
) =>
            S.listItem()
        .id(id)
        .title(title)
        .icon(icon)
                .child(
            S.document()
                .schemaType(type)
                .documentId(documentId)
                .title(title),
        );

const collection = (
    S: Desk,
    {
        id,
        title,
        type,
        icon,
        orderField,
    }: {
        id: string;
        title: string;
        type: string;
        icon: ComponentType;
        orderField?: string;
    },
) => {
    const list = S.documentTypeList(type).title(title).id(id);

    return S.listItem()
        .id(id)
        .title(title)
        .icon(icon)
                .child(
            orderField
                ? list.defaultOrdering([{ field: orderField, direction: 'desc' }])
                : list,
        );
};

const folder = (
    S: Desk,
    {
        id,
        title,
        icon,
        items,
    }: {
        id: string;
        title: string;
        icon: ComponentType;
        items: unknown[];
    },
) =>
                            S.listItem()
        .id(id)
        .title(title)
        .icon(icon)
        .child(S.list().id(`${id}-list`).title(title).items(items));

const structure = (S: Desk) => {
    const t = (key: keyof typeof artHouseEnglish) => artHouseEnglish[key];

    return S.list()
        .id('art-house-root')
        .title(t('nav.root'))
                        .items([
            folder(S, {
                id: 'art-house-home',
                title: t('nav.home'),
                icon: HomeIcon,
                items: [
                    singleton(S, {
                        id: 'home-page',
                        title: t('nav.home-page'),
                        type: 'art-house-home',
                        documentId: 'art-house',
                        icon: HomeIcon,
                    }),
                    singleton(S, {
                        id: 'home-about',
                        title: t('nav.about'),
                        type: 'art-house-about-us',
                        documentId: 'art-house-about-us',
                        icon: UsersIcon,
                    }),
                    singleton(S, {
                        id: 'home-contact',
                        title: t('nav.contact'),
                        type: 'art-house-contact-us',
                        documentId: 'art-house-contact-us',
                        icon: EnvelopeIcon,
                    }),
                ],
            }),
            S.divider(),
            folder(S, {
                id: 'educational-center',
                title: t('nav.educational'),
                icon: BookIcon,
                items: [
                    folder(S, {
                        id: 'educational-website',
                        title: t('nav.website'),
                        icon: MasterDetailIcon,
                        items: [
                            singleton(S, {
                                id: 'educational-home',
                                title: t('nav.home-page'),
                                type: 'about-us',
                                documentId: 'about-us-educational-center',
                                icon: HomeIcon,
                            }),
                            collection(S, {
                                id: 'educational-blog',
                                title: t('nav.blog'),
                                type: 'educational-center-blog-post',
                                icon: DocumentTextIcon,
                                orderField: 'publishedAt',
                            }),
                            singleton(S, {
                                id: 'educational-contact',
                                title: t('nav.contact'),
                                type: 'educational-center-contact-us',
                                documentId: 'contact-us-educational-center',
                                icon: EnvelopeIcon,
                            }),
                        ],
                    }),
                    folder(S, {
                        id: 'educational-programs',
                        title: t('nav.programs'),
                        icon: BookIcon,
                        items: [
                            collection(S, {
                                id: 'educational-courses',
                                title: t('nav.courses'),
                                type: 'courses',
                                icon: BookIcon,
                            }),
                            singleton(S, {
                                id: 'educational-form-options',
                                title: t('nav.form-options'),
                                type: 'educational-lessons-select-option',
                                documentId: 'educational-lessons-select-option',
                                icon: ComposeIcon,
                            }),
                        ],
                    }),
                ],
            }),
            S.divider(),
            folder(S, {
                id: 'design-studio',
                title: t('nav.design'),
                icon: ImagesIcon,
                items: [
                    folder(S, {
                        id: 'design-website',
                        title: t('nav.website'),
                        icon: MasterDetailIcon,
                        items: [
                            singleton(S, {
                                id: 'design-home',
                                title: t('nav.home-page'),
                                type: 'about-us-design',
                                documentId: 'about-us-design',
                                icon: HomeIcon,
                            }),
                            singleton(S, {
                                id: 'design-about',
                                title: t('nav.about'),
                                type: 'about-page-design',
                                documentId: 'about-page-design',
                                icon: UsersIcon,
                            }),
                            collection(S, {
                                id: 'design-blog',
                                title: t('nav.blog'),
                                type: 'design-blog-post',
                                icon: DocumentTextIcon,
                                orderField: 'publishedAt',
                            }),
                            singleton(S, {
                                id: 'design-contact',
                                title: t('nav.contact'),
                                type: 'design-contact-us',
                                documentId: 'contact-us-design',
                                icon: EnvelopeIcon,
                            }),
                        ],
                    }),
                    folder(S, {
                        id: 'design-work',
                        title: t('nav.work'),
                        icon: ImagesIcon,
                        items: [
                            collection(S, {
                                id: 'design-courses',
                                title: t('nav.courses'),
                                type: 'courses-design',
                                icon: BookIcon,
                            }),
                            singleton(S, {
                                id: 'design-portfolios',
                                title: t('nav.portfolios'),
                                type: 'portfolio-design',
                                documentId: 'portfolio-design',
                                icon: ImagesIcon,
                            }),
                            collection(S, {
                                id: 'design-course-prices',
                                title: t('nav.course-prices'),
                                type: 'course-price-design',
                                icon: BillIcon,
                            }),
                        ],
                    }),
                    folder(S, {
                        id: 'design-settings',
                        title: t('nav.settings'),
                        icon: CogIcon,
                        items: [
                            singleton(S, {
                                id: 'design-form-options',
                                title: t('nav.form-options'),
                                type: 'design-lessons-select-option',
                                documentId: 'design-lessons-select-option',
                                icon: ComposeIcon,
                            }),
                            folder(S, {
                                id: 'design-legal',
                                title: t('nav.legal'),
                                icon: DocumentsIcon,
                                items: [
                                    singleton(S, {
                                        id: 'design-privacy',
                                        title: t('nav.privacy'),
                                        type: 'legal-page-design',
                                        documentId: 'legal-privacy-design',
                                        icon: DocumentsIcon,
                                    }),
                                    singleton(S, {
                                        id: 'design-terms',
                                        title: t('nav.terms'),
                                        type: 'legal-page-design',
                                        documentId: 'legal-terms-design',
                                        icon: DocumentsIcon,
                                    }),
                                    singleton(S, {
                                        id: 'design-imprint',
                                        title: t('nav.imprint'),
                                        type: 'legal-page-design',
                                        documentId: 'legal-imprint-design',
                                        icon: DocumentsIcon,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            S.divider(),
            folder(S, {
                id: 'language-studio',
                title: t('nav.language'),
                icon: EarthGlobeIcon,
                items: [
                    folder(S, {
                        id: 'language-website',
                        title: t('nav.website'),
                        icon: MasterDetailIcon,
                        items: [
                            singleton(S, {
                                id: 'language-home',
                                title: t('nav.home-page'),
                                type: 'about-us-language',
                                documentId: 'about-us-language',
                                icon: HomeIcon,
                            }),
                            collection(S, {
                                id: 'language-blog',
                                title: t('nav.blog'),
                                type: 'language-blog-post',
                                icon: DocumentTextIcon,
                                orderField: 'publishedAt',
                            }),
                            singleton(S, {
                                id: 'language-contact',
                                title: t('nav.contact'),
                                type: 'language-contact-us',
                                documentId: 'contact-us-language',
                                icon: EnvelopeIcon,
                            }),
                        ],
                    }),
                    folder(S, {
                        id: 'language-programs',
                        title: t('nav.programs'),
                        icon: EarthGlobeIcon,
                        items: [
                            collection(S, {
                                id: 'language-programs-list',
                                title: t('nav.languages'),
                                type: 'about-language',
                                icon: EarthGlobeIcon,
                            }),
                            singleton(S, {
                                id: 'language-form-options',
                                title: t('nav.form-options'),
                                type: 'languages-select-option',
                                documentId: 'languages-select-option',
                                icon: ComposeIcon,
                            }),
                            singleton(S, {
                                id: 'language-price-list',
                                title: t('nav.price-list'),
                                type: 'price-list-language',
                                documentId: 'price-list-languages',
                                icon: BillIcon,
                            }),
                            singleton(S, {
                                id: 'language-promotions',
                                title: t('nav.promotions'),
                                type: 'promotions-languages',
                                documentId: 'promotions-languages',
                                icon: TagIcon,
                            }),
                            collection(S, {
                                id: 'language-quizzes',
                                title: t('nav.quizzes'),
                                type: 'languages-quiz',
                                icon: HelpCircleIcon,
                            }),
                        ],
                    }),
                ],
            }),
            S.divider(),
            folder(S, {
                id: 'general',
                title: t('nav.general'),
                icon: CaseIcon,
                items: [
                    collection(S, {
                        id: 'partners',
                        title: t('nav.partners'),
                        type: 'partners',
                        icon: CaseIcon,
                    }),
                ],
            }),
        ]);
};

export default structure;
