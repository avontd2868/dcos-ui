import DSLFilterTypes from "#SRC/js/constants/DSLFilterTypes";
import DSLFilter from "#SRC/js/structs/DSLFilter";
import TaskUtil from "../utils/TaskUtil";

const LABEL = "region";

/**
 * This filter handles the `region:XXXX` for tasks
 */
class TasksRegionFilter extends DSLFilter {
  constructor(regions = []) {
    super();
    this.regions = regions;
  }
  /**
   * Handle all `region:XXXX` attribute filters that we can handle.
   *
   * @override
   */
  filterCanHandle(filterType, filterArguments) {
    const regions = this.regions;

    return (
      filterType === DSLFilterTypes.ATTRIB &&
      filterArguments.label === LABEL &&
      regions.includes(filterArguments.text.toLowerCase())
    );
  }

  /**
   * Keep only tasks whose region matches the value of
   * the `region` label
   *
   * @override
   */
  filterApply(resultSet, filterType, filterArguments) {
    let region = "";
    const filterArgumentsValue = filterArguments.text.toLowerCase();

    if (this.regions.includes(filterArgumentsValue)) {
      region = filterArgumentsValue;
    }

    return resultSet.filterItems(task => {
      const node = TaskUtil.getNode(task);

      return node.getRegionName().toLowerCase() === region;
    });
  }
}

module.exports = TasksRegionFilter;
