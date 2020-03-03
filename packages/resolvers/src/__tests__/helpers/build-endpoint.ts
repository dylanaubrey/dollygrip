import { BASE_PATH, OPTIONAL_TYPE_PATH_TEMPLATE_REGEX } from "@dollygrip/rest-client";
import { PlainObject } from "@repodog/types";

export default function buildEndpoint(pathTemplate: string, templateData: PlainObject) {
  const populatedPath = Object.keys(templateData).reduce((path, key) => {
    return path.replace(`{${key}}`, templateData[key]);
  }, pathTemplate);

  populatedPath.replace(OPTIONAL_TYPE_PATH_TEMPLATE_REGEX, templateData.type || "");
  return `${BASE_PATH}${populatedPath}?apiKey=12345`;
}
