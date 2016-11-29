import React from 'react';

import ConfigurationMapHeading from '../../../../../src/js/components/ConfigurationMapHeading';
import ConfigurationMapLabel from '../../../../../src/js/components/ConfigurationMapLabel';
import ConfigurationMapRow from '../../../../../src/js/components/ConfigurationMapRow';
import ConfigurationMapSection from '../../../../../src/js/components/ConfigurationMapSection';
import ConfigurationMapValue from '../../../../../src/js/components/ConfigurationMapValue';
import ServiceConfigDisplayUtil from '../utils/ServiceConfigDisplayUtil';
import Util from '../../../../../src/js/utils/Util';

class ServiceConfigBaseSectionDisplay extends React.Component {

  shouldExcludeItem(row) {
    const {appConfig} = this.props;

    switch (row.key) {
      case 'gpus':
        return !Util.findNestedPropertyInObject(appConfig, 'gpus');
      case 'container.volumes':
        return !Util.findNestedPropertyInObject(
          appConfig, 'container.volumes.length'
        );
      default:
        return false;
    }
  }

  getDisplayValue(type, value) {
    // If the row's type is pre, we wrap it in a pre tag.
    if (type === 'pre') {
      return <pre className="flush transparent wrap">{value}</pre>;
    }

    return ServiceConfigDisplayUtil.getDisplayValue(value);
  }

  getDefinition() {
    return {values: []};
  }

  render() {
    const {appConfig} = this.props;

    const configurationMapRows = this.getDefinition().values.filter((row) => {
      // Some rows must be excluded if relevant data is missing.
      return !this.shouldExcludeItem(row);
    }).map((row, rowIndex) => {
      let reactKey = `${rowIndex}`;
      let value = Util.findNestedPropertyInObject(appConfig, row.key);

      // If a transformValue was specified on the row, we use it.
      if (row.transformValue != null) {
        value = row.transformValue(value, appConfig);
      }

      if (row.render != null) {
        // If a custom render method was specified on the row, we use that.
        return row.render(value, appConfig);
      } else if (row.heading != null) {
        // If the row is a heading, we render the heading.
        return (
          <ConfigurationMapHeading key={reactKey} level={row.headingLevel}>
            {row.heading}
          </ConfigurationMapHeading>
        );
      }

      // Otherwise we treat the row as "label:value" type display.
      return (
        <ConfigurationMapRow key={reactKey}>
          <ConfigurationMapLabel>
            {row.label}
          </ConfigurationMapLabel>
          <ConfigurationMapValue>
            {this.getDisplayValue(row.type, value)}
          </ConfigurationMapValue>
        </ConfigurationMapRow>
      );
    });

    if (configurationMapRows.length === 0) {
      return null;
    }

    return (
      <ConfigurationMapSection>
        {configurationMapRows}
      </ConfigurationMapSection>
    );
  }
}

module.exports = ServiceConfigBaseSectionDisplay;
