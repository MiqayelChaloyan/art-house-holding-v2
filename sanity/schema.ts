import { type SchemaTypeDefinition } from 'sanity';

import homeSchemaArtHouse from './schemas/art-house/home-schema';
import blogSchemaEducationalCenter from './schemas/educational-center/blog-schema';
import blogSchemaDesign from './schemas/design/blog-schema';
import blogSchemaLanguage from './schemas/language/blog-schema';
import aboutUsSchemaArtHouse from './schemas/art-house/about-us-schema';
import contactUsSchemaArtHouse from './schemas/art-house/contact-us-schema';
import aboutUsSchemaEducationalCenter from './schemas/educational-center/about-us-schema';
import coursesSchemaEducationalCenter from './schemas/educational-center/courses-schema';
import contactUsSchemaEducationalCenter from './schemas/educational-center/contact-us-schema';
import lessonsSchemaEducationCenter from './schemas/educational-center/lessons-schema';
import coursesSchemaLanguage from './schemas/language/courses-schema';
import languagesSchemaLanguage from './schemas/language/languages-schema';
import aboutUsSchemaLanguage from './schemas/language/about-us-schema';
import priceListSchemaLanguage from './schemas/language/price-list-schema';
import promotionsSchemaLanguage from './schemas/language/promotions-schema';
import quizSchemaLanguage from './schemas/language/quiz-schema';
import partnersSchema from './schemas/generic';
import contactUsSchemaLanguage from './schemas/language/contact-us-schema';
import aboutUsSchemaDesign from './schemas/design/about-us-schema';
import contactUsSchemaDesign from './schemas/design/contact-us-schema';
import coursesSchemaDesign from './schemas/design/courses-schema';
import priceListSchemaDesign from './schemas/design/price-list-schema';
import coursePriceSchemaDesign from './schemas/design/course-price-schema';
import lessonsSchemaDesign from './schemas/design/lessons-schema';
import portfolioSchemaDesign from './schemas/design/portfolios-schema';
import legalPageSchemaDesign from './schemas/design/legal-schema';
import aboutPageSchemaDesign from './schemas/design/about-page-schema';
import { localeString, localeText } from './schemas/shared/localeString';

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  homeSchemaArtHouse,
  blogSchemaEducationalCenter,
  blogSchemaDesign,
  blogSchemaLanguage,
  aboutUsSchemaArtHouse,
  contactUsSchemaArtHouse,
  aboutUsSchemaEducationalCenter,
  coursesSchemaEducationalCenter,
  contactUsSchemaEducationalCenter,
  lessonsSchemaEducationCenter,
  aboutUsSchemaLanguage,
  coursesSchemaLanguage,
  languagesSchemaLanguage,
  priceListSchemaLanguage,
  promotionsSchemaLanguage,
  quizSchemaLanguage,
  contactUsSchemaLanguage,
  aboutUsSchemaDesign,
  contactUsSchemaDesign,
  coursesSchemaDesign,
  priceListSchemaDesign,
  coursePriceSchemaDesign,
  lessonsSchemaDesign,
  partnersSchema,
  portfolioSchemaDesign,
  legalPageSchemaDesign,
  aboutPageSchemaDesign,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};