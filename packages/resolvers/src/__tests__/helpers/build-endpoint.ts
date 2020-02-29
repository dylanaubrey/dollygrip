import { BASE_PATH } from "@dollygrip/rest-client";
import { ObjectMap } from "@repodog/types";

export default function buildEndpoint(pathTemplate: string, templateData: ObjectMap) {
  const populatedPath = Object.keys(templateData).reduce((path, key) => {
    return path.replace(`{${key}}`, templateData[key]);
  }, pathTemplate);

  return `${BASE_PATH}${populatedPath}?apiKey=12345`;
}
