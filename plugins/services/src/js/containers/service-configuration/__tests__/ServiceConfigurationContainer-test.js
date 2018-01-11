/* eslint-disable no-unused-vars */
const React = require("react");
/* eslint-enable no-unused-vars */
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");

const Application = require("../../../structs/Application");
const ServiceConfigurationContainer = require("../ServiceConfigurationContainer");
const ServiceConfigDisplay = require("../../../service-configuration/ServiceConfigDisplay");

describe("ServiceConfigurationContainer", function() {
  const service = new Application({
    id: "/test",
    healthChecks: [{ path: "", protocol: "HTTP" }],
    cpus: 1,
    cmd: "sleep 999",
    mem: 2048,
    version: "2016-05-02T16:07:32.583Z",
    versionInfo: {
      lastConfigChangeAt: "2016-03-22T10:46:07.354Z",
      lastScalingAt: "2016-03-22T10:46:07.354Z"
    },
    versions: new Map([["2016-05-02T16:07:32.583Z", { id: "/test" }]]),
    container: {
      volumes: [
        {
          containerPath: "/mnt/volume",
          external: {
            name: "someVolume",
            provider: "dvdi",
            options: {
              "dvdi/driver": "rexray"
            }
          },
          mode: "RW"
        }
      ]
    }
  });

  beforeEach(function() {
    this.container = global.document.createElement("div");
    this.instance = ReactDOM.render(
      <ServiceConfigurationContainer
        onEditClick={function() {}}
        service={service}
      />,
      this.container
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(this.container);
  });

  describe("#render", function() {
    it.skip("renders correct id", function() {
      var serviceSpecView = TestUtils.findRenderedComponentWithType(
        this.instance,
        ServiceConfigDisplay
      );

      expect(serviceSpecView).toBeDefined();
    });

    it.skip("pass down onEditClick to ServiceConfigDisplay", function() {
      var serviceSpecView = TestUtils.findRenderedComponentWithType(
        this.instance,
        ServiceConfigDisplay
      );

      expect(serviceSpecView.props.onEditClick).toBeDefined();
    });
  });
});
