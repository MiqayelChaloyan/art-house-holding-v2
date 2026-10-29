import { IoFolderOpen } from 'react-icons/io5';
import { MdFolder } from 'react-icons/md';
import { MdContactSupport } from 'react-icons/md';
import { RiAiGenerate } from 'react-icons/ri';

import { StructureBuilder } from 'sanity/structure';

export default (S: any) =>
    S.list()
        .title('Base')
        .items([
            ...S.documentTypeListItems().filter(
                (listItem: any) => ![
                    'art-house-home',
                    'art-house-about-us',
                    'art-house-contact-us',
                    'educational-center-blog-post',
                    'design-blog-post',
                    'language-blog-post',
                    'about-us',
                    'courses',
                    'educational-center-contact-us',
                    'educational-lessons-select-option',
                    'languages',
                    'language-contact-us',
                    'about-language',
                    'about-us-language',
                    'price-list-language',
                    'languages-select-option',
                    'questions-language',
                    'promotions-languages',
                    'languages-quiz',
                    'about-us-design',
                    'design-contact-us',
                    'courses-design',
                    'price-list-design',
                    'design-lessons-select-option',
                    'partners',
                    'portfolio-design',
                ].includes(listItem.getId() as string)
            ),

            S.listItem()
                .title('ART-HOUSE-HOME')
                .icon(MdFolder)
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('art-house-home').documentId('art-house')),
                            S.listItem()
                                .title('About Us')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('art-house-about-us').documentId('art-house-about-us')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(MdContactSupport)
                                .child(S.document().schemaType('art-house-contact-us').documentId('art-house-contact-us')),
                        ])
                ),
            S.listItem()
                .title('ART-HOUSE-EDUCATIONAL-CENTER')
                .icon(MdFolder)
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('about-us').documentId('about-us-educational-center')),
                            S.listItem()
                                .title('Courses')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Courses')
                                        .filter('_type == "courses"')),
                            S.listItem()
                                .title('Lessons')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('educational-lessons-select-option').documentId('educational-lessons-select-option')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(MdContactSupport)
                                .child(S.document().schemaType('educational-center-contact-us').documentId('contact-us-educational-center')),
                            S.listItem()
                                .title('Blog')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Blog Posts')
                                        .filter('_type == "educational-center-blog-post"')),
                        ])
                ),
            S.listItem().title('ART-HOUSE-DESIGN')
                .icon(MdFolder)
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('about-us-design').documentId('about-us-design')),
                            S.listItem()
                                .title('Courses')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Courses')
                                        .filter('_type == "courses-design"')),
                            S.listItem()
                                .title('Price List')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('price-list-design').documentId('price-list-design')),
                            S.listItem()
                                .title('Lessons & Orders')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('design-lessons-select-option').documentId('design-lessons-select-option')),
                            S.listItem()
                                .title('Portfolios')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('portfolio-design').documentId('portfolio-design')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(MdContactSupport)
                                .child(S.document().schemaType('design-contact-us').documentId('contact-us-design')),
                            S.listItem()
                                .title('Blog')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Blog Posts')
                                        .filter('_type == "design-blog-post"')),
                        ])
                ),
            S.listItem()
                .title('ART-HOUSE-LANGUAGE')
                .icon(MdFolder)
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('about-us-language').documentId('about-us-language')),
                            S.listItem()
                                .title('Lessons')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('languages-select-option').documentId('languages-select-option')),
                            S.listItem()
                                .title('Languages')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Languages')
                                        .filter('_type == "about-language"')),
                            S.listItem()
                                .title('Price List')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('price-list-language').documentId('price-list-languages')),
                            S.listItem()
                                .title('Promotions')
                                .icon(IoFolderOpen)
                                .child(S.document().schemaType('promotions-languages').documentId('promotions-languages')),
                            S.listItem()
                                .title('Quiz')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Quiz')
                                        .filter('_type == "languages-quiz"')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(MdContactSupport)
                                .child(S.document().schemaType('language-contact-us').documentId('contact-us-language')),
                            S.listItem()
                                .title('Blog')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Blog Posts')
                                        .filter('_type == "language-blog-post"')),
                        ])
                ),
            S.listItem().title('GENERIC')
                .icon(RiAiGenerate)
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Partners')
                                .icon(IoFolderOpen)
                                .child(
                                    S.documentList()
                                        .title('Partners')
                                        .filter('_type == "partners"')),
                        ])
                ),
        ]);
