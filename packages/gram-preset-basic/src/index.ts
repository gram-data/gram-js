import {
  gramIdentityPlugin,
  IdentityPluginSettings,
} from "@gram-data/gram-identity";
import { gramValuePlugin, ValuePluginSettings } from "@gram-data/gram-value";
import { Plugin, Settings } from "unified";

export { IdentityPluginSettings, ValuePluginSettings };

export const plugins:Plugin<any, Settings>[] = [gramIdentityPlugin, gramValuePlugin];
