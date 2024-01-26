import type { Meta, StoryObj } from "@storybook/html";

import type {
  IInputs,
  IOutputs,
} from "../CountryPicker/generated/ManifestTypes";

import { useArgs, useEffect } from "@storybook/preview-api";

import {
  ComponentFrameworkMockGenerator,
  EnumPropertyMock,
  StringPropertyMock,
} from "@shko.online/componentframework-mock";

import { CountryPicker as Component } from "../CountryPicker/";

// Note: Import the css fields defined in your manifest so that these styles can be applied to your component in the story.

// Note: Define an interface for your story arguments (which can be controlled with the Controls addon)
interface StoryArgs {
  isDisabled: boolean;
  isVisible: boolean;
  countrycode: string;
  countryname: string;
  language: "en" | "de" | "es" | "fr" | "ja" | "it" | "pt" | "nl" | "fa";
  promoted: string;
  limit: string;
  displayinfo: "true" | "false";
  masked: boolean;
}

// This defines your component's Story
export default {
  title: "Country Picker/Demo",
  // Note: ArgTypes controls the way inputs are rendered in the Controls addon.
  argTypes: {
    countrycode: {
      control: "text",
      name: "Country Code",
      description:
        "Bound Country field (represents ISO 3166-1 3-letter country code)",
      table: {
        type: {
          summary: `ALB | USA | CAN | MEX | DEU | CHE | ITA | ...`,
        },
        category: "Parameters",
      },
    },
    displayinfo: {
      control: "select",
      name: "Display Info",
      description:
        "Display Info Panel to show more info about the selected country",
      options: ["true", "false"],
      table: {
        category: "Parameters",
      },
    },
    language: {
      control: "select",
      name: "Language",
      options: ["en", "de", "es", "fr", "ja", "it", "pt", "nl", "fa"],
      description:
        "Base language for country names. Available languages (English, German, Spanish, French, Japanese, Italian, Portuguese, Dutch, Persian)",
      table: {
        type: {
          summary: `en | de | es | fr | ja | it | pt | nl | fa`,
        },
        category: "Parameters",
      },
    },

    isDisabled: {
      name: "Disabled",
      control: "boolean",
      description: "PCF control is disabled or not",
      defaultValue: false,
      table: {
        type: { summary: "Boolean" },
        category: "Mode",
      },
    },
    isVisible: {
      control: "boolean",
      description: "PCF control is visible or not",
      name: "Visible",
      table: {
        type: { summary: "Boolean" },
        category: "Mode",
      },
    },
  },
  // Note: you can define the default arguments of all the stories related to this component here
  args: {
    isDisabled: false,
    isVisible: true,
    countrycode: "",
    language: "en",
    displayinfo: "true",
  },
  decorators: [
    // Note: You can control the div assigned to your PCF component here.
    // Also, you can make this div resizable if you want to test trackContainerResize
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.maxWidth = "350px";
      container.style.border = "dotted 1px";

      var storyResult = Story();
      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
  parameters: {
    controls: {
      exclude: /.*/g,
    },
  },
} as Meta<StoryArgs>;

// This render generator is used to control how the component is rendered for each story.
// With the help of ComponentFrameworkGenerator you can run your component with a fake version
// of the ComponentFramework API
const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    // Fires on unload story
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          countrycode: StringPropertyMock,
          countryname: StringPropertyMock,
          language: EnumPropertyMock,
          promoted: StringPropertyMock,
          limit: StringPropertyMock,
          displayinfo: EnumPropertyMock,
        },
        container,
        {
          countrycode: "string",
          countryname: "string",
        }
      );

      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context._parameters.countrycode.security = {
        editable: true,
        readable: true,
        secured: args.masked,
      };
      mockGenerator.context._SetCanvasItems({
        countrycode: args.countrycode,
        language: args.language,
        displayinfo: args.displayinfo,
        countryname: args.countryname,
        limit: args.limit,
        promoted: args.promoted,
      });

      mockGenerator.onOutputChanged.callsFake(() => {
        mockGenerator.context._parameters.countrycode._Refresh();
        updateArgs({
          countrycode:
            mockGenerator.context._parameters.countrycode.raw || undefined,
        });
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context._parameters.countrycode._SetValue(args.countrycode);
      mockGenerator.context._parameters.countryname._SetValue(args.countryname);
      mockGenerator.context._parameters.displayinfo._SetValue(args.displayinfo);
      mockGenerator.context._parameters.language._SetValue(args.language);
      mockGenerator.context._parameters.limit._SetValue(args.limit);
      mockGenerator.context._parameters.promoted._SetValue(args.promoted);
      if (mockGenerator.context._parameters.countrycode.security) {
        mockGenerator.context._parameters.countrycode.security.secured =
          args.masked;
        mockGenerator.context._parameters.countrycode.security.readable =
          !args.masked;
      }
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

// This is a particular configuration of you component. You can export different StoryObj objects
// to show different states of your component
export const Default = {
  render: renderGenerator(),
  parameters: { controls: { expanded: true, sort: "requiredFirst" } },
} as StoryObj<StoryArgs>;
export const Promoted = {
  render: renderGenerator(),
  argTypes: {
    promoted: {
      control: "text",
      name: "Promoted Countries",
      description:
        "Promoted countries (Will appear first) Use comma separated list of ISO 3166-1 3-letter country code (Ex. 'USA,CAN,MEX')",
      table: {
        type: { summary: `CAN,USA,MEX | ITA,ALB,FRA` },
        category: "Parameters",
      },
    },
  },
  args: {
    promoted: "CAN,USA,MEX",
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
export const Limited = {
  render: renderGenerator(),
  argTypes: {
    limit: {
      control: "text",
      name: "Limited Countries",
      description:
        "Limit to these countries Use comma separated list of ISO 3166-1 3-letter country code (Ex. 'USA,CAN,MEX'). Leave blank to include all countries",
      table: {
        type: { summary: `CAN,USA,MEX | ITA,ALB,FRA` },
        category: "Parameters",
      },
    },
  },
  args: {
    limit: "CAN,USA,MEX",
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
export const Disabled = {
  render: renderGenerator(),
  args: {
    countrycode: "CAN",
    isDisabled: true,
  },
  parameters: {
    controls: {
      expanded: true,
      include: ["Disabled", "isDisabled"],
    },
  },
} as StoryObj<StoryArgs>;

export const Masked = {
  render: renderGenerator(),
  argTypes: {
    masked: {
      control: "boolean",
      name: "Masked",
      description: "Parameters Security",
      table: {
        category: "Mode",
      },
    },
  },
  args: {
    countrycode: "CAN",
    masked: true,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
