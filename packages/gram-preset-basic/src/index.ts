import {
  gramIdentityPlugin,
  IdentityPluginSettings,
} from "@gram-data/gram/Identity";
import { gramValuePlugin, ValuePluginSettings } from "@gram-data/gram/Vdentity";
import { Plugin, Settings } from "unified";

export { IdentityPluginSettings, ValuePluginSettings };

export const plugins:Plugin<any, Settings>[] = [gramIdentityPlugin, gramValuePlugin];
