import {
  gramIdentityPlugin,
  IdentityPluginSettings,
} from "@gram-data/gram-identity";
import { gramValuePlugin, ValuePluginSettings } from "@gram-data/gram-value";

export { IdentityPluginSettings, ValuePluginSettings };

export const plugins = [gramIdentityPlugin, gramValuePlugin];
