import classNames from "classnames/dedupe";
import PropTypes from "prop-types";
import React from "react";

import PageHeaderActions from "./PageHeaderActions";
import PageHeaderBreadcrumbs from "./PageHeaderBreadcrumbs";
import PageHeaderTabs from "./PageHeaderTabs";
import SidebarToggle from "./SidebarToggle";

class PageHeader extends React.Component {
  render() {
    const {
      props: {
        actions,
        addButton,
        breadcrumbs,
        pageHeaderClassName,
        pageHeaderInnerClassName,
        pageHeaderSectionPrimaryClassName,
        secondaryContentDetail,
        pageHeaderSectionSecondaryClassName,
        supplementalContent,
        tabs,
        disabledActions,
        pageHeaderContentClassName,
        pageHeaderActionsPrimaryClassName
      }
    } = this;

    const pageHeaderClasses = classNames("page-header", pageHeaderClassName);
    const pageHeaderInnerClasses = classNames(
      "page-header-inner pod",
      pageHeaderInnerClassName
    );
    const pageHeaderSectionPrimaryClasses = classNames(
      "page-header-section page-header-section-primary",
      pageHeaderSectionPrimaryClassName
    );
    const pageHeaderSectionSecondaryClasses = classNames(
      "page-header-section page-header-section-secondary",
      pageHeaderSectionSecondaryClassName
    );
    const pageHeaderContentClasses = classNames(
      "page-header-content",
      pageHeaderContentClassName
    );
    const pageHeaderActionsPrimaryClasses = classNames(
      "page-header-actions page-header-action-primary",
      pageHeaderActionsPrimaryClassName
    );
    let secondaryContentDetailElement = null;

    if (secondaryContentDetail) {
      secondaryContentDetailElement = (
        <div className="page-header-content-section-secondary-detail">
          {secondaryContentDetail}
        </div>
      );
    }

    return (
      <div className={pageHeaderClasses}>
        <div className={pageHeaderInnerClasses}>
          <div className={pageHeaderSectionPrimaryClasses}>
            <SidebarToggle />
            <div className={pageHeaderContentClasses}>
              {breadcrumbs}
            </div>
            <div className={pageHeaderActionsPrimaryClasses}>
              <PageHeaderActions
                actions={actions}
                addButton={addButton}
                supplementalContent={supplementalContent}
                disabledActions={disabledActions}
              />
            </div>
          </div>
          <div className={pageHeaderSectionSecondaryClasses}>
            <PageHeaderTabs tabs={tabs} />
            {secondaryContentDetailElement}
          </div>
        </div>
      </div>
    );
  }
}

const classProps = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
  PropTypes.string
]);

PageHeader.defaultProps = {
  actions: [],
  tabs: [],
  disabledActions: false
};

PageHeader.propTypes = {
  addButton: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]),
  actions: PropTypes.array,
  breadcrumbs: PropTypes.node.isRequired,
  className: classProps,
  innerClassName: classProps,
  primaryContentClassName: classProps,
  secondaryContentClassName: classProps,
  secondaryContentDetail: PropTypes.node,
  supplementalContent: PropTypes.node,
  tabs: PropTypes.array,
  disabledActions: PropTypes.bool,
  pageHeaderContentClassName: classProps,
  pageHeaderActionsPrimaryClassNam: classProps
};

PageHeader.Breadcrumbs = PageHeaderBreadcrumbs;
PageHeader.Actions = PageHeaderActions;
PageHeader.Tabs = PageHeaderTabs;

module.exports = PageHeader;
