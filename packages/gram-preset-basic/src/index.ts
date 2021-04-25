
import { Identity, Value } from "@gram-data/gram";
import { Plugin, Settings } from "unified";


export const plugins:Plugin<any, Settings>[] = [Identity.gramIdentityPlugin, Value.gramValuePlugin];
