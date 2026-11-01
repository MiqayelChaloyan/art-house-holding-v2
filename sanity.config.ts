import { defineConfig, buildLegacyTheme } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './sanity/schema';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, title, basePath } from './sanity/env';
import { dashboardTool, projectUsersWidget, projectInfoWidget } from '@sanity/dashboard';

import { BsDatabaseFillGear } from 'react-icons/bs';

import Structure from './sanity.structure';

const SINGLETON_TYPES = new Set([
  'art-house-home',
  'art-house-about-us',
  'art-house-contact-us',
  'about-us',
  'educational-center-contact-us',
  'educational-lessons-select-option',
  'about-us-design',
  'about-page-design',
  'price-list-design',
  'design-lessons-select-option',
  'portfolio-design',
  'design-contact-us',
  'legal-page-design',
  'about-us-language',
  'languages-select-option',
  'price-list-language',
  'promotions-languages',
  'language-contact-us',
]);

const config = defineConfig(
  {
    projectId,
    dataset,
    title,
    apiVersion,
    basePath,
    icon: BsDatabaseFillGear,
    theme: buildLegacyTheme({
      '--brand-primary': '#CE2421',
      '--default-button-primary-color': '#CE2421',
      '--state-info-color': '#CE2421',
      '--state-danger-color': '#CE2421',
      '--focus-color': '#CE2421',
      '--font-family-base': 'var(--font-inter), var(--font-arian-amu), system-ui, sans-serif',
      '--font-family-monospace': 'var(--font-inter), var(--font-arian-amu), ui-monospace, monospace',
    }),
    schema: {
      types: schemaTypes,
      templates: (templates) => templates.filter(
        ({ schemaType }) => !SINGLETON_TYPES.has(schemaType),
      ),
    },
    document: {
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId));
        }

        return prev;
      },
      actions: (prev, { schemaType }) => {
        if (!SINGLETON_TYPES.has(schemaType)) {
          return prev;
        }

        return prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate');
      },
    },
    plugins: [
      deskTool({
        structure: Structure,
      }),
      dashboardTool({
        widgets: [
          projectInfoWidget(),
          projectUsersWidget(),
        ],
      }),
      visionTool({
        defaultApiVersion: apiVersion,
        defaultDataset: dataset,
      }),
    ],
  }
);

export default config;
