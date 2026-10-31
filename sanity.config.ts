import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from './sanity/schema';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId, title, basePath } from './sanity/env';
import { dashboardTool, projectUsersWidget, projectInfoWidget } from '@sanity/dashboard';

import { BsDatabaseFillGear } from 'react-icons/bs';

import Structure from './sanity.structure';
import { StudioFormInput } from './sanity/components/SectionDocumentInput';

const config = defineConfig(
  {
    projectId,
    dataset,
    title,
    apiVersion,
    basePath,
    schema,
    icon: BsDatabaseFillGear,
    form: {
      components: {
        input: StudioFormInput,
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
