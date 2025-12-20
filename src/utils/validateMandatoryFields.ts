export default function validateMandatoryFields({
  data,
  MANDATORY_FIELDS,
}: {
  data: Record<string, any>;
  MANDATORY_FIELDS: Record<string, any>;
}) {
  for (const field of Object.values(MANDATORY_FIELDS)) {
    const value = data[field.key];

    if (value === null || value === undefined || value == '') {
      throw new Error(`${field.label} is required.`);
    }
  }
}
