export default function validateEditableFields({
  data,
  EDITABLE_FIELDS,
}: {
  data: Record<string, any>;
  EDITABLE_FIELDS: Record<string, any>;
}) {
  const nonEditableFields = Object.keys(data).filter(
    (key) => !(key in EDITABLE_FIELDS),
  );

  if (nonEditableFields.length) {
    throw new Error(
      `These fields are not updatable: ${nonEditableFields.join(', ')}`,
    );
  }
}
