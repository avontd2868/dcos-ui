import PropTypes from "prop-types";
import React, { Component } from "react";
import { Tooltip } from "reactjs-components";

import PlacementConstraintsPartial
  from "#SRC/js/components/PlacementConstraintsPartial";
import FormGroupHeading from "#SRC/js/components/form/FormGroupHeading";
import FormGroupHeadingContent
  from "#SRC/js/components/form/FormGroupHeadingContent";
import Icon from "#SRC/js/components/Icon";

export default class PlacementSection extends Component {
  render() {
    const { data, onAddItem, onRemoveItem, errors } = this.props;
    const placementTooltipContent = (
      <span>
        {
          "Constraints have three parts: a field name, an operator, and an optional parameter. The field can be the hostname of the agent node or any attribute of the agent node. "
        }
        <a
          href="https://mesosphere.github.io/marathon/docs/constraints.html"
          target="_blank"
        >
          More information
        </a>.
      </span>
    );

    return (
      <div>
        <h2 className="flush-top short-bottom">
          <FormGroupHeading>
            <FormGroupHeadingContent primary={true}>
              Placement Constraints
            </FormGroupHeadingContent>
            <FormGroupHeadingContent>
              <Tooltip
                content={placementTooltipContent}
                interactive={true}
                maxWidth={300}
                wrapText={true}
              >
                <Icon color="grey" id="circle-question" size="mini" />
              </Tooltip>
            </FormGroupHeadingContent>
          </FormGroupHeading>
        </h2>
        <p>
          Constraints control where apps run to allow optimization for either fault tolerance or locality.
        </p>
        <PlacementConstraintsPartial
          data={data}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          errors={errors}
        />
      </div>
    );
  }
}

PlacementSection.propTypes = {
  data: PropTypes.object,
  onAddItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  errors: PropTypes.object
};
