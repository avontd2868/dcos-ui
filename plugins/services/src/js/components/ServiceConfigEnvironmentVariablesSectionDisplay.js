import React from 'react';
import {Table} from 'reactjs-components';

import ServiceConfigBaseSectionDisplay from './ServiceConfigBaseSectionDisplay';
import ServiceConfigDisplayUtil from '../utils/ServiceConfigDisplayUtil';

class ServiceConfigEnvironmentVariablesSectionDisplay extends ServiceConfigBaseSectionDisplay {
  /**
  * @override
  */
  shouldExcludeItem() {
    const {appConfig: {env}} = this.props;

    return env == null ||
        Object.keys(env).length === 0 ||
        Object.keys(env).every(function (key) {
          return typeof env[key] !== 'string';
        });
  }

  /**
   * @override
   */
  getDefinition() {
    return {
      values: [
        {
          key: 'env',
          heading: 'Environment Variables',
          headingLevel: 1
        },
        {
          key: 'env',
          render: (envData) => {
            const columns = [
              {
                heading: ServiceConfigDisplayUtil.getColumnHeadingFn('Key'),
                prop: 'key',
                render: (prop, row) => {
                  return <code>{row[prop]}</code>;
                },
                className: ServiceConfigDisplayUtil.getColumnClassNameFn(
                  'configuration-map-table-label'
                ),
                sortable: true
              },
              {
                heading: ServiceConfigDisplayUtil.getColumnHeadingFn('Value'),
                prop: 'value',
                render: (prop, row) => {
                  let value = row[prop];

                  return ServiceConfigDisplayUtil.getDisplayValue(value);
                },
                className: ServiceConfigDisplayUtil.getColumnClassNameFn(
                  'configuration-map-table-value'
                ),
                sortable: true
              }
            ];

            const data = Object.keys(envData).map((envKey) => {
              return {key: envKey, value: envData[envKey]};
            }).filter(function ({value}) {
              return typeof value === 'string';
            });

            return (
              <Table key="secrets-table"
                className="table table-simple table-break-word flush-bottom"
                columns={columns}
                data={data} />
            );
          }
        }
      ]
    };
  }
}

module.exports = ServiceConfigEnvironmentVariablesSectionDisplay;
