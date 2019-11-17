import { StringObjectMap } from "@repodog/types";
import { defaultPathTemplateCallback } from "getta";
import { OPTIONAL_TYPE_PATH_TEMPLATE_REGEX } from "../constants";

export default function pathTemplateCallback(pathTemplate: string, data: StringObjectMap, pathTemplateRegExp: RegExp) {
  const populatedPath = defaultPathTemplateCallback(pathTemplate, data, pathTemplateRegExp);
  return populatedPath.replace(OPTIONAL_TYPE_PATH_TEMPLATE_REGEX, data.type || "");
}
