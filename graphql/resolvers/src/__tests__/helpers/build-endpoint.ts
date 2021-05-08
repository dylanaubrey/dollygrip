import { BASE_PATH, OPTIONAL_TYPE_PATH_TEMPLATE_REGEX } from '@dollygrip/rest-client';

export default function buildEndpoint(pathTemplate: string, templateData: Record<string, any>) {
  let populatedPath = Object.keys(templateData).reduce(
    (path, key) => path.replace(`{${key}}`, templateData[key]),
    pathTemplate
  );

  populatedPath = populatedPath.replace(OPTIONAL_TYPE_PATH_TEMPLATE_REGEX, templateData.type || '');
  return `${BASE_PATH}${populatedPath}?apiKey=12345`;
}
